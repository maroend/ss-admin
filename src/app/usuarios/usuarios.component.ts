import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria } from "../models/convocatoria"

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css']
})
export class ConvocatoriasComponent implements OnInit {
  public convocatorias:Convocatoria [] = [

  ];
  constructor(private convocatoriaService: ConvocatoriaServices) { }

  ngOnInit(): void {
    this.obtenerConvocatoria();
  }

  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerConvocatoria() {
    return this.convocatoriaService
      .getConvocatoria()
      .subscribe((convocatorias: Convocatoria[]) => this.convocatorias = convocatorias);
  }
}
