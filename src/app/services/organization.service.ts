import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  api = environment.baseUrl


  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(`${this.api}/Organizaciones`);
  }
  getOrganizacion(id: string | number){
    const uri = `${this.api}/Organizaciones/${id}`;
         console.log(uri);
    return this.http.get(uri);
  }
  getAreas(){
    const uri = `${this.api}/AreasAccion`;
    return this.http.get(uri);
  }

  getRubros(){
    const uri = `${this.api}/Rubros`;
    return this.http.get(uri);
  }
  getUniversidades(){
    const uri = `${this.api}/Universidades`;
    return this.http.get(uri);
  }
  getTipo(){
    const uri = `${this.api}/TiposOrganizaciones`;
    return this.http.get(uri);
  }

  getGiro(){
    const uri = `${this.api}/GirosOrganizaciones`;
    return this.http.get(uri);
  }
  getClasificacion(){
    const uri = `${this.api}/ClasificacionesOrganizaciones`;
    return this.http.get(uri);
  }
  getEstado(){
    const uri = `${this.api}/EstadosOrganizaciones
    `;
    return this.http.get(uri);
  }
  
  create(model){
    const uri = `${this.api}/Organizaciones`
    return this.http.post(uri, model);
  }
  createWithDetails(model){
    const uri = `${this.api}/CreateWithDetails`
    return this.http.post(uri, model);
  }
}
