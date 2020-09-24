import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { LoginComponent } from './login/login.component';
import { AlumnosAddComponent } from './alumnos/alumnos-add/alumnos-add.component';
import { MenuComponent } from './menu/menu.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresashomeComponent } from './empresas/empresas-home.component';
import { EmpresasAddComponent } from './empresas/empresas-add/empresas-add.component';
import { EmpresasEditComponent } from './empresas/empresas-edit/empresas-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    LoginComponent,
    AlumnosAddComponent,
    MenuComponent,
    ProyectosComponent,
    ConvocatoriasComponent,
    AdministracionComponent,
    DashboardComponent,
    EmpresashomeComponent,
    EmpresasAddComponent,
    EmpresasEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
