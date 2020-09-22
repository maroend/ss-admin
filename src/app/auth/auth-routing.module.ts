import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'login',
    component: LoginComponent
  }]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
