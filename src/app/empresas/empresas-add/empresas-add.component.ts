import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-organization-add',
  templateUrl: './empresas-add.component.html',
  styleUrls: ['./empresas-add.component.scss']
})
export class EmpresasAddComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    Feather.replace();
  }

}
