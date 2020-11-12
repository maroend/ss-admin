import { Component, OnInit,ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Alumno } from '../models/alumno';
import { AlumnoService } from '../services/alumno.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  alumnos: Alumno[];
  @ViewChild('dataTable', {static: false}) table;
  public validar = false;

  dataTable:any;  
  constructor(private alumnosService: AlumnoService,private http: HttpClient) { }

  ngOnInit(): void {

   this.obtenerAlumnos();
   this.dataTable.DataTable();

  }

  obtenerAlumnos() {

    return this.alumnosService
    .getAlumnos()
    .subscribe((alumnos: Alumno[]) => this.alumnos = alumnos);
  }


  eliminar(id) {
    this.alumnosService.deleteAlumno(id).subscribe((res: any) => {

      if (res) {
        this.validar = true;
        location.reload();
      } else {
        alert("¡Algo salio mal!");
      }
    }, error => {
      alert(error.error)
    })
  }

  modaleliminar(id) {
    console.log("dfdsfdsfds" + id);
    $('#delete-modal-preview-' + id).modal('show');
  }

  // obtenerAlumnos() {

  //   this.dtOptions = {
  //     pagingType: 'full_numbers',
  //     pageLength: 10,
  //     serverSide: true,
  //     processing: true,
  //     ajax: (dataTablesParameters: any, callback) => {

  //       this.alumnosService
  //       .getAlumnos(dataTablesParameters)
  //       .subscribe((resp:any) => {
            
  //           this.alumnos = resp.data;

  //           callback({
  //             recordsTotal: resp.recordsTotal,
  //             recordsFiltered: resp.recordsFiltered,
  //             data: []
  //           });
  //         });
  //     },
  //     columns: [{ data: 'nombre' }, { data: 'matricula' }, { data: 'universidad' },{ data: 'facultad' }]
  //   };

  // }

  ngAfterViewInit() {
    Feather.replace();
  }

}
