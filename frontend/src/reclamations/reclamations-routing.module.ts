import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReclamationsComponent } from './reclamations.component';
import { ReclamationsDetailsComponent } from './reclamations-details/reclamations-details.component';

const routes: Routes = [
  {
    path: '',
    component: ReclamationsComponent
  },
  {
    path: ':id',
    component: ReclamationsDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReclamationsRoutingModule { }