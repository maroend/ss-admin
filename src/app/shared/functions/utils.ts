import { Injectable } from '@angular/core';

@Injectable()
export class Utils {
  getAll(options) {
    let params = new URLSearchParams();
    for(let key in options){
        params.set(key, options[key]) 
    }
    return params.toString()
  }
}
