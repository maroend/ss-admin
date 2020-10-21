import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ConvocatoriaServices } from '../../services/convocatoria.service';
import { Convocatoria } from "../../models/convocatoria"

import { Periodos } from "../../models/periodo"
import { Universidad } from "../../models/universidad"
import {Location} from '@angular/common';

import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-organization-add',
  templateUrl: './convocatoria-add.component.html',
  styleUrls: ['./convocatoria-add.component.scss']
})
export class ConvocatoriaAddComponent implements OnInit {
  public d: Date = new Date(); // but the type can also be inferred from "new Date()" already

  public convocatoria = new Convocatoria("",0,0,"",0,0,"",this.d,this.d,true,"");
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
    let model = this.convocatoria;

    console.log(model)


    if(model.convocatoria==""){
      this.mensajevalidacion="No puedes dejar el campo de empresa vacío"
            $('#validacion').modal('show');
      
          }
          else if(model.descripcion==""){
            this.mensajevalidacion="No puedes dejar el campo de mision vacío"
            $('#validacion').modal('show');
          }
          else if(model.fechaTermino==this.d){
            this.mensajevalidacion="No puedes dejar el campo de fecha Termino vacío"
            $('#validacion').modal('show');
          }
          else if(model.fechaInicio==this.d){
            this.mensajevalidacion="No puedes dejar el campo de fecha Inicio vacío"
            $('#validacion').modal('show');
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
