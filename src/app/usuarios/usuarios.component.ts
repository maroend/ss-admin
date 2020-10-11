  import { Component, OnInit,ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { UsuarioServices } from '../services/usuario.service';
import { Usuario } from "../models/usuario"

@Component({
  selector: 'app-convocatorias',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public usuarios: Usuario[] = [ ];
  @ViewChild('dataTable', {static: false}) table;

  dataTable: any;

  constructor(private convocatoriaService:UsuarioServices ) { }

  ngOnInit(): void {
    this.obtenerConvocatoria();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }

  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerConvocatoria() {
    return this.convocatoriaService
      .getUsuarios()
      .subscribe((usuarios: Usuario[]) => this.usuarios = usuarios);
  }
}
