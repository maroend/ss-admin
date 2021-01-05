  import { Component, OnInit,ViewChild,OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';
import { UsuarioServices } from '../services/usuario.service';
import { Usuario } from "../models/usuario"
import { Subject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-convocatorias',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnDestroy, OnInit {
  public usuarios: Usuario[] = [ ];
  dtTrigger  = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(private convocatoriaService:UsuarioServices ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
  
      language:{url:'//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'}
    };
    this.obtenerConvocatoria();

  }

  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerConvocatoria() {
    return this.convocatoriaService
      .getUsuarios()
      .subscribe((usuarios: Usuario[]) =>{ this.usuarios = usuarios;
        this.dtTrigger.next();
      
      });
  }

  eliminar(id) {
    this.convocatoriaService.eliminar(id).subscribe((res: any)=>{
     location.reload();

   }, error=>{
     alert(error.error)
   })



 
 }

 ngOnDestroy():void{
  this.dtTrigger.unsubscribe();

}
 modaleliminar(id) {
   console.log("dfdsfdsfds"+ id);
   $('#delete-modal-preview-'+id).modal('show');

  }

}
