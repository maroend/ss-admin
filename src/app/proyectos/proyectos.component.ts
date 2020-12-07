import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';
import { Proyecto } from "../models/proyectos"
import { ProyectoService } from '../services/proyecto.service';
declare var $: any;
import { Subject } from 'rxjs';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnDestroy, OnInit {
  public proyectos: Proyecto[] = [];
  dtOptions: DataTables.Settings = {};

  dtTrigger  = new Subject<any>();

  public validar = false;


  constructor(private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
  
      language:{url:'//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'}
    };

    this.obtenerProyectos();

    console.log(this.proyectos);
  }
  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();

  }
  obtenerProyectos() {
    return this.proyectoService
      .getAll()
      .subscribe((proyectos: Proyecto[]) => {this.proyectos = proyectos;
        this.dtTrigger.next();

      
      });
  }

  eliminar(id) {
    this.proyectoService.eliminar(id).subscribe((res: any) => {
      
      if (res) {
        this.validar = true;
        location.reload();
      } else {
        alert("¡Algo salio mal!");
      }
    }, error => {
      alert(error.error)
    })
  }

  modaleliminar(id) {
    console.log("dfdsfdsfds" + id);
    $('#delete-modal-preview-' + id).modal('show');
  }

  ngAfterViewInit() {
    Feather.replace();
  }


}
