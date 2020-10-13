import { Component, OnInit,ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Empresa } from "../models/empresa"
import { OrganizationService } from '../services/organization.service';
declare var $: any;

@Component({ 
  selector: 'app-empresas-projects',
  templateUrl: './empresas-home.component.html',
  styleUrls: ['./empresas-home.component.scss']
})
export class EmpresashomeComponent implements OnInit {
  public empresa: Empresa[] = [  ];
  @ViewChild('dataTable', {static: false}) table;

  dataTable: any;

  constructor(private organizacionService: OrganizationService) { }

 
  
  ngOnInit() {

    this.obtenerorganizaciones();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }

  obtenerorganizaciones() {
    return this.organizacionService
      .getAll()
      .subscribe((empresa: Empresa[]) => this.empresa = empresa);
  }

  ngAfterViewInit() {

   // $('#tablaempresa').DataTable().destroy();
    //$('#tablaempresa').DataTable();
    Feather.replace();
  }
}
