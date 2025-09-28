import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { StorageService } from './utils/services/storage.service';
import { UserStateService } from './utils/services/user-state.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule, Footer, MatTooltipModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Kamesh Ristration Form');
  showPopup = false;

  constructor(private storage: StorageService, public userState: UserStateService, private toastr: ToastrService) {
    this.userState.updateUserFromStorage();
  }

  ngOnInit(): void {
    this.userState.updateUserFromStorage();
  }

  logout(): void {
    this.storage.removeLocal('loggedInUser');
    this.storage.removeSession('loggedInUser');
    this.storage.removeCookie('loggedInUser');
    this.userState.clearUser();
    this.toastr.success('Logout successful');
    this.showPopup = false;
  }

  changesPassword() {
    
  }
}
