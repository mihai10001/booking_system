import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: '',
    loadChildren: () => import('./main-layout/main-layout.module').then(m => m.MainLayoutModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})], // , { enableTracing: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
