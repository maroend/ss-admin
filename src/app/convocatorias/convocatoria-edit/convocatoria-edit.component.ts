import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ConvocatoriaServices } from '../../services/convocatoria.service';
import { Convocatoria } from "../../models/convocatoria"

import { Periodos } from "../../models/periodo"
import { Universidad } from "../../models/universidad"

import { Router,ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { data } from 'jquery';
import {Location} from '@angular/common';
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
  templateUrl: './convocatoria-edit.component.html',
  styleUrls: ['./convocatoria-edit.component.scss'],
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

export class ConvocatoriaEditComponent implements OnInit {

  public d: Date = new Date(); // but the type can also be inferred from "new Date()" already
  public mensajevalidacion="";

  public convocatoria = new Convocatoria("",0,0,"",0,0,"",this.d,this.d,false,"","","");
  validar=false;
public fechaini="";
public fechafin="";
  public periodos:Periodos[] = [];

  public universidades:Universidad[] = [];
public idobtenido="";


  constructor(private convocatoriaservices: ConvocatoriaServices,private router: Router,private activatedRoute: ActivatedRoute,private _location: Location){}

  ngOnInit(): void {
    this.idobtenido=this.activatedRoute.snapshot.paramMap.get("id");
    this.convocatoriaservices.getConvocatoriaid(this.idobtenido).subscribe((convocatoria: Convocatoria) => this.convocatoria = convocatoria);
  this.getconvocatoriafecha(this.idobtenido);
this.obtenerperiodo();
this.obtenerUniversidad();

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

  update(){
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
    this.convocatoriaservices.updateconvocatoria(this.idobtenido,model).subscribe((res: any)=>{
               $('#success-modal-preview').modal('show');

    this._location.back();
    }, error=>{
      alert(error.error)
    })
  }

  }


  getconvocatoriafecha(id){
    this.convocatoriaservices.getConvocatoriaid(id).subscribe((res: any[])=>{
      console.log(res);

    var i=res['fechaInicio'];
    let ini=i.toLocaleString();
    console.log(ini); 
      var f =res['fechaTermino'];
      var fin=f.toLocaleString();

      var ini1 = ini.split("T",6);  
      var iini= ini1[0];
this.fechaini=iini;

var fin2 = fin.split("T",6);  
var tfin= fin2[0];
this.fechafin=tfin;
      
    })
  }




}
