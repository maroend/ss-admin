import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ConvocatoriaServices } from '../../services/convocatoria.service';
import { Convocatoria } from "../../models/convocatoria"

import { Periodos } from "../../models/periodo"
import { Universidad } from "../../models/universidad"
import {Location} from '@angular/common';

import { Router } from '@angular/router';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


declare var $: any;
let now = new Date();
export const MY_FORMATS = {
  parse: {
    dateInput: "LL"
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY"
  }
};

@Component({
  selector: 'app-convocatoria-add',
  templateUrl: './convocatoria-add.component.html',
  styleUrls: ['./convocatoria-add.component.scss'],
  providers: [
   {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
{
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class ConvocatoriaAddComponent implements OnInit {
  public d: Date = new Date(); // but the type can also be inferred from "new Date()" already

  public convocatoria = new Convocatoria("",0,0,"",0,0,"",this.d,this.d,true,"","","");
  public periodos:Periodos[] = [];

  public universidades:Universidad[] = [];

  public mensajevalidacion="";


  constructor(private convocatoriaservices: ConvocatoriaServices,private router: Router,private _location: Location) {}

  ngOnInit(): void {
this.obtenerUniversidad();
this.obtenerperiodo();
this.convocatoria.idUniversidad=1;
this.convocatoria.tipo=1;
this.convocatoria.idPeriodo=1;

  }
  obtenerUniversidad(){

    return this.convocatoriaservices
      .getUniversidad()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }
  obtenerperiodo(){

    return this.convocatoriaservices
      .getPeriodo()
      .subscribe((periodos: Periodos[]) => this.periodos = periodos);

  }
  ngAfterViewInit() {
    Feather.replace();
  }

  create(){
    $('#convocatoria').css("border", "#dee2e6 solid 1px");
    $('#descripcion').css("border", "#dee2e6 solid 1px");
    $('#fechaTermino').css("border", "#dee2e6 solid 1px");
    $('#fechaInicio').css("border", "#dee2e6 solid 1px");

    let model = this.convocatoria;

    console.log(model)


    if(model.convocatoria==""){
      this.mensajevalidacion="No puedes dejar el campo de empresa vacío"
            $('#validacion').modal('show');
            $('#convocatoria').css("border", "red solid 1px");

          }
          else if(model.descripcion==""){
            this.mensajevalidacion="No puedes dejar el campo de mision vacío"
            $('#validacion').modal('show');
            $('#descripcion').css("border", "red solid 1px");

          }
          else if(model.fechaTermino==null){
            this.mensajevalidacion="No puedes dejar el campo de fecha Termino vacío"
            $('#validacion').modal('show');
            $('#fechaTermino').css("border", "red solid 1px");

          }
          else if(model.fechaInicio==null){
            this.mensajevalidacion="No puedes dejar el campo de fecha Inicio vacío"
            $('#validacion').modal('show');
            $('#fechaInicio').css("border", "red solid 1px");

          }
        else{




    this.convocatoriaservices.create(model).subscribe((res: any)=>{
      console.log(res.message)
           $('#success-modal-preview').modal('show');

    this._location.back();
    }, error=>{
      alert(error.error)
    })
  }
}

}
