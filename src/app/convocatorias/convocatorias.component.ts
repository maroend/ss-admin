import { Component, OnInit,ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria } from "../models/convocatoria"

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css']
})
export class ConvocatoriasComponent implements OnInit {
  @ViewChild('dataTable1', {static: false}) table;

  dataTable: any;
  public convocatorias:Convocatoria [] = [ ];
  constructor(private convocatoriaService: ConvocatoriaServices) { }

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
      .getConvocatoria()
      .subscribe((convocatorias: Convocatoria[]) => this.convocatorias = convocatorias);
  }

  recargar()
  {
    this.convocatorias=[];

    this.obtenerConvocatoria();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }
}
