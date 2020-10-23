import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyectoactividad, PerfilesActividadesModel, ProyectosActividadesModel } from "../../models/proyectos";
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
import {Location} from '@angular/common';

@Component({
  selector: 'app-proyectos-actividades-add',
  templateUrl: './proyectos-actividades-add.component.html',
  styleUrls: ['./proyectos-actividades-add.component.scss']
})
export class ProyectosActividadesAddComponent implements OnInit {
  public mensajevalidacion="";

  public proyectoActividadesModel = new ProyectosActividadesModel();
  public proyectoModel = new Proyectoactividad();
  public perfiles: PerfilesActividadesModel[] = [];
  public validar = false;
  public idobtenido: number;

  

  constructor(private proyectoService: ProyectoService, private router: Router,
              private activatedRoute: ActivatedRoute,private _location: Location) {
  }


  ngOnInit(): void {
    this.idobtenido = <number><any>(this.activatedRoute.snapshot.paramMap.get("id"));
    console.log(this.idobtenido);
    this.obtenerPerfilesActividades();
    this.proyectoActividadesModel.noPrestadores=0;
    this.proyectoActividadesModel.idPerfil=1;

  }
  ngAfterViewInit() {
    Feather.replace();
  }

  obtenerPerfilesActividades() {
    return this.proyectoService
      .getPerfilesActividades()
      .subscribe((perfiles: PerfilesActividadesModel[]) => this.perfiles = perfiles);
  }
  create() {
    console.log("2");

    let model = this.proyectoActividadesModel;
var actividad=$('#actividad').val();
var descripcion=$('#descripcion').val();
var cantidad=Number($('#cantidad').val());
console.log(actividad);
console.log(cantidad);

if(actividad==""){

  this.mensajevalidacion="No puedes dejar el campo de actividad vacío";
  $('#validacion').modal('show');
}
else if(descripcion==""){
  this.mensajevalidacion="No puedes dejar el campo de descripcion vacío";
  $('#validacion').modal('show');

}
else if(cantidad==0){
  this.mensajevalidacion="No puedes dejar el campo de cantidad vacío o en 0";
  $('#validacion').modal('show');
  
}
else{

console.log(actividad+descripcion+cantidad);

    model.idProyecto=Number(this.idobtenido);
    model.activo = true;
    console.log(model)
    
    
    this.proyectoService.createProyectosActividades(model).subscribe((res: any) => {
      //console.log(res.message);
      if (res) {
        this._location.back();

      }

    }, error => {
      alert(error.error)
    })

  }
  }
}
