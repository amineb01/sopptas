import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponentComponent } from './button-component/button-component.component';
import { InputComponentComponent } from './input-component/input-component.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    ButtonComponentComponent,
    InputComponentComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponentComponent,
    InputComponentComponent,
    AlertComponent
  ]
})
export class SharedComponentModule { }
