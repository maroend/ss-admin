import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'', redirectTo:  'login', pathMatch:  'full'},
  {path:'login',component:LoginComponent},
  {path:'alumnos',component:AlumnosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
