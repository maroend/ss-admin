import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto, EstadosProyectosModel, ProyectosCompetencias, ProyectosCarreras, ODS, PeriodosModel } from "../../models/proyectos";
import { Empresa } from "../../models/empresa";
import { OrganizationService } from '../../services/organization.service';
import { Universidad } from "../../models/universidad";
import { UniversidadService } from '../../services/universidad.service';
import { ConvocatoriaServices } from '../../services/convocatoria.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


declare var $: any;
let now = new Date();

@Component({
  selector: 'app-proyectos-add',
  templateUrl: './proyectos-add.component.html',
  styleUrls: ['./proyectos-add.component.scss']
})
export class ProyectosAddComponent implements OnInit {
   
   public mensajevalidacion="";
  public d: Date = new Date(); // but the type can also be inferred from "new Date()" already
  public fechaMinima: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate()+90);
  public listaProyectosCompetencias = new Array<ProyectosCompetencias>();
  public listaProyectosCarreras = new Array<ProyectosCarreras>();
  public proyectoModel = new Proyecto("", "", "", 0, "", "", "", "", "", "", "", "", 0, "", "", "", "", false,false, false, false, false, false, false, "", "", "", 0, "", 0, "", 0,"", 1, "", "", "", true, 0, this.listaProyectosCompetencias, this.listaProyectosCarreras);

  public validar = false;
  public organizaciones: Empresa[] = [];
  public proyectosCompetencias: ProyectosCompetencias[] = [];
  public proyectosCarreras: ProyectosCarreras[] = [];
  public ods: ODS[] = [];
  public universidades: Universidad[] = [];
  public periodos: PeriodosModel[] = [];
  public estadosProyectos: EstadosProyectosModel[] = [];
 
  constructor(private proyectoService: ProyectoService,
    private organizacionService: OrganizationService,
    private universidadService: UniversidadService,
    private convocatoriaService: ConvocatoriaServices,
    private router: Router,
    private _location: Location) {
  }

  ngOnInit(): void {
    this.obtenerOrganizaciones();
    this.obtenerCompetencias();
    this.obtenerCarreras();
    this.obtenerODS();
    this.obtenerUniversidades();
    this.obtenerEstadosProyectos();
    this.obtenerPeriodos();
    this.proyectoModel.horas = 240;
  }
  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerOrganizaciones() {
    return this.organizacionService
      .getAll()
      .subscribe((organizaciones: Empresa[]) => this.organizaciones = organizaciones);
  }
  obtenerCompetencias() {
    return this.proyectoService
      .getCompetencias()
      .subscribe((competencias: ProyectosCompetencias[]) => this.listaProyectosCompetencias = competencias);
  }
  obtenerCarreras() {
    return this.proyectoService
      .getCarreras()
      .subscribe((carreras: ProyectosCarreras[]) => { this.listaProyectosCarreras = carreras; });
  }
  obtenerODS() {
    return this.proyectoService
      .getODS()
      .subscribe((odss: ODS[]) => { this.ods = odss; });
  }

  obtenerPeriodos() {
    return this.convocatoriaService.getPeriodo()
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
      .subscribe((estadosProyectos: EstadosProyectosModel[]) => this.estadosProyectos = estadosProyectos );
  }
  toggleCompetencias(checked, id) {
    //console.log(checked);
    var valor = { "idProyecto": 0, "idCompetencia": id, "activo": true };
    if (checked) {
      if (this.proyectoModel.competenciasList.length < 5) {
        this.proyectoModel.competenciasList.push(valor);
      } else {
        $("#co" + id).prop("checked", false);
        this.mensajevalidacion = "solo permite seleccionar como máximo 5 competencias "
        $('#validacion').modal('show');
      }
    }
    else {
      this.proyectoModel.competenciasList = this.proyectoModel.competenciasList.filter(item => item.idCompetencia !== id);
    }

    //console.log(this.proyectoModel.competenciasList);
  }
  toggleCarreras(checked, id) {
    //console.log(checked);
    var valor = { "idCarrera": id, "activo": true };
    if (checked) {
      if (checked && this.proyectoModel.carrerasList.length < 7) {
        this.proyectoModel.carrerasList.push(valor);
      } else {
        $("#ca" + id).prop("checked", false);
        this.mensajevalidacion = "solo permite seleccionar como máximo 7 carreras"
        $('#validacion').modal('show');
      }
    }
    else {
      this.proyectoModel.carrerasList = this.proyectoModel.carrerasList.filter(item => item.idCarrera !== id);
    }

    //console.log(this.proyectoModel.carrerasList);
  }
  
  
  toggleDias(checked, id) {
    console.log(checked);

    if (id == 'lunes') {
      if (checked) {
        this.proyectoModel.lunes = true;
      } else {
        this.proyectoModel.lunes = false;
      }
    }else if (id == 'martes') {
      if (checked) {
        this.proyectoModel.martes = true;
      } else {
        this.proyectoModel.martes = false;
      }
    }else if (id == 'miercoles') {
      if (checked) {
        this.proyectoModel.miercoles = true;
      } else {
        this.proyectoModel.miercoles = false;
      }
    }else if (id == 'jueves') {
      if (checked) {
        this.proyectoModel.jueves = true;
      } else {
        this.proyectoModel.jueves = false;
      }
    }else if (id == 'viernes') {
      if (checked) {
        this.proyectoModel.viernes = true;
      } else {
        this.proyectoModel.viernes = false;
      }
    }else if (id == 'sabado') {
      if (checked) {
        this.proyectoModel.sabado = true;
      } else {
        this.proyectoModel.sabado = false;
      }
    }else if (id == 'domingo') {
      if (checked) {
        this.proyectoModel.domingo = true;
      } else {
        this.proyectoModel.domingo = false;
      }
    }

    console.log(this.proyectoModel);
  }
  
  create() {

    let model = this.proyectoModel;
    model.activo = true;

    console.log(model)
    if (model.idOrganizacion == 0) {
      this.mensajevalidacion = "No puedes dejar el campo de institucion vacío"
      $('#validacion').modal('show');
    } else if (model.proyecto == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre de proyecto vacío"
      $('#validacion').modal('show');
    }
    else if (model.descripcion == "") {
      this.mensajevalidacion = "No puedes dejar el campo de descripción vacío"
      $('#validacion').modal('show');
    }
    else if (model.nombreResponsable == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (model.puesto == "") {
      this.mensajevalidacion = "No puedes dejar el campo de puesto del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (model.area == "") {
      this.mensajevalidacion = "No puedes dejar el campo de area del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (!this.validarEmail(model.correoResponsable)) {
      this.mensajevalidacion = "Ingrese un correo valido"
      $('#validacion').modal('show');
    }
    else if (model.telefono == "") {
      this.mensajevalidacion = "No puedes dejar el campo de telefono del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (model.plazas == 0) {
      this.mensajevalidacion = "No puedes dejar el campo de plazas en 0"
      $('#validacion').modal('show');
    }
    else if (model.modalidadDistancia == "") {
      this.mensajevalidacion = "No puedes dejar el campo de modalidad a distancia vacío"
      $('#validacion').modal('show');
    }
    else if (model.justificacionImpactoSocial == "") {
      this.mensajevalidacion = "No puedes dejar el campo de justificaciòn del impacto del servicio social vacío"
      $('#validacion').modal('show');
    }
    else if (model.objetivo == "") {
      this.mensajevalidacion = "No puedes dejar el campo de objetivo vacío"
      $('#validacion').modal('show');
    }
    else if (model.fechaInicio == "") {
      this.mensajevalidacion = "No puedes dejar el campo de fecha Inicio vacío"
      $('#validacion').modal('show');
    }/*
    else if (model.fechaTermino == "") {
      this.mensajevalidacion = "No puedes dejar el campo de fecha Termino vacío"
      $('#validacion').modal('show');
    }*/
    else if (model.capacitacion == "") {
      this.mensajevalidacion = "No puedes dejar el campo de capacitaciòn vacío"
      $('#validacion').modal('show');
    }
    else if (model.horaEntrada == "") {
      this.mensajevalidacion = "No puedes dejar el campo de hora de entrada vacío"
      $('#validacion').modal('show');
    }
    else if (model.horaSalida == "") {
      this.mensajevalidacion = "No puedes dejar el campo de hora de salida vacío"
      $('#validacion').modal('show');
    }
    else if (model.rolPrestador == "") {
      this.mensajevalidacion = "No puedes dejar el campo de rol del prestador vacío"
      $('#validacion').modal('show');
    }
    else if (model.competenciasList.length == 0 && model.competenciasList.length < 6) {
      this.mensajevalidacion = "debe seleccionar de 1 a 5 competencias"
      $('#validacion').modal('show');
    }
    else if (model.carrerasList.length == 0 && model.carrerasList.length < 8) {
      this.mensajevalidacion = "debe seleccionar de 1 a  7 carreras"
      $('#validacion').modal('show');
    }
    else if (model.idObjetivoOnu == 0) {
      this.mensajevalidacion = "debe seleccionar el objetivos de la ONU"
      $('#validacion').modal('show');
    } 
    else if (model.idUniversidad == 0) {
      this.mensajevalidacion = "debe seleccionar un campus"
      $('#validacion').modal('show');
    } else {

      this.proyectoService.create(model).subscribe((res: any) => {
        $('#success-modal-preview').modal('show');
        this._location.back();
      }, error => {
        alert(error.error)
      })
    }

  }

  onChangeHoras() {
    //console.log(this.proyectoModel.fechaInicio);
    this.proyectoModel.fechaTermino = "";
    let dia: Date = new Date(this.proyectoModel.fechaInicio);
    
    if (this.proyectoModel.horas == 240) {
      this.fechaMinima = new Date(dia.getFullYear(), dia.getMonth(), dia.getDate() + 90);
    } else {
      this.fechaMinima = new Date(dia.getFullYear(), dia.getMonth(), dia.getDate() + 190);
    }
  }


  validarEmail(valor) {
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(valor) == false) {
      return false
    } else {
      return true;
    }
  }

}
