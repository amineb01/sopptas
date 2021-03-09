import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AthentificationComponent } from './athentification.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    component: AthentificationComponent
  },{
    path:"forgetPassword",
    component: ForgetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AthentificationRoutingModule { }
