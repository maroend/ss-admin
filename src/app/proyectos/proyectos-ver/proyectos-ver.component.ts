import { Component, OnInit, ViewChild} from '@angular/core';
import * as Feather from 'feather-icons';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto,  PeriodosModel, EstadosProyectosModel, estadoProyectoActualizar, ProyectosSucesosModel, ProyectosActividadesModel, AlumnosProyectosAsignadosModel, ProyectosCompetencias, ProyectosCarreras } from "../../models/proyectos";
import { Empresa } from "../../models/empresa";
import { OrganizationService } from '../../services/organization.service';
import { Universidad } from "../../models/universidad";
import { UniversidadService } from '../../services/universidad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Estadosalumnos,Estadosalumnoscambio } from "../../models/estadosalumnoss";



declare var $: any;

@Component({
  selector: 'app-proyectos-ver',
  templateUrl: './proyectos-ver.component.html',
  styleUrls: ['./proyectos-ver.component.scss']
})
export class ProyectosVerComponent implements OnInit {

  public idobtenido: number;
  public listaProyectosCompetencias = new Array<ProyectosCompetencias>();
  public listaProyectosCarreras = new Array<ProyectosCarreras>();
  public proyectoModel = new Proyecto("", "", "", 0, "", "", "", "", "", "", "", "", 0, 0, "", "", "", "", false, false, false, false, false, false, false, "", "", "", 0, "", 0, "", 0, "", 0, "", "", "", true, 0, this.listaProyectosCompetencias, this.listaProyectosCarreras);
  public validar = false;
  public organizaciones: Empresa[] = [];
  public periodos: PeriodosModel[] = [];
  public universidades: Universidad[] = [];
  public estadosProyectos: EstadosProyectosModel[] = [];
  public estadoact = new estadoProyectoActualizar();
  public sucesos: ProyectosSucesosModel[] = [];
  public proyectosActividades: ProyectosActividadesModel[] = [];
  public alumnos: AlumnosProyectosAsignadosModel[] = [];
  public estadosalumnos: Estadosalumnos[] = [];
  public estadoalumnocambio: Estadosalumnoscambio = new Estadosalumnoscambio();

  public idalum: number;

  //public alumno: Alumnos[] = [];


  constructor(private proyectoService: ProyectoService, private organizacionService: OrganizationService,
    private universidadService: UniversidadService,private router: Router,private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idobtenido = <number><any>(this.activatedRoute.snapshot.paramMap.get("id"));
    //this.proyectoService.getProyecto(this.idobtenido).subscribe((proyectoModel: Proyecto) => this.proyectoModel = proyectoModel);
    this.getProyecto(this.idobtenido);
    this.obtenerEstadosProyectos();
    this.obtenerSucesos();
    this.getActividadesByIdProyecto();
    this.obtenerAlumnosInscritos();
    this.obtenerestadoalumnos();
  }
 
  ngAfterViewInit() {
    Feather.replace();
  }
  
  getProyecto(id) {

    this.proyectoService.getProyecto(id).subscribe((res: any[]) => {

      this.proyectoModel = <Proyecto><any>res;
      console.log(this.proyectoModel);
    })
  }
  obtenerestadoalumnos() {
    return this.organizacionService
      .getestadosalumnos()
      .subscribe((estadosalumnos: Estadosalumnos[]) => this.estadosalumnos = estadosalumnos);
  }
  obtenerOrganizaciones() {
    return this.organizacionService
      .getAll()
      .subscribe((organizaciones: Empresa[]) => this.organizaciones = organizaciones);
  }
  obtenerPeriodos() {
    return this.proyectoService
      .getPeriodos()
      .subscribe((periodos: PeriodosModel[]) => this.periodos = periodos);
  }
  obtenerUniversidades() {
    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);
  }
  obtenerEstadosProyectos() {
    return this.proyectoService
      .getEstadosProyectos()
      .subscribe((estadosProyectos: EstadosProyectosModel[]) => this.estadosProyectos = estadosProyectos);
  }
  obtenerSucesos() {
    return this.proyectoService
      .getSucesosByIdProyecto(this.idobtenido)
      .subscribe((sucesos: ProyectosSucesosModel[]) => this.sucesos = sucesos);
  }
  getActividadesByIdProyecto() {
    return this.proyectoService
      .getActividadesByIdProyecto(this.idobtenido)
      .subscribe((proyectosActividades: ProyectosActividadesModel[]) => this.proyectosActividades = proyectosActividades);
  }
  obtenerAlumnosInscritos() {
    return this.proyectoService
      .getAlumnosInscritosByIdProyecto(this.idobtenido)
      .subscribe((alumnos: AlumnosProyectosAsignadosModel[]) => this.alumnos = alumnos);
  }
  
  onSubmit() {
    let model = this.proyectoModel;

     this.proyectoService.updateproyecto(this.idobtenido, model).subscribe((res: any) => {
      if (res) {
        this.validar = true;
      }
    }, error => {
      alert(error.error)
    })

    if (this.validar) {
      this.router.navigate(['/proyectos']);
      $('#success-modal-preview').modal('show');

    }
  }


  abrirsubir(id){

    console.log("dfdsfdsfds"+ id);
    $('#abrirsubir-'+id).modal('show');

  }

  mostraractualizarestado(id){
    this.idalum=Number(id);
    console.log("dfdsfdsfds"+ id);

        $('#mostareditaralumno-'+this.idalum).modal('show');
    
    
      }

  actualizarestado() {

    this.estadoact.idProyecto = Number(this.proyectoModel.id);
    this.estadoact.observaciones = this.proyectoModel.observaciones;
    this.estadoact.idEstado = Number(this.proyectoModel.idEstadoProyecto);
    let model = this.estadoact;
    console.log(model);
    this.proyectoService.updateestado(model).subscribe(() => {
      $('#success-modal-preview').modal('show');
      location.reload();


    }, error => {
      alert(error.error)
    })


  }
  cambiarestatusalumno(){


    this.estadoalumnocambio.idProyecto = Number(this.idobtenido);
    this.estadoalumnocambio.idAlumno = Number(this.idalum);


console.log(this.estadoalumnocambio);
    // this.organizacionService.updateestadoalumno(this.estadoalumnocambio).subscribe(() => {
    //   $('#success-modal-preview').modal('show');
    //   location.reload();
    var idf=  $('#estadofinal').val();
    var lastFive = idf.substr(idf.length - 1); // => "Tabs1" 

//camibo
    this.estadoalumnocambio.idEstado = Number(lastFive);
console.log(this.estadoalumnocambio);
    this.organizacionService.updateestadoalumno(this.estadoalumnocambio).subscribe(() => {
      $('#success-modal-preview').modal('show');
      location.reload();
//fincambio

    // }, error => {
    //   alert(error.error)
    })

  }
}
