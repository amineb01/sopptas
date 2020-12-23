import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from '../helpers/error-interceptor';
import { JwtInterceptor } from '../helpers/token-interceptor';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { CategoriesService } from './categories.service';
import { ImagesService } from './images.service';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { ReclamationsService } from './reclamations.service';
import { ZonesService } from './zones.service';
import { PointsService } from './points.service';

import { SharedComponentModule } from '../shared/shared-component/shared-component.module';



@NgModule({
  declarations: [
  ],
  providers: [
    JwtHelperService,
    AuthService,
    CategoriesService,
    ImagesService,
    AuthService,
    AlertService,
    ReclamationsService,
    ZonesService,
    PointsService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}

  ],
  imports: [
    HttpClientModule,
    CommonModule,
    SharedComponentModule
  ]
})
export class ServicesModule { }
