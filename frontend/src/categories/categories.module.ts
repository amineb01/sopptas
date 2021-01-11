import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedComponentModule } from 'src/shared/shared-component/shared-component.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoriesFormDialogComponent } from './categories-form-dialog/categories-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesFormDialogComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    AngularMaterialModule,
    SharedComponentModule,
    FormsModule, ReactiveFormsModule,
    

  ]
})
export class CategoriesModule { }
