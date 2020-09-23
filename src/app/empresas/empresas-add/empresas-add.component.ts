import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../../services/organization.service';
import { Areasaccion } from "../../models/Areasaccion"

@Component({
  selector: 'app-organization-add',
  templateUrl: './empresas-add.component.html',
  styleUrls: ['./empresas-add.component.scss']
})
export class EmpresasAddComponent implements OnInit {
  public areas: Areasaccion[] = [
  ];

  constructor(private organizacionService: OrganizationService) { }

  ngOnInit(): void {
    this.obtenerAreas();
  }

  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerAreas() {
    return this.organizacionService
      .getAreas()
      .subscribe((areas: Areasaccion[]) => this.areas = areas );
  }
 


}
