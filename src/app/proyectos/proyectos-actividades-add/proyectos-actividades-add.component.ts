import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto2, PerfilesActividadesModel, ProyectosActividadesModel } from "../../models/proyectos";
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
import {Location} from '@angular/common';

@Component({
  selector: 'app-proyectos-actividades-add',
  templateUrl: './proyectos-actividades-add.component.html',
  styleUrls: ['./proyectos-actividades-add.component.scss']
})
export class ProyectosActividadesAddComponent implements OnInit {

  public proyectoActividadesModel = new ProyectosActividadesModel(0,"","",0,0,"","",false);
  public proyectoModel = new Proyecto2();
  public perfiles: PerfilesActividadesModel[] = [];
  public validar = false;
  public idobtenido: number;

  public mensajevalidacion="";


  constructor(private proyectoService: ProyectoService, private router: Router,
              private activatedRoute: ActivatedRoute,private _location: Location) {
  }


  ngOnInit(): void {
    this.idobtenido = <number><any>(this.activatedRoute.snapshot.paramMap.get("id"));
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

    let model = this.proyectoActividadesModel;

    model.idProyecto=Number(this.idobtenido);
    model.activo = true;
    var d=new Date();
    model.fechaCreacion=String(d);
    console.log(model)
    if(model.actividad==""){
      this.mensajevalidacion="No puedes dejar el campo de actividad vacío"
            $('#validacion').modal('show');
      
          }
          else if(model.descripcion==""){
            this.mensajevalidacion="No puedes dejar el campo de descripcion vacío"
            $('#validacion').modal('show');
          }
          else if(model.noPrestadores==0){
            this.mensajevalidacion="No puedes dejar el campo de prestadores vacío"
            $('#validacion').modal('show');
          }
          else{
    
    this.proyectoService.createProyectosActividades(model).subscribe((res: any) => {
      //console.log(res.message);
      if (res) {
        $('#success-modal-preview').modal('show');

        this._location.back();

      }

    }, error => {
      alert(error.error)
    })
  }

  }
}
