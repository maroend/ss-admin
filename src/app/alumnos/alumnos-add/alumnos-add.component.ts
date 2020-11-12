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
import { AreasVidaUniversitaria, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales, ModalidadesTrabajo } from '../../models/alumno';
import { AreasVidaUniversitariaService } from '../../services/areasvidauniversitaria.service';
import { ModalidadesTrabajoService } from '../../services/modalidadestrabajo.service';


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
  public listaAreasUniversidad: AreasVidaUniversitaria[] = [];
  public listaAreasUniversidadParticipado: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActuales: AlumnosAreasVidaUniversitariaActuales[] = [];
  public listaModalidadesTrabajo: ModalidadesTrabajo[] = [];

  constructor(private facultadService: FacultadService, private carreraService: CarreraService, private universidadService: UniversidadService, private alumnoService: AlumnoService, private areasVidaUniversitaria: AreasVidaUniversitariaService, private modalidadesTrabajoService: ModalidadesTrabajoService, private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerAreasVidaUniversitaria();
    this.obtenerModalidadesTrabajo()
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

  obtenerModalidadesTrabajo(){

    return this.modalidadesTrabajoService
      .getModalidadesTrabajo()
      .subscribe((listaModalidadesTrabajo: ModalidadesTrabajo[]) => this.listaModalidadesTrabajo = listaModalidadesTrabajo);

  }
  
  obtenerAreasVidaUniversitaria(){

    return this.areasVidaUniversitaria
      .getAreasVidaUniversitaria()
      .subscribe((listaAreasUniversidad: AreasVidaUniversitaria[]) => this.listaAreasUniversidad = listaAreasUniversidad);

  }

  toggleAreasVidaUniversitariaParticipado(checked, id) {
    console.log(checked);
    id=Number(id)
    var valor = { "idAreaVidaUniversitaria": id, "activo": true };

    var competencia = this.listaAreasUniversidad.find(x => x.id === id);
    if (checked) this.listaAreasUniversidadParticipado.push(valor);
    else this.listaAreasUniversidadParticipado = this.listaAreasUniversidadParticipado.filter(item => item.idAreaVidaUniversitaria !== id);

    console.log(this.listaAreasUniversidadParticipado);
  }

  toggleAreasVidaUniversitariaActuales(checked, id) {
    console.log(checked);
    var valor = { "idAreaVidaUniversitaria": id, "activo": true };

    var area = this.listaAreasUniversidad.find(x => x.id === id);
    if (checked) this.listaAreasUniversidadActuales.push(valor);
    else this.listaAreasUniversidadActuales = this.listaAreasUniversidadActuales.filter(item => item.idAreaVidaUniversitaria !== id);

    console.log(this.listaAreasUniversidadActuales);
  }


  onSubmit(data) {
    data.idFacultad=this.facu;
    data.idCarrera=this.facu;
    data.idUniversidad=this.uni;
  //  console.log(data);

    var temporal = (data.value);
    
console.log(temporal);

    if(temporal['nombre']==""){
      this.mensajevalidacion="No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');
      
    }
    else if (temporal['paterno'] == "") {
      this.mensajevalidacion = "No puedes dejar el campo de paterno vacío"
      $('#validacion').modal('show');

    }
    else if (temporal['materno'] == "") {
      this.mensajevalidacion = "No puedes dejar el campo de materno vacío"
      $('#validacion').modal('show');

    }
    else if(temporal['matricula']==""){
      this.mensajevalidacion="No puedes dejar el campo de matricula vacío"
      $('#validacion').modal('show');

    }
    else if(temporal['porcentaje']==""){

      this.mensajevalidacion="No puedes dejar el campo de porcentaje académico vacío"
      $('#validacion').modal('show');
    }
    else if (temporal['avanceCreditos']==""){

      this.mensajevalidacion="No puedes dejar el campo de avance de creditos vacío"
      $('#validacion').modal('show');
    }
    else if (temporal['noCuatrimestre']==""){

      this.mensajevalidacion="No puedes dejar el campo no de cuatrimestre vacío"
      $('#validacion').modal('show');
    }
    else if (temporal['esquemaPeriodo']==""){

      this.mensajevalidacion ="No puedes dejar el campo de esquema periodo vacío"
      $('#validacion').modal('show');
    }
    else if (temporal['generacion']==""){

      this.mensajevalidacion ="No puedes dejar el campo de generación vacío"
      $('#validacion').modal('show');
    }
    else if (temporal['fechaEstimadaGraduacion']==""){

      this.mensajevalidacion="No puedes dejar el campo de fecha estimada de graduaciòn vacío"
      $('#validacion').modal('show');
    }
    else if (temporal['correoInstitucional']==""){
      this.mensajevalidacion="No puedes dejar el campo de correo institucional vacío"
      $('#validacion').modal('show');
      
    }
    else if (temporal['CorreoPersonal']==""){
      this.mensajevalidacion="No puedes dejar el campo de correo personal vacío"
      $('#validacion').modal('show');
      
    }
    else if (temporal['password']==""){
      this.mensajevalidacion="No puedes dejar el campo de contraseña vacío"
      $('#validacion').modal('show');
      
    }
    else if(temporal['telefono']==""){
      this.mensajevalidacion="No puedes dejar el campo de telefono vacío"
      $('#validacion').modal('show');
      
    }
    else if (temporal['fechaNacimiento']==""){
      this.mensajevalidacion="No puedes dejar el campo de fecha de nacimiento vacío"
      $('#validacion').modal('show');
      
    }
    else if (temporal['sexo']==""){

      this.mensajevalidacion="No puedes dejar el campo de sexo vacío"
      $('#validacion').modal('show');
    } 
    else if (temporal['participacionAsua']==""){
      this.mensajevalidacion="No puedes dejar el campo de participacion Asua vacío"
      $('#validacion').modal('show');
      
    }
    else if (temporal['trabajas']==""){
      this.mensajevalidacion="No puedes dejar el campo de trabajas vacío"
      $('#validacion').modal('show');
      
    }
    else {
      //console.log(data.value);
      temporal["listaAreaVidaUniversitariaParticipado"] = this.listaAreasUniversidadParticipado;
      temporal["listaAreaVidaUniversitariaActuales"] = this.listaAreasUniversidadActuales;
      console.log(temporal);
      

      this.alumnoService.addAlumno(temporal).subscribe(() => {
      
  
           $('#success-modal-preview').modal('show');

    this._location.back();
    })
    
  }
  }


  ngAfterViewInit() {
    Feather.replace();
  }

}
