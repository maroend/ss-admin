  import { Component, OnInit,ViewChild,OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';
import { UsuarioServices } from '../services/usuario.service';
import { Usuario } from "../models/usuario"
import { Subject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnDestroy, OnInit {
  public usuarios: Usuario[] = [ ];
  dtTrigger  = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor( ) { }

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
  
    //   language:{url:'//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'}
    // };
    //this.obtenerConvocatoria();
    document.getElementById("empresa").style.backgroundColor ="#FF8300";

    document.getElementById("alumnos").style.backgroundColor ="gray";


  }

  ngAfterViewInit() {
    Feather.replace();
  }
  // obtenerConvocatoria() {
  //   return this.convocatoriaService
  //     .getUsuarios()
  //     .subscribe((usuarios: Usuario[]) =>{ this.usuarios = usuarios;
  //       this.dtTrigger.next();
      
  //     });
  // }



 ngOnDestroy():void{
  this.dtTrigger.unsubscribe();

}
 modaleliminar(id) {
   console.log("dfdsfdsfds"+ id);
   $('#delete-modal-preview-'+id).modal('show');

  }

  recargar()
  {


    document.getElementById("empresa").style.backgroundColor ="#FF8300";

    document.getElementById("alumnos").style.backgroundColor ="gray";

    // var tabla1 = document.getElementById("tabla1");
    // var tabla2 = document.getElementById("tabla2");
    // tabla1.style.display = "block";
    // tabla2.style.display = "none";


    

  }

  recargar2()
  {

    document.getElementById("empresa").style.backgroundColor ="gray";

    document.getElementById("alumnos").style.backgroundColor ="#FF8300";
  
    // var tabla1 = document.getElementById("tabla1");
    // var tabla2 = document.getElementById("tabla2");
    // tabla1.style.display = "none";
    // tabla2.style.display = "block";

  

  }
}
