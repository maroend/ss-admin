
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnosAddComponent } from './alumnos/alumnos-add/alumnos-add.component';
import { AlumnosEditComponent } from './alumnos/alumnos-edit/alumnos-edit.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ProyectosAddComponent } from './proyectos/proyectos-add/proyectos-add.component';
import { ProyectosEditComponent } from './proyectos/proyectos-edit/proyectos-edit.component';
import { ProyectosVerComponent } from './proyectos/proyectos-ver/proyectos-ver.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
import { ConvocatoriaAddComponent } from './convocatorias/convocatoria-add/convocatoria-add.component';
import { ConvocatoriaEditComponent } from './convocatorias/convocatoria-edit/convocatoria-edit.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresashomeComponent } from './empresas/empresas-home.component';
import { EmpresasAddComponent } from './empresas/empresas-add/empresas-add.component';
import { LoginComponent } from './login/login.component';
import { EmpresasEditComponent } from './empresas/empresas-edit/empresas-edit.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosAddComponent } from './usuarios/usuarios-add/usuarios-add.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit/usuarios-edit.component';
import { EmpresasverComponent } from './empresas/empresas-ver/empresas-ver.component';
import { AlumnosverComponent } from './alumnos/alumnos-ver/alumnos-ver.component';

EmpresasverComponent
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
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'proyectos/add', component: ProyectosAddComponent },
  { path: 'proyectos/edit/:id', component: ProyectosEditComponent },
  { path: 'proyectos/ver/:id', component: ProyectosVerComponent },
  { path:'convocatorias',component:ConvocatoriasComponent},
  {path:'convocatorias/add',component:ConvocatoriaAddComponent},
  {path:'convocatorias/edit/:id',component:ConvocatoriaEditComponent},

  {path:'administracion',component:AdministracionComponent},
  {path:'empresas',component:EmpresashomeComponent},
  {path:'empresas/add',component:EmpresasAddComponent},
  {path:'empresas/ver/:id',component:EmpresasverComponent},
  {path:'empresas/Edit/:id',component:EmpresasEditComponent},
  {path:'usuarios',component:UsuariosComponent},
  {path:'usuarios/add',component:UsuariosAddComponent},
  {path:'usuarios/edit/:id',component:UsuariosEditComponent},
  {path:'alumnos/ver/:id',component:AlumnosverComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

