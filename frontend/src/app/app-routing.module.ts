import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../guards/auth-guard.service';

const routes: Routes = [
  { path: 'home',
   loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
   canActivate: [AuthGuard]
  },
  { path: 'login',
   loadChildren: () => import('../athentification/authentification.module').then(m => m.AuthentificationModule)},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
