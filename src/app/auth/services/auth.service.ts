import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from 'src/app/shared/functions/utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.api}Usuarios`

  constructor(private http: HttpClient, private utils: Utils) { }

  login(model){
    const query = this.utils.getAll(model);
    return this.http.get(`${this.api}/login?${query}`);
  }
}
