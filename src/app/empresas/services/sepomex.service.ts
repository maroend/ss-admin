import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Utils } from 'src/app/shared/functions/utils';

@Injectable({
  providedIn: 'root'
})
export class SepomexService {
  private api = `${environment.api}VSepomex`

  constructor(private http: HttpClient, private utils: Utils) { }

  getFromCP(options){
    const query = this.utils.getAll(options);
    return this.http.post(`${this.api}/GetFromCp?${query}`, null);
  }
}
