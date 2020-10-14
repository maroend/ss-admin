import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Usuario } from '../models/usuario';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  api = environment.baseUrl;

  constructor(private http:HttpClient) { }


  login(model) {

   var email=model['email'];
   var contraseña=model['contraseña'];
   console.log(email);
   console.log(contraseña);

    const uri = `${this.api}/Usuarios/login?email=${email}&contrase%C3%B1a=${contraseña}`;
    console.log(uri);
    return this.http.get(uri,model);
 
  } 
  
}
