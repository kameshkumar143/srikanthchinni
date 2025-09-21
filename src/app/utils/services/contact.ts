import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

export interface Contact {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
}


@Injectable({
  providedIn: 'root'
})
export class Contact {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getUser(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  addUser(user: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, user);
  }

  updateUser(user: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
