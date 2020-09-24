
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnosAddComponent } from './alumnos/alumnos-add/alumnos-add.component';
import { AlumnosEditComponent } from './alumnos/alumnos-edit/alumnos-edit.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresashomeComponent } from './empresas/empresas-home.component';
import { EmpresasAddComponent } from './empresas/empresas-add/empresas-add.component';
import { LoginComponent } from './login/login.component';
import { EmpresasEditComponent } from './empresas/empresas-edit/empresas-edit.component';

const routes: Routes = [
{ path: '',
  redirectTo: 'login',
  pathMatch: 'full',
},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'alumnos',component:AlumnosComponent},
  {path:'alumnos/add',component:AlumnosAddComponent},
  {path:'alumnos/edit/:id', component: AlumnosEditComponent },
  {path:'proyectos',component:ProyectosComponent},
  {path:'convocatorias',component:ConvocatoriasComponent},
  {path:'administracion',component:AdministracionComponent},
  {path:'empresas',component:EmpresashomeComponent},
  {path:'empresas/add',component:EmpresasAddComponent},
  {path:'empresas/Edit/:id',component:EmpresasEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

