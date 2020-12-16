import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '../shared/shared-component/shared-component.module';
import { AthentificationRoutingModule } from './authentification-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AthentificationComponent } from './athentification.component';

@NgModule({
  declarations: [
    AthentificationComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedComponentModule,
    AthentificationRoutingModule
  ]
})
export class AuthentificationModule { }
