import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../../services/alumno.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alumnos-add',
  templateUrl: './alumnos-add.component.html',
  styleUrls: ['./alumnos-add.component.css']
})
export class AlumnosAddComponent implements OnInit {

  constructor(private alumnoService: AlumnoService, private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(data) {
          
    //console.warn(data.value);

    this.alumnoService.addAlumno(data.value).subscribe(() => {
      
      this.router.navigate(['/alumnos']);
    })

  }




  ngAfterViewInit() {
    Feather.replace();
  }

}
