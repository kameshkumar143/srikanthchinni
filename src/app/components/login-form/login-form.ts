import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Validation from '../../utils/validation';
import { UserService } from '../../utils/services/user';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../utils/services/storage.service';
import { UserStateService } from '../../utils/services/user-state.service';

@Component({
  selector: 'app-login-form',
  imports: [ RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {

   form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  isShowPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private storage: StorageService,
    private router: Router,
    private userState: UserStateService
  ) {}
   ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
        ]],
        password: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
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
    const password = this.form.value.password;

    this.userService.getUsers().subscribe(users => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        this.toastr.success('Login successful!', 'Success');
        // Store user details using StorageService
        this.storage.setLocal('loggedInUser', user);
        this.storage.setSession('loggedInUser', user);
        this.storage.setCookie('loggedInUser', user, 1);
        this.userState.setUser(user); // Update signal immediately
        this.onReset();
        this.router.navigate(['/']);
      } else {
        this.toastr.error('Invalid email or password!', 'Login Failed');
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  showPassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }
}