import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators, ReactiveFormsModule } from '@angular/forms';
import Validation from '../../utils/validation';
import { UserService } from '../../utils/services/user';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rigration-form',
  imports: [RouterModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './rigration-form.html',
  styleUrl: './rigration-form.css',
  providers: [UserService]
})
export class RigrationForm {
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  isShowPassword = false;
  isShowConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
        ]],
        mobile: ['', [Validators.required, Validators.pattern('^(\\+91[-\\s]?|91[-\\s]?)?[6-9]\\d{9}$')]],
        address : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
       {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const email = this.form.value.email;
    const mobile = this.form.value.mobile;

    this.userService.getUsers().subscribe(users => {
      const emailExists = users.some(u => u.email === email);
      const mobileExists = users.some(u => u.mobile === mobile);
      if (emailExists) {
        this.toastr.error('Email already exists!', 'Error');
        return;
      }
      if (mobileExists) {
        this.toastr.error('Mobile number already exists!', 'Error');
        return;
      }
      this.userService.addUser(this.form.value).subscribe({
        next: (res) => {
          this.toastr.success('Registration successful!', 'Success');
          this.onReset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error adding user', err);
        }
      });
    });

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  showPassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  showConfirmPassword(): void {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }

}
