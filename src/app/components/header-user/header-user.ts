import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../utils/services/storage.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-user',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './header-user.html',
  styleUrls: ['./header-user.css'],
  standalone: true
})
export class HeaderUser implements OnInit {
  user: any = null;
  showPopup = false;

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.user = this.storage.getLocal('loggedInUser') || this.storage.getSession('loggedInUser') || this.storage.getCookie('loggedInUser');
  }

  logout(): void {
    this.storage.removeLocal('loggedInUser');
    this.storage.removeSession('loggedInUser');
    this.storage.removeCookie('loggedInUser');
    this.user = null;
    window.location.reload();
  }
}
