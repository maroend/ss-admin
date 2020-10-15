import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../../services/alumno.service';
import { UniversidadService } from '../../services/universidad.service';
import { CarreraService } from '../../services/carrera.service';
import { FacultadService } from '../../services/facultad.service';
import { Universidad } from "../../models/universidad";
import { Carrera } from "../../models/carrera";
import { Facultad } from "../../models/facultad";
import { Alumno,AlumnoProyecto } from '../../models/alumno';

import { AlumnosComponent } from '../alumnos.component';
import {Location} from '@angular/common';


import { Router,ActivatedRoute } from '@angular/router';
import { Binary } from '@angular/compiler';
import { NgModel } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-organization-ver',
  templateUrl: './alumnos-ver.component.html',
  styleUrls: ['./alumnos-ver.component.scss']
})
export class AlumnosverComponent implements OnInit {
  activo = true;

  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];

  public idAlumno : string;
  public alumnoproyecto: AlumnoProyecto = new AlumnoProyecto("","", "",0, 0, 0);

  public alumno: Alumno = new Alumno("", "", "", "", 0, 0, 0, "", "", "", "", "", "", "", "", "", "", true, 0,);

  constructor(private route: ActivatedRoute, private router: Router,private facultadService: FacultadService,private carreraService: CarreraService,private universidadService: UniversidadService, private alumnoService: AlumnoService,private _location: Location) { }



  ngOnInit(): void {
    
    
    this.idAlumno = this.route.snapshot.paramMap.get("id");
    this.alumnoService.getAlumno(this.idAlumno).subscribe((alumno: Alumno) => this.alumno = alumno);
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerproyectoalumno();
    console.log(this.alumno);
  }

  obtenerUniversidades(){

    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }
  obtenerproyectoalumno(){

    return     this.alumnoService.getProyectoAlumno( this.idAlumno ).subscribe((alumnoproyecto: AlumnoProyecto) => this.alumnoproyecto = alumnoproyecto);

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


}
