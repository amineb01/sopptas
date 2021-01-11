import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from 'src/shared/shared-component/shared-component.module';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserFormDialogComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AngularMaterialModule,
    FormsModule, ReactiveFormsModule,
    SharedComponentModule,
  ],
  
})
export class UsersModule { }
