import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  baseUrl = 'https://cpanel.localcalls.in/';

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user_login`, data);
  }

  signup(data): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user_signup`, data);
  }

  resetPassword(data): Observable<any> {
    return this.http.post(`${this.baseUrl}api/reset_password`, data);
  }

  forgetpassword(data): Observable<any> {
    return this.http.post(`${this.baseUrl}api/forget_password`, data);
  }

  isLogged() {
    const user = JSON.parse(localStorage.getItem('user'));
    let status;
    if (user != null) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
}
