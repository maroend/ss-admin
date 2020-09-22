import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/alumno';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getMascotas() {
    return this.http.get(`${this.baseUrl}/getAll.php`);
  }

  getMascota(id: string | number) {
    return this.http.get(`${this.baseUrl}/get.php?idAlumno=${id}`);
  }

  addMascota(alumno: Alumno) {
    return this.http.post(`${this.baseUrl}/post.php`, alumno);
  }

  deleteMascota(alumno: Alumno) {
    return this.http.delete(`${this.baseUrl}/delete.php?idAlumno=${alumno.id}`);
  }

  updateMascota(alumno: Alumno) {
    return this.http.put(`${this.baseUrl}/update.php`, alumno);
  }


}
