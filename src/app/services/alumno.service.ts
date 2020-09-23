import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/alumno';
import { environment } from "../../environments/environment";

import { map } from 'rxjs/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getAlumnos() {
    return this.http.get(`${this.baseUrl}/getAll.php`);
  }

  getAlumno(id: string | number) {
    return this.http.get(`${this.baseUrl}/get.php?idAlumno=${id}`);
  }

  addAlumno(alumno: Alumno) {
    return this.http.post(`${this.baseUrl}/post.php`, alumno);
  }

  deleteAlumno(alumno: Alumno) {
    return this.http.delete(`${this.baseUrl}/delete.php?idAlumno=${alumno.id}`);
  }

  updateAlumno(alumno: Alumno) {
    return this.http.put(`${this.baseUrl}/update.php`, alumno);
  }


}
