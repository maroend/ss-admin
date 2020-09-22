import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EmpresasRoutingModule } from './empresas-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    SharedModule
  ]
})
export class EmpresasModule { }
