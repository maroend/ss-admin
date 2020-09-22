
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnosAddComponent } from './alumnos/alumnos-add/alumnos-add.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

import { ProyectosComponent } from './proyectos/proyectos.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresashomeComponent } from './empresas/empresas-home/empresas-home.component';
import { EmpresasAddComponent } from './empresas/empresas-add/empresas-add.component';

const routes: Routes = [
{  path: '',
  redirectTo: 'auth',
  pathMatch: 'full',
},
  {path:'',
  component: AuthLayoutComponent,
  children: [{
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }]
  },
  {path:'dashboard',component:DashboardComponent},
  {path:'alumnos',component:AlumnosComponent},
  {path:'alumnos/add',component:AlumnosAddComponent},
  {path:'proyectos',component:ProyectosComponent},
  {path:'convocatorias',component:ConvocatoriasComponent},
  {path:'administracion',component:AdministracionComponent},
  {path:'empresas/home',component:EmpresashomeComponent},
  {path:'empresas/add',component:EmpresasAddComponent}


    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

