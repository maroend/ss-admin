import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { Empresa } from "../models/empresa"
import { OrganizationService } from '../services/organization.service';

@Component({ 
  selector: 'app-empresas-projects',
  templateUrl: './empresas-home.component.html',
  styleUrls: ['./empresas-home.component.scss']
})
export class EmpresashomeComponent implements OnInit {
  public empresas: Empresa[] = [

  ];
  constructor(private organizacionService: OrganizationService) { }

 
  
  ngOnInit() {

    this.obtenerorganizaciones();
  }

  obtenerorganizaciones() {
    return this.organizacionService
      .getAll()
      .subscribe((empresas: Empresa[]) => this.empresas = empresas);
  }

  ngAfterViewInit() {
    Feather.replace();
  }
}