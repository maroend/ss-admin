import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ConvocatoriaServices } from '../../services/convocatoria.service';
import { Convocatoria } from "../../models/convocatoria"

import { Periodos } from "../../models/periodo"
import { Universidad } from "../../models/universidad"

import { Router,ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { data } from 'jquery';
import {Location} from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-organization-add',
  templateUrl: './convocatoria-edit.component.html',
  styleUrls: ['./convocatoria-edit.component.scss']
})
export class ConvocatoriaEditComponent implements OnInit {

  public d: Date = new Date(); // but the type can also be inferred from "new Date()" already

  public convocatoria = new Convocatoria("",0,0,"",0,0,"",this.d,this.d,false,"");
  validar=false;
public fechaini="";
public fechafin="";
  public periodos:Periodos[] = [];

  public universidades:Universidad[] = [];
public idobtenido="";


  constructor(private convocatoriaservices: ConvocatoriaServices,private router: Router,private activatedRoute: ActivatedRoute,private _location: Location){}

  ngOnInit(): void {
    this.idobtenido=this.activatedRoute.snapshot.paramMap.get("id");
    this.convocatoriaservices.getConvocatoriaid(this.idobtenido).subscribe((convocatoria: Convocatoria) => this.convocatoria = convocatoria);
  this.getconvocatoriafecha(this.idobtenido);
this.obtenerperiodo();
this.obtenerUniversidad();

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

  update(){
    let model = this.convocatoria;

model.fechaInicio=new Date(this.fechaini);
model.fechaTermino=new Date(this.fechafin);




    console.log(model)

    this.convocatoriaservices.updateconvocatoria(this.idobtenido,model).subscribe((res: any)=>{
               $('#success-modal-preview').modal('show');

    this._location.back();
    }, error=>{
      alert(error.error)
    })

  }


  getconvocatoriafecha(id){
    this.convocatoriaservices.getConvocatoriaid(id).subscribe((res: any[])=>{
      console.log(res);

    var i=res['fechaInicio'];
    let ini=i.toLocaleString();
    console.log(ini); 
      var f =res['fechaTermino'];
      var fin=f.toLocaleString();

      var ini1 = ini.split("T",6);  
      var iini= ini1[0];
this.fechaini=iini;

var fin2 = fin.split("T",6);  
var tfin= fin2[0];
this.fechafin=tfin;
      
    })
  }




}
