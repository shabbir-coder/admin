import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from 'src/environment/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl ; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    const url = `${this.apiUrl}/users/register`;
    return this.http.post(url, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post(url, credentials);
  }
}
