import { Component, OnInit,OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria,Tipo } from "../models/convocatoria";
import { Subject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css']
})
export class ConvocatoriasComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger  = new Subject<any>();
  dtTrigger2  = new Subject<any>();

data: any;
  public convocatorias:Convocatoria [] = [ ];
  public convocatorias2:Convocatoria [] = [ ];

  
  
  constructor(private convocatoriaService: ConvocatoriaServices) { }
  public tipoModel = new Tipo(1);

  ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
    
        language:{url:'//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'}
      };

    this.obtenerConvocatoria1(1);
    this.obtenerConvocatoria2(2);

    document.getElementById("empresa").style.backgroundColor ="blue";

    document.getElementById("alumnos").style.backgroundColor ="gray";


  }
  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
this.dtTrigger2.unsubscribe();
  }
  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerConvocatoria(tipo) {
    let model = this.tipoModel;
    model.tipo=tipo;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[])=>{
this.convocatorias=res;


})


  }
  obtenerConvocatoria1(tipo) {
    let model = this.tipoModel;
    model.tipo=tipo;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[])=>{
this.convocatorias=res;
this.dtTrigger.next();


})


  }

  obtenerConvocatoria2(tipo) {
    let model = this.tipoModel;
    model.tipo=tipo;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[])=>{
this.convocatorias2=res;
this.dtTrigger2.next();


})


  }
  eliminar(id) {
    this.convocatoriaService.eliminar(id).subscribe((res: any)=>{
     location.reload();

   }, error=>{
     alert(error.error)
   })



 
 }

 modaleliminar(id) {
   console.log("dfdsfdsfds"+ id);
   $('#delete-modal-preview-'+id).modal('show');
  }


  recargar()
  {


    document.getElementById("empresa").style.backgroundColor ="blue";

    document.getElementById("alumnos").style.backgroundColor ="gray";

    var tabla1 = document.getElementById("tabla1");
    var tabla2 = document.getElementById("tabla2");
    tabla1.style.display = "block";
    tabla2.style.display = "none";


    

  }

  recargar2()
  {

    document.getElementById("empresa").style.backgroundColor ="gray";

    document.getElementById("alumnos").style.backgroundColor ="blue";
  
    var tabla1 = document.getElementById("tabla1");
    var tabla2 = document.getElementById("tabla2");
    tabla1.style.display = "none";
    tabla2.style.display = "block";

  

  }
}
