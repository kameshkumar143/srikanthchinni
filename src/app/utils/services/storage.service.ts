import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  }

  // Local Storage
  setLocal(key: string, value: any): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  getLocal<T>(key: string): T | null {
    if (this.isBrowser()) {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    }
    return null;
  }
  removeLocal(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  // Session Storage
  setSession(key: string, value: any): void {
    if (this.isBrowser()) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }
  getSession<T>(key: string): T | null {
    if (this.isBrowser()) {
      const val = sessionStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    }
    return null;
  }
  removeSession(key: string): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem(key);
    }
  }

  // Cookie Storage
  setCookie(key: string, value: any, days: number = 1): void {
    if (this.isBrowser()) {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/`;
    }
  }
  getCookie<T>(key: string): T | null {
    if (this.isBrowser()) {
      const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
      return match ? JSON.parse(decodeURIComponent(match[2])) : null;
    }
    return null;
  }
  removeCookie(key: string): void {
    if (this.isBrowser()) {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}
