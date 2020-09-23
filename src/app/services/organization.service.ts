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
    return this.http.get(`${this.api}Organizaciones`);
  }

  getAreas(){
    const uri = `${this.api}AreasAccion`;
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
