import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { UsuarioServices } from '../../services/usuario.service';
import { Usuario } from "../../models/usuario"

import { Universidad } from "../../models/universidad"
import {Location} from '@angular/common';

import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-organization-add',
  templateUrl: './usuarios-add.component.html',
  styleUrls: ['./usuarios-add.component.scss']
})
export class UsuariosAddComponent implements OnInit {
  public d: Date = new Date(); // but the type can also be inferred from "new Date()" already

  public usuarios = new Usuario("","","","","",1,1,true,true);
  public mensajevalidacion="";
  public universidades:Universidad[] = [];

validar=true;

  constructor(private convocatoriaservices: UsuarioServices,private router: Router,private _location: Location) {}

  ngOnInit(): void {
this.obtenerUniversidad();
this.usuarios.disponible=true;

  }
  obtenerUniversidad(){

    return this.convocatoriaservices
      .getUniversidad()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }

  ngAfterViewInit() {
    Feather.replace();
  }

  create(){
    let model = this.usuarios;

    console.log(model)

    if(model.nombre==""){
      this.mensajevalidacion="No puedes dejar el campo de nombre vacío"
            $('#validacion').modal('show');
      
          }
          else   if(model.apellidos==""){
            this.mensajevalidacion="No puedes dejar el campo de apellidos vacío"
                  $('#validacion').modal('show');
            
                }
                else     if(model.email==""){
                  this.mensajevalidacion="No puedes dejar el campo de email vacío"
                        $('#validacion').modal('show');
                  
                      }
                      else     if(model.password==""){
                        this.mensajevalidacion="No puedes dejar el campo de contraseña vacío"
                              $('#validacion').modal('show');
                        
                            }
                     else{


    this.convocatoriaservices.create(model).subscribe((res: any)=>{
 
            $('#success-modal-preview').modal('show');

    this._location.back();
    }, error=>{
      alert(error.error)
    })
                     }




}


}
