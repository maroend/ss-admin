
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';


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
  {path:'alumnos',component:AlumnosComponent},

  {path:'',
  component: AdminLayoutComponent,
  children: [{
    path: 'empresas',
    loadChildren: () => import('./empresas/empresas.module').then(m => m.EmpresasModule)
  }]
  },  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

