import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../../services/organization.service';
import { Empresa,Responsablemodel,check } from "../../models/empresa"
import { AreaAccion } from "../../models/areaaccion"

import { RubroEmpresa } from "../../models/rubrosempresa"
import { Universidad } from "../../models/universidad"
import { TipoEmpresa } from "../../models/tipoempresa"
import { GiroEmpresa } from "../../models/giroempresa"
import { ClasificacionEmpresa } from "../../models/clasificacionempresa"
import { EstadoEmpresa } from "../../models/estadoempresa"
import { Router } from '@angular/router';
declare var $: any;
import {Location} from '@angular/common';

@Component({
  selector: 'app-organization-add',
  templateUrl: './empresas-add.component.html',
  styleUrls: ['./empresas-add.component.scss']
})
export class EmpresasAddComponent implements OnInit {
  public areas: AreaAccion[] = [];
  public rubros: RubroEmpresa[] = [];
  public universidades: Universidad[] = [];
  public tipo: TipoEmpresa[] = [];
  public responsablemodel = new Responsablemodel("","","","","","","","","",true,true)
public validar=false;
  public giro: GiroEmpresa[] = [];
  public estado: EstadoEmpresa[] = [];
  public listaAreasAccion = [];
  public listaRubros = [];
  public clasificacion: ClasificacionEmpresa[] = [];
  public empresaModel = new Empresa("","","","","","","","","","","","","","","","","","","",true,0,"",0,false,true,1,1,1,1,1,0,0,0,0,0,0,undefined,undefined,undefined)
public mensajevalidacion="";
  public contactos = [];
  checkmodel = new check("false","false")


  constructor(private organizacionService: OrganizationService,private router: Router,private _location: Location) { 
  
  }
  ngOnInit(): void {
    this.obtenerAreas();
    this.obtenerRubros();
    this.obtenerUniversidades();
    this.obtenerTipo();
    this.obtenerGiro();
    this.obtenerClasificacion();
    this.obtenerEstado();

  }
  toggleArea(checked, id){
    console.log(checked);
var valor= { "idAreaAccion": id ,"activo": true};

    var area = this.areas.find(x=>x.id===id);
    if(checked) this.listaAreasAccion.push(valor);
    else this.listaAreasAccion = this.listaAreasAccion.filter(item => item.idAreaAccion !== id);   
    
    console.log(this.listaAreasAccion);
  }
  togleRubros(checked, id){
    console.log(checked);
var valor= { "idRubro": id ,"activo": true};

    var area = this.areas.find(x=>x.id===id);
    if(checked) this.listaRubros.push(valor);
    else this.listaRubros = this.listaRubros.filter(item => item.idRubro !== id);   
    
    console.log(this.listaRubros);

  }

  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerAreas() {
    return this.organizacionService
      .getAreas()
      .subscribe((areas: AreaAccion[]) => this.areas = areas );
  }
  obtenerRubros() {
    return this.organizacionService
      .getRubros()
      .subscribe((rubros: RubroEmpresa[]) => this.rubros = rubros );
  }
  obtenerUniversidades() {
    return this.organizacionService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades );
  }
  obtenerTipo() {
    return this.organizacionService
      .getTipo()
      .subscribe((tipo: TipoEmpresa[]) => this.tipo = tipo );
  }
 
  obtenerEstado() {
    return this.organizacionService
      .getEstado()
      .subscribe((estado: EstadoEmpresa[]) => this.estado = estado );
  }
  obtenerGiro() {
    return this.organizacionService
      .getGiro()
      .subscribe((giro: GiroEmpresa[]) => this.giro = giro );
  }
  obtenerClasificacion() {
    return this.organizacionService
      .getClasificacion()
      .subscribe((clasificacion: ClasificacionEmpresa[]) => this.clasificacion = clasificacion );
  }



  create(){
    let model = this.empresaModel;
console.log(this.responsablemodel);
console.log(this.responsablemodel.nombre);
model.responsable = this.responsablemodel;
model.listaAreasAccion = this.listaAreasAccion;
model.listaRubros = this.listaRubros ;


     if(model.organizacion==""){
this.mensajevalidacion="No puedes dejar el campo de empresa vacío"
      $('#validacion').modal('show');

    }
    else if(model.mision==""){
      this.mensajevalidacion="No puedes dejar el campo de mision vacío"
      $('#validacion').modal('show');
    }
    else  if(model.objetivo==""){
      this.mensajevalidacion="No puedes dejar el campo de objetivo vacío"
      $('#validacion').modal('show');
    }
    else if(model.logros==""){
      this.mensajevalidacion="No puedes dejar el campo de logros vacío"
      $('#validacion').modal('show');
    }
    else if(model.web==""){
      this.mensajevalidacion="No puedes dejar el campo de web vacío"
      $('#validacion').modal('show');
    }
    else if(model.cp==""){
      this.mensajevalidacion="No puedes dejar el campo de cp vacío"
      $('#validacion').modal('show');
    }
    else if(model.estado==""){
      this.mensajevalidacion="No puedes dejar el campo de estado vacío"
      $('#validacion').modal('show');
    }
    else if(model.ciudad==""){
      this.mensajevalidacion="No puedes dejar el campo de ciudad vacío"
      $('#validacion').modal('show');
    }
    else if(model.colonia==""){
      this.mensajevalidacion="No puedes dejar el campo de colonia vacío"
      $('#validacion').modal('show');
    }
    else if(model.calle==""){
      this.mensajevalidacion="No puedes dejar el campo de calle vacío"
      $('#validacion').modal('show');
    }

    else if(model.noExt==""){
      this.mensajevalidacion="No puedes dejar el campo de noExt vacío"
      $('#validacion').modal('show');
    }

    else if(model.responsable['nombre']==""){

      this.mensajevalidacion="No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');
    }  
    else if(model.responsable['apellidos']==""){
      this.mensajevalidacion="No puedes dejar el campo de apellidos vacío"
      $('#validacion').modal('show');

    }  else if(model.responsable['correo']==""){
        this.mensajevalidacion="No puedes dejar el campo de correo vacío"
      $('#validacion').modal('show');

    }  
    else if(model.responsable['telefono']==""){
      this.mensajevalidacion="No puedes dejar el campo de telefono vacío"
      $('#validacion').modal('show');

    }  
    else if(model.responsable['departamento']==""){
      this.mensajevalidacion="No puedes dejar el campo de departamento vacío"
      $('#validacion').modal('show');

    }  
    else if(model.responsable['puesto']==""){
      this.mensajevalidacion="No puedes dejar el campo de puesto vacío"
      $('#validacion').modal('show');

    }  
    else if(model.responsable['usuario']==""){
      this.mensajevalidacion="No puedes dejar el campo de usuario vacío"
      $('#validacion').modal('show');

    } 
    else if(model.responsable['contraseña']==""){
      this.mensajevalidacion="No puedes dejar el campo de contraseña vacío"
      $('#validacion').modal('show');

    } 
    else if(this.listaRubros.length==0){
      this.mensajevalidacion="Debes selecciónar al menos un rubro"
      $('#validacion').modal('show');

    } 
    
    else if(this.listaAreasAccion.length==0){
      this.mensajevalidacion="Debes selecciónar al menos una Area"
      $('#validacion').modal('show');

    } 
    else{


console.log(this.responsablemodel);
    console.log(model)

    this.organizacionService.create(model).subscribe((res: any)=>{
      this.validar=true;

               $('#success-modal-preview').modal('show');

    this._location.back();


    }, error=>{
      alert(error.error)

    })
  
 
  
  }
  }
  
}
