import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsComponent } from './points.component';
import { PointsRoutingModule } from './points-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [
    PointsComponent
  ],
  imports: [
    CommonModule,
    PointsRoutingModule,
    AngularMaterialModule
  ]
})
export class PointsModule { }
