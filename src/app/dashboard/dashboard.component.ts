import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Router } from '@angular/router';
import { Empresa } from "../models/empresa"
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria,Tipo } from "../models/convocatoria"
import { count } from 'rxjs-compat/operator/count';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public empresa: Empresa[] = [  ];
  public empresacantidad: number;
  public empresaactiva: Empresa[] = [  ];
  public empresadesaciva: Empresa[] = [  ];

  public tipoModel = new Tipo(1);
  public convocatorias:Convocatoria [] = [ ];
  public convocatoriasalumnos:Convocatoria [] = [ ];

  constructor(private organizacionService: OrganizationService,private router: Router,private convocatoriaService: ConvocatoriaServices) { }


  ngOnInit(): void {
    this.obtenerempresa();
    this.obtenerConvocatoria1();
    this.obtenerConvocatoria2();
  }

  ngAfterViewInit() {
    Feather.replace();

  }



  obtenerempresa() {
    let model = this.tipoModel;
    model.tipo=1;
    this.organizacionService.getAll().subscribe((res: any[])=>{     
      console.log(res);

this.convocatorias=res;

this.empresacantidad= res.length;
this.empresa= res;


console.log(this.empresacantidad);
for(var i=0;i<this.empresacantidad;i++){

 if(this.empresa[i].activo==true){
this.empresaactiva.push(this.empresa[i]);
 }else{
   this.empresadesaciva.push(this.empresa[i]);


 }

}

console.log(this.empresadesaciva);
console.log(this.empresaactiva);

})
  }


  obtenerConvocatoria1() {
    let model = this.tipoModel;
    model.tipo=1;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[])=>{                     
this.convocatorias=res;

})
  }

  obtenerConvocatoria2() {
    let model = this.tipoModel;
    model.tipo=2;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[])=>{
this.convocatoriasalumnos=res;

})
  }

}
