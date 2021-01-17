import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponentComponent } from './button-component/button-component.component';
import { InputComponentComponent } from './input-component/input-component.component';
import { AlertComponent } from './alert/alert.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AngularMaterialModule } from 'src/angular-material/angular-material.module';

@NgModule({
  declarations: [
    ButtonComponentComponent,
    InputComponentComponent,
    AlertComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    ButtonComponentComponent,
    InputComponentComponent,
    AlertComponent
  ]
})
export class SharedComponentModule { }
