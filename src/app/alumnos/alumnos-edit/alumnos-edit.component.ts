import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../../services/alumno.service';
import { UniversidadService } from '../../services/universidad.service';
import { CarreraService } from '../../services/carrera.service';
import { FacultadService } from '../../services/facultad.service';
import { Universidad } from "../../models/universidad";
import { Carrera } from "../../models/carrera";
import { Facultad } from "../../models/facultad";
import { Alumno, AreasVidaUniversitaria, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales, ModalidadesTrabajo } from '../../models/alumno';

import { Router, ActivatedRoute  } from '@angular/router';
import { AlumnosComponent } from '../alumnos.component';
import {Location} from '@angular/common';
import { ModalidadesTrabajoService } from '../../services/modalidadestrabajo.service';
import { AreasVidaUniversitariaService } from '../../services/areasvidauniversitaria.service';


declare var $: any;

@Component({
  selector: 'app-alumnos-edit',
  templateUrl: './alumnos-edit.component.html',
  styleUrls: ['./alumnos-edit.component.css']
})
export class AlumnosEditComponent implements OnInit {


  activo = true;
  public mensajevalidacion="";

  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];
  public listaAreasUniversidad: AreasVidaUniversitaria[] = [];
  public listaAreasUniversidadParticipado: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActuales: AlumnosAreasVidaUniversitariaActuales[] = [];
  public listaAreasUniversidadParticipadoNew: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActualesNew: AlumnosAreasVidaUniversitariaActuales[] = [];
  public listaModalidadesTrabajo: ModalidadesTrabajo[] = [];
  public idsPasados: any;
  public idsActuales: any;

  public idAlumno : string;

  public alumno: Alumno = new Alumno("", "", "", "", 0, 0, 0, "", "", "", 0, 0, "", "", 0, "", "", "", "", "", "", "", "", "", 0, "", true,true, this.listaAreasUniversidadParticipadoNew, this.listaAreasUniversidadActualesNew,0,"","");

  constructor(private route: ActivatedRoute, private router: Router,private facultadService: FacultadService,
    private carreraService: CarreraService, private universidadService: UniversidadService, private alumnoService: AlumnoService, private areasVidaUniversitaria: AreasVidaUniversitariaService, private modalidadesTrabajoService: ModalidadesTrabajoService,private _location: Location) { }


  ngOnInit(): void {
    this.idAlumno = this.route.snapshot.paramMap.get("id");
    this.alumnoService.getAlumno(this.idAlumno).subscribe((alumno: Alumno) => {
      this.alumno = alumno;
      this.alumno.fechaEstimadaGraduacion = alumno.fechaEstimadaGraduacionString;
      this.alumno.fechaNacimiento = alumno.fechaNacimientoString;
      this.alumno.fechaInicioServicioSocial = alumno.fechaInicioServicioSocialString;
      
      this.idsPasados = this.alumno.listaAreaVidaUniversitariaParticipado.map(({ idAreaVidaUniversitaria }) => idAreaVidaUniversitaria);
      this.idsActuales = this.alumno.listaAreaVidaUniversitariaActuales.map(({ idAreaVidaUniversitaria }) => idAreaVidaUniversitaria);

      console.log(this.alumno);
    });
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerAreasVidaUniversitaria();
    this.obtenerModalidadesTrabajo()
    console.log(this.alumno);

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


  obtenerModalidadesTrabajo() {

    return this.modalidadesTrabajoService
      .getModalidadesTrabajo()
      .subscribe((listaModalidadesTrabajo: ModalidadesTrabajo[]) => this.listaModalidadesTrabajo = listaModalidadesTrabajo);

  }

  obtenerAreasVidaUniversitaria() {

    return this.areasVidaUniversitaria
      .getAreasVidaUniversitaria()
      .subscribe((listaAreasUniversidad: AreasVidaUniversitaria[]) => this.listaAreasUniversidad = listaAreasUniversidad);

  }

  toggleAreasVidaUniversitariaParticipado(checked, id) {
    console.log(checked);
    id = Number(id)
    var valor = { "idAreaVidaUniversitaria": id, "activo": true };

    var competencia = this.listaAreasUniversidad.find(x => x.id === id);
    if (checked) this.alumno.listaAreaVidaUniversitariaParticipado.push(valor);
    else this.alumno.listaAreaVidaUniversitariaParticipado = this.alumno.listaAreaVidaUniversitariaParticipado.filter(item => item.idAreaVidaUniversitaria !== id);

    console.log(this.alumno.listaAreaVidaUniversitariaParticipado);
  }

  toggleAreasVidaUniversitariaActuales(checked, id) {
    console.log(checked);
    var valor = { "idAreaVidaUniversitaria": id, "activo": true };

    var area = this.listaAreasUniversidad.find(x => x.id === id);
    if (checked) this.alumno.listaAreaVidaUniversitariaActuales.push(valor);
    else this.alumno.listaAreaVidaUniversitariaActuales = this.alumno.listaAreaVidaUniversitariaActuales.filter(item => item.idAreaVidaUniversitaria !== id);

    console.log(this.alumno.listaAreaVidaUniversitariaActuales);
  }

  onSubmit(data) {
 
  var temporal=(data.value);

  console.log(temporal);

    console.log(temporal['universidad']);

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
          console.log(JSON.stringify(data.value));
          this.alumnoService.updateAlumno(this.idAlumno, this.alumno).subscribe(() => {
      
           $('#success-modal-preview').modal('show');

    this._location.back();
    })
  }
  }


  ngAfterViewInit() {
    Feather.replace();
  }

}
