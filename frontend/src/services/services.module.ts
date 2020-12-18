import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from '../helpers/error-interceptor';
import { JwtInterceptor } from '../helpers/token-interceptor';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { PostsService } from './posts.service';
import { ImagesService } from './images.service';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';



@NgModule({
  declarations: [
  ],
  providers: [
    JwtHelperService,
    AuthService,
    PostsService,
    ImagesService,
    AuthService,
    AlertService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}

  ],
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class ServicesModule { }
