import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import decode from 'jwt-decode';

import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) {}

  public isAuthenticated(): boolean {
    var token = null
    const currentUser = this.currentUserValue();
    if (currentUser){
      token = currentUser['token']
    }
    if (token) {
      const tokenPayload = decode(token)['data'];
      if(!tokenPayload ) return false
      if (!['admin', 'restricted'].includes(tokenPayload['role'])) return false
      return !this.jwtHelper.isTokenExpired(token);
    }else{
      return false
    }
  }


  currentUserValue() {
    return JSON.parse(localStorage.getItem('currentUser'))
  }

  login(email: string, password: string) {
    return this.http.post<any>('users/signin', { email: email, password: password })
    .pipe(
      map(reponse => {
        if(reponse.message == "user authenticated" && ['admin', 'restricted'].includes(reponse.data['role'])){
          reponse.data['token'] = reponse.token
          localStorage.setItem('currentUser', JSON.stringify(reponse.data));
        }
        return reponse;
      })
    )
  }
  sendMailForgetPassword(email){
    return this.http.post<any>('users/forgetPassword', { email: email})
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
