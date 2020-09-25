import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ConvocatoriaServices } from '../../services/convocatoria.service';
import { Convocatoria } from "../../models/convocatoria"

import { Periodos } from "../../models/periodo"
import { Universidad } from "../../models/universidad"

import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-organization-add',
  templateUrl: './convocatoria-add.component.html',
  styleUrls: ['./convocatoria-add.component.scss']
})
export class ConvocatoriaAddComponent implements OnInit {
  public d: Date = new Date(); // but the type can also be inferred from "new Date()" already

  public convocatoria = new Convocatoria("",0,0,0,"",0,"",this.d,this.d,true,"");
  public periodos:Periodos[] = [];

  public universidades:Universidad[] = [];



  constructor(private convocatoriaservices: ConvocatoriaServices,private router: Router) {}

  ngOnInit(): void {
this.obtenerUniversidad();
this.obtenerperiodo();

  }
  obtenerUniversidad(){

    return this.convocatoriaservices
      .getUniversidad()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }
  obtenerperiodo(){

    return this.convocatoriaservices
      .getPeriodo()
      .subscribe((periodos: Periodos[]) => this.periodos = periodos);

  }
  ngAfterViewInit() {
    Feather.replace();
  }

  create(){
    let model = this.convocatoria;

    console.log(model)

    this.convocatoriaservices.create(model).subscribe((res: any)=>{
      console.log(res.message)
      this.router.navigate(['/convocatorias']);
      $('#success-modal-preview').modal('show');

    }, error=>{
      alert(error.error)
    })
  }

}
