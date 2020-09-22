import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from 'src/app/shared/functions/utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private api = `${environment.api}Organizaciones`

  constructor(private http: HttpClient, private utils: Utils) { }

  getAll(){
    return this.http.get(this.api);
  }

  getProjects(){
    const uri = `${this.api}/Proyectos`;
    return this.http.get(uri);
  }

  getContacts(){
    const uri = `${this.api}/Contactos`;
    return this.http.get(uri);
  }

  getDocuments(){
    const uri = `${this.api}/Documentos`;
    return this.http.get(uri);
  }

  getStudents(){
    const uri = `${this.api}/Alumnos`;
    return this.http.get(uri);
  }

  getTerms(){
    const uri = `${this.api}/Periodos`;
    return this.http.get(uri);
  }

  getResources(){
    const uri = `${this.api}/Recursos`;
    return this.http.get(uri);
  }

  getHours(){
    const uri = `${this.api}/Horas`;
    return this.http.get(uri);
  }

  getStudentHours(id){
    const uri = `${this.api}/Alumno/${id}/Horas`;
    return this.http.get(uri);
  }

  getQuestions(){
    const uri = `${this.api}/Preguntas`;
    return this.http.get(uri);
  }

  create(model){
    const uri = `${this.api}`
    return this.http.post(uri, model);
  }

  createWithDetails(model){
    const uri = `${this.api}/CreateWithDetails`
    return this.http.post(uri, model);
  }
}
