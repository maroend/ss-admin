import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { UsuarioServices } from '../../services/usuario.service';
import { Usuario } from "../../models/usuario"

import { Periodos } from "../../models/periodo"
import { Universidad } from "../../models/universidad"
import {Location} from '@angular/common';

import { Router,ActivatedRoute } from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-organization-add',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent implements OnInit {


  public usuarios = new Usuario("","","","","",1,1,true,true);
  
validar=false;

  public universidades:Universidad[] = [];
public idobtenido="";


  constructor(private usuarioservices: UsuarioServices,private router: Router,private activatedRoute: ActivatedRoute,private _location: Location){}

  ngOnInit(): void {
    this.idobtenido=this.activatedRoute.snapshot.paramMap.get("id");
    this.usuarioservices.getUsuarioid(this.idobtenido).subscribe((usuarios: Usuario) => this.usuarios = usuarios);
console.log(this.usuarios);
this.obtenerUniversidad();

  }
  obtenerUniversidad(){

    return this.usuarioservices
      .getUniversidad()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }
 
  ngAfterViewInit() {
    Feather.replace();
  }

  update(){
    let model = this.usuarios;



    console.log(model)

    this.usuarioservices.updateusuarios(this.idobtenido,model).subscribe((res: any)=>{
      console.log(res.message)
  
            $('#success-modal-preview').modal('show');

    this._location.back();
        }, error=>{
      alert(error.error)
    })
  


  }


 
}
