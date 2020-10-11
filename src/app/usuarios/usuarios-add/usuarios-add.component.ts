import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { UsuarioServices } from '../../services/usuario.service';
import { Usuario } from "../../models/usuario"

import { Universidad } from "../../models/universidad"

import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-organization-add',
  templateUrl: './usuarios-add.component.html',
  styleUrls: ['./usuarios-add.component.scss']
})
export class UsuariosAddComponent implements OnInit {
  public d: Date = new Date(); // but the type can also be inferred from "new Date()" already

  public usuarios = new Usuario("","","","","",1,1,true);

  public universidades:Universidad[] = [];

validar=false;

  constructor(private convocatoriaservices: UsuarioServices,private router: Router) {}

  ngOnInit(): void {
this.obtenerUniversidad();

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

    this.convocatoriaservices.create(model).subscribe((res: any)=>{
      console.log(res.message)
 
      this.validar=true;

    }, error=>{
      alert(error.error)
    })
  

if(this.validar){
  this.router.navigate(['/usuarios']);
  $('#success-modal-preview').modal('show');
}}


}
