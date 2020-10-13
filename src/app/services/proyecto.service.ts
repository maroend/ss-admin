import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  api = environment.baseUrl

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.api}/Proyectos`);
  }
  getProyecto(id: string | number) {
    const uri = `${this.api}/Proyectos/${id}`;
    console.log(uri);
    return this.http.get(uri);
  }
  getUniversidades() {
    const uri = `${this.api}/Universidades`;
    return this.http.get(uri);
  }
  getEstadosProyectos() {
    const uri = `${this.api}/EstadosProyectos
    `;
    return this.http.get(uri);
  }
  getProyectosAreas() {
    const uri = `${this.api}/ProyectosAreas
    `;
    return this.http.get(uri);
  }
  getProyectosRangos() {
    const uri = `${this.api}/ProyectosRangos
    `;
    return this.http.get(uri);
  }
  getProyectosPoblaciones() {
    const uri = `${this.api}/ProyectosPoblaciones
    `;
    return this.http.get(uri);
  }
  getPeriodos() {
    const uri = `${this.api}/Periodos
    `;
    return this.http.get(uri);
  }
  getLineasTrabajo() {
    const uri = `${this.api}/LineasTrabajo
    `;
    return this.http.get(uri);
  }
  getApoyos() {
    const uri = `${this.api}/Apoyos
    `;
    return this.http.get(uri);
  }

  create(model) {
    const uri = `${this.api}/Proyectos`
    return this.http.post(uri, model);
  }
  updateproyecto(id: string | number, proyecto: Proyecto) {
    proyecto.id = Number(id);
    proyecto.activo = true;
    return this.http.put(`${this.api}/Proyectos/${id}`, proyecto);
  }

/*
getAreas() {
  const uri = `${this.api}/AreasAccion`;
  return this.http.get(uri);
}

getRubros() {
  const uri = `${this.api}/Rubros`;
  return this.http.get(uri);
}
  getTipo() {
    const uri = `${this.api}/TiposOrganizaciones`;
    return this.http.get(uri);
  }

  getGiro() {
    const uri = `${this.api}/GirosOrganizaciones`;
    return this.http.get(uri);
  }
  getClasificacion() {
    const uri = `${this.api}/ClasificacionesOrganizaciones`;
    return this.http.get(uri);
  }
  createWithDetails(model) {
    const uri = `${this.api}/CreateWithDetails`
    return this.http.post(uri, model);
  }
*/
}
