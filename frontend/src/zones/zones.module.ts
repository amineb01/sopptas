import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZonesComponent } from './zones.component';
import { ZonesRoutingModule } from './zones-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedComponentModule } from 'src/shared/shared-component/shared-component.module';
import { ZoneFormDialogComponent } from './zone-form-dialog/zone-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ZonesComponent,
    ZoneFormDialogComponent
  ],
  imports: [
    CommonModule,
    ZonesRoutingModule,
    AngularMaterialModule,
    SharedComponentModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class ZonesModule { }
