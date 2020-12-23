import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclamationsComponent } from './reclamations.component';
import { ReclamationsRoutingModule } from './reclamations-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    ReclamationsComponent
  ],
  imports: [
    CommonModule,
    ReclamationsRoutingModule,
    AngularMaterialModule,
    InfiniteScrollModule
  ]
})
export class ReclamationsModule { }
