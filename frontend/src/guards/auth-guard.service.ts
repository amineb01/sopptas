import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

constructor(public auth: AuthService, public router: Router) {}
canActivate(route: ActivatedRouteSnapshot): boolean {
  // this will be passed from the route config
  // on the data property
  const expectedRole = route.data.expectedRole;
  const token = localStorage.getItem('token');
  // decode the token to get its payload
  if(!token ){
    this.router.navigate(['login']);
   return false;
  }else{
     const tokenPayload = decode(token);
     if ( tokenPayload &&
       ( !this.auth.isAuthenticated() ||
       tokenPayload['role'] !== expectedRole )
     ) {
       this.router.navigate(['login']);
       return false;
     }
  }
  return true;
}

}
