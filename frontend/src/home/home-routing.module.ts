import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
  path: '',
  component: HomeComponent,
  children: [
    { path: 'categories',
    loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesModule),
    },
    { path: 'zones',
    loadChildren: () => import('../zones/zones.module').then(m => m.ZonesModule),
    },
    { path: 'points',
    loadChildren: () => import('../points/points.module').then(m => m.PointsModule),
    },
    { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule)  },
    { path: 'reclamations', loadChildren: () => import('../reclamations/reclamations.module').then(m => m.ReclamationsModule)  },
    { path: 'reactiveform', loadChildren: () => import('../reactive-form/reactiveform.module').then(m => m.ReactiveFormModule)  },
    { path: '**', redirectTo: 'reclamations' }

  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
