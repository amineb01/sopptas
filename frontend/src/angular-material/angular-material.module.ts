import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule} from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule
  ]
})
export class AngularMaterialModule { }
