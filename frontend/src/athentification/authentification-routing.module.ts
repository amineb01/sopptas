import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AthentificationComponent } from './athentification.component';

const routes: Routes = [
  {
    path: '',
    component: AthentificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AthentificationRoutingModule { }
