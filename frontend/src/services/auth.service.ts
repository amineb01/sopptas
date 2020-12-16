import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }else{
      return false
    }
  }


  currentUserValue() {
    return JSON.parse(localStorage.getItem('currentUser'))
  }

  login(username: string, password: string) {
    return this.http.post<any>('users/signin', { username: username, password: password })
    .pipe(
      map(user => {
        debugger
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    )
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
