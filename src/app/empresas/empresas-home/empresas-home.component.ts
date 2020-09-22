import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({ 
  selector: 'app-empresas-projects',
  templateUrl: './empresas-home.component.html',
  styleUrls: ['./empresas-home.component.scss']
})
export class EmpresashomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    Feather.replace();
  }

}
