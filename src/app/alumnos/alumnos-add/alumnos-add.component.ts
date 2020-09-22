import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-alumnos-add',
  templateUrl: './alumnos-add.component.html',
  styleUrls: ['./alumnos-add.component.css']
})
export class AlumnosAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    Feather.replace();
  }

}
