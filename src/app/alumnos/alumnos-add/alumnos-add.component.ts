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


declare var $: any;

@Component({
  selector: 'app-alumnos-add',
  templateUrl: './alumnos-add.component.html',
  styleUrls: ['./alumnos-add.component.css']
})
export class AlumnosAddComponent implements OnInit {

  activo = true;

  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];

  constructor(private facultadService: FacultadService,private carreraService: CarreraService,private universidadService: UniversidadService, private alumnoService: AlumnoService, private router: Router) { }

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
          
    console.log(JSON.stringify(data.value));

    this.alumnoService.addAlumno(data.value).subscribe(() => {
      
  
      $('#success-modal-preview').modal('show');

      this.router.navigate(['/alumnos']);
    })

  }


  ngAfterViewInit() {
    Feather.replace();
  }

}
