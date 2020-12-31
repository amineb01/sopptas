import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclamationsComponent } from './reclamations.component';
import { ReclamationsRoutingModule } from './reclamations-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReclamationsDetailsComponent } from './reclamations-details/reclamations-details.component';
import { SharedComponentModule } from '../shared/shared-component/shared-component.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
    
@NgModule({
  declarations: [
    ReclamationsComponent,
    ReclamationsDetailsComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    }),
    ReactiveFormsModule,
    SharedComponentModule,
    ReclamationsRoutingModule,
    AngularMaterialModule,
    InfiniteScrollModule
  ]
})
export class ReclamationsModule { }
