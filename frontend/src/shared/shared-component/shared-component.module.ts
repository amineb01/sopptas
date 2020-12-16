import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponentComponent } from './button-component/button-component.component';
import { InputComponentComponent } from './input-component/input-component.component';

@NgModule({
  declarations: [
    ButtonComponentComponent,
    InputComponentComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponentComponent,
    InputComponentComponent,
  ]
})
export class SharedComponentModule { }
