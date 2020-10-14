import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    Feather.replace();
  }

}
