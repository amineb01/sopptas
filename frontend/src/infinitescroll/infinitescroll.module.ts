import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { InfinitescrollRoutingModule } from './Infinitescroll-routing.module';

import { ImagesComponent } from './images/images.component';


@NgModule({
  declarations: [
    ImagesComponent
  ],
  imports: [
    AngularMaterialModule,
    InfiniteScrollModule,
    InfinitescrollRoutingModule,
    CommonModule
  ]
})
export class InfinitescrollModule { }
