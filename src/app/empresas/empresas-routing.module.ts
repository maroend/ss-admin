import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresashomeComponent } from './empresas-home/empresas-home.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
},{
  path: '',
  children: [
    {
      path: 'home',
      component: EmpresashomeComponent
    }
   
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
