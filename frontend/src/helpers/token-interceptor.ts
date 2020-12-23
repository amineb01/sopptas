import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

import { environment } from '../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        request = request.clone({ url: `${environment.apiUrl}${request.url}` });

        let currentUser = this.authenticationService.currentUserValue();
        if (currentUser && currentUser['token']) {
            request = request.clone({
                setHeaders: {
                    token: `${currentUser['token']}`
                }
            });
        }
        

        return next.handle(request);
    }
}
