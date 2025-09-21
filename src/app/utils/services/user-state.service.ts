import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  userSignal = signal<any>(null);

  constructor(private storage: StorageService) {
    this.updateUserFromStorage();
  }

  updateUserFromStorage(): void {
    const user = this.storage.getLocal('loggedInUser') || this.storage.getSession('loggedInUser') || this.storage.getCookie('loggedInUser');
    this.userSignal.set(user);
  }

  setUser(user: any): void {
    this.userSignal.set(user);
  }

  clearUser(): void {
    this.userSignal.set(null);
  }
}
