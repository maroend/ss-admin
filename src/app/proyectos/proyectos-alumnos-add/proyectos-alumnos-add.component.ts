import { Component, OnInit, ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto, AlumnosProyectosAsignadosAddModel, AlumnosModel} from "../../models/proyectos";
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
import {Location} from '@angular/common';

@Component({
  selector: 'app-proyectos-alumnos-add',
  templateUrl: './proyectos-alumnos-add.component.html',
  styleUrls: ['./proyectos-alumnos-add.component.scss']
})
export class ProyectosAlumnosAddComponent implements OnInit {
  public idobtenido: number;
  public validar= false;
  public proyectoModel = new Proyecto("","","",0,"",0,"",0,"",0,"","","",false,0,"",false,"","","",0,"","",0,"",false,0,"",0,"","",false,undefined,undefined,0);
  public alumnosAsignar : any;
  public alumnos = new Array<AlumnosModel>();
  @ViewChild('dataTable', { static: false }) table;
  dataTable: any;

  constructor(private proyectoService: ProyectoService, private router: Router,
              private activatedRoute: ActivatedRoute,private _location: Location) {
  }


  ngOnInit(): void {
    this.obtenerAlumnos();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }

  ngAfterViewInit() {
    Feather.replace();
    this.idobtenido = <number><any>(this.activatedRoute.snapshot.paramMap.get("id"));

  }
  obtenerAlumnos() {
    return this.proyectoService
      .obtenerAlumnos()
      .subscribe((alumnos: AlumnosModel[]) => this.alumnos = alumnos);
  }
  toggleAlumnos(checked, id: number) {
    console.log(checked);
    var valor = { "idAlumno": id, "idProyecto": Number(this.idobtenido), "activo": true };

    this.alumnos.find(x => x.id === id);
    if (checked) this.alumnosAsignar = valor;
    else this.alumnosAsignar = new AlumnosProyectosAsignadosAddModel();


  }
  /*
  toggleAlumnos(checked, id: number) {
    console.log(checked);
    var valor = { "idAlumno": id, "idProyecto": this.idobtenido, "activo": true };

    this.alumnos.find(x => x.id === id);
    if (checked) this.alumnosAsignar.push(valor);
    else this.alumnosAsignar = this.alumnosAsignar.filter(item => item.idAlumno !== id);

    
  }
  */
  create() {

    let model = this.alumnosAsignar;
    console.log(this.alumnosAsignar);

    this.proyectoService.asignarAlumnosProyectos(this.alumnosAsignar).subscribe((res: any) => {
      //console.log(res.message);
      if (res) {
        $('#success-modal-preview').modal('show');

        this._location.back();
      }

    }, error => {
      alert(error.error)
    })

 
  }
}
