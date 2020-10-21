import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto, PerfilesActividadesModel, ProyectosActividadesModel } from "../../models/proyectos";
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
import {Location} from '@angular/common';

@Component({
  selector: 'app-proyectos-actividades-add',
  templateUrl: './proyectos-actividades-add.component.html',
  styleUrls: ['./proyectos-actividades-add.component.scss']
})
export class ProyectosActividadesAddComponent implements OnInit {

  public proyectoActividadesModel = new ProyectosActividadesModel();
  public proyectoModel = new Proyecto();
  public perfiles: PerfilesActividadesModel[] = [];
  public validar = false;
  public idobtenido: number;

  

  constructor(private proyectoService: ProyectoService, private router: Router,
              private activatedRoute: ActivatedRoute,private _location: Location) {
  }


  ngOnInit(): void {
    this.idobtenido = <number><any>(this.activatedRoute.snapshot.paramMap.get("id"));
    this.obtenerPerfilesActividades();
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

    let model = this.proyectoModel;

    
    model.activo = true;
    console.log(model)
    
    
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
