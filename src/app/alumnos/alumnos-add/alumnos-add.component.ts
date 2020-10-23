import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../../services/alumno.service';
import { UniversidadService } from '../../services/universidad.service';
import { CarreraService } from '../../services/carrera.service';
import { FacultadService } from '../../services/facultad.service';
import { Universidad } from "../../models/universidad";
import { Carrera } from "../../models/carrera";
import { Facultad } from "../../models/facultad";

import { Router } from '@angular/router';
import {Location} from '@angular/common';


declare var $: any;

@Component({
  selector: 'app-alumnos-add',
  templateUrl: './alumnos-add.component.html',
  styleUrls: ['./alumnos-add.component.css']
})
export class AlumnosAddComponent implements OnInit {

  activo = true;
  public mensajevalidacion="";
public facu=1;
public uni=1;
public carre=1;

public peri=201860;
  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];

  constructor(private facultadService: FacultadService,private carreraService: CarreraService,private universidadService: UniversidadService, private alumnoService: AlumnoService, private router: Router,private _location: Location) { }

  ngOnInit(): void {

    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();

  }


  obtenerUniversidades(){

    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }


  obtenerCarreras(){

    return this.carreraService
      .getCarreras()
      .subscribe((carreras: Carrera[]) => this.carreras = carreras);

  }

  obtenerFacultades(){

    return this.facultadService
      .getFacultades()
      .subscribe((facultades: Facultad[]) => this.facultades = facultades);

  }



  onSubmit(data) {
    data.idFacultad=this.facu;
    data.idCarrera=this.facu;
    data.idUniversidad=this.uni;
console.log(data);

    var temporal=(data.value);
console.log(temporal);



    if(temporal['nombre']==""){
      this.mensajevalidacion="No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');
      
    }
    else if(temporal['matricula']==""){
      this.mensajevalidacion="No puedes dejar el campo de matricula vacío"
      $('#validacion').modal('show');

    }
     
    else if(temporal['paterno']==""){
      this.mensajevalidacion="No puedes dejar el campo de paterno vacío"
      $('#validacion').modal('show');
      
    }
    else if(temporal['materno']==""){
      this.mensajevalidacion="No puedes dejar el campo de materno vacío"
      $('#validacion').modal('show');
      
    }
  
    else if(temporal['porcentaje']==""){

      this.mensajevalidacion="No puedes dejar el campo de porcentaje vacío"
      $('#validacion').modal('show');
    }
    else if(temporal['correo']==""){
      this.mensajevalidacion="No puedes dejar el campo de correo vacío"
      $('#validacion').modal('show');
      
    }
    else if(temporal['celular']==""){
      this.mensajevalidacion="No puedes dejar el campo de celular vacío"
      $('#validacion').modal('show');
      
    }
    else if(temporal['pais']==""){
      this.mensajevalidacion="No puedes dejar el campo de pais vacío"
      $('#validacion').modal('show');
      
    }
    else if(temporal['cp']==""){

      this.mensajevalidacion="No puedes dejar el campo de cp vacío"
      $('#validacion').modal('show');
    } 
    else if(temporal['estado']==""){
      this.mensajevalidacion="No puedes dejar el campo de estado vacío"
      $('#validacion').modal('show');
      
    }
    else if(temporal['municipio']==""){
      this.mensajevalidacion="No puedes dejar el campo de municipio vacío"
      $('#validacion').modal('show');
      
    }
    else if(temporal['colonia']==""){

      this.mensajevalidacion="No puedes dejar el campo de colonia vacío"
      $('#validacion').modal('show');
    } 
    else if(temporal['calle']==""){
      this.mensajevalidacion="No puedes dejar el campo de calle vacío"
      $('#validacion').modal('show');
      
    }
else{

    this.alumnoService.addAlumno(data.value).subscribe(() => {
      
  
           $('#success-modal-preview').modal('show');

    this._location.back();
    })

  }
  }


  ngAfterViewInit() {
    Feather.replace();
  }

}
