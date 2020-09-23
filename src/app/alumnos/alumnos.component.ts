import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { Alumno } from '../models/alumno';
import { AlumnoService } from '../services/alumno.service';
import { HttpClient, HttpResponse } from '@angular/common/http';



class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  alumnos: Alumno[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

   this.obtenerAlumnos();
    
  }



  obtenerAlumnos() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(
            'http://localhost/mascotas/alumnos/getAll.php',
            dataTablesParameters, {}
          ).subscribe(resp => {
            
            console.log(resp);

            this.alumnos = resp.data;


            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'nombre' }, { data: 'paterno' }]
    };


  }

  ngAfterViewInit() {
    Feather.replace();
  }

}
