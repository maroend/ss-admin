import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../../services/alumno.service';
import { UniversidadService } from '../../services/universidad.service';
import { CarreraService } from '../../services/carrera.service';
import { FacultadService } from '../../services/facultad.service';
import { Universidad } from "../../models/universidad";
import { Carrera } from "../../models/carrera";
import { Facultad } from "../../models/facultad";
import { Alumno } from '../../models/alumno';

import { Router, ActivatedRoute  } from '@angular/router';
import { AlumnosComponent } from '../alumnos.component';
import {Location} from '@angular/common';


declare var $: any;

@Component({
  selector: 'app-alumnos-edit',
  templateUrl: './alumnos-edit.component.html',
  styleUrls: ['./alumnos-edit.component.css']
})
export class AlumnosEditComponent implements OnInit {


  activo = true;

  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];

  public idAlumno : string;

  public alumno: Alumno = new Alumno("", "", "", "", 0, 0, 0, "", "", "", "", "", "", "", "", "", "", true, 0,);

  constructor(private route: ActivatedRoute, private router: Router,private facultadService: FacultadService,private carreraService: CarreraService,private universidadService: UniversidadService, private alumnoService: AlumnoService,private _location: Location) { }



  ngOnInit(): void {
    this.idAlumno = this.route.snapshot.paramMap.get("id");
    this.alumnoService.getAlumno(this.idAlumno).subscribe((alumno: Alumno) => this.alumno = alumno);
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
          
    console.log(JSON.stringify(data.value));

    this.alumnoService.updateAlumno(this.idAlumno,data.value).subscribe(() => {
      
           $('#success-modal-preview').modal('show');

    this._location.back();
    })

  }


  ngAfterViewInit() {
    Feather.replace();
  }

}
