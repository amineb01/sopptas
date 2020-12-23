import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZonesComponent } from './zones.component';
import { ZonesRoutingModule } from './zones-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [
    ZonesComponent
  ],
  imports: [
    CommonModule,
    ZonesRoutingModule,
    AngularMaterialModule
  ]
})
export class ZonesModule { }
