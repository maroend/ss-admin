
export class Proyecto {
  public proyecto: string;
  public descripcion: string;
  public objetivo: string;
  public idOrganizacion: number;
  public organizacion: string;
  public idArea: number;
  public area: string;
  public idRango: number;
  public rango: string;
  public idPoblacion: number;
  public poblacion: string;
  public beneficioInstitucional: string;
  public comentarios: string;
  public recursosEconomicos: boolean;
  public horasProyecto: number;
  public descripcionFormacion: string;
  public constanciaParticipacion: boolean;
  public descripcionBeneficiosAlumno: string;
  public descripcionImpactoSocial: string;
  public indicadoresImpactoSocial: string;
  public noVacantes: number;
  public fechaInicio: string;
  public fechaTermino: string;
  public idPeriodo: number;
  public periodo: string;
  public disponible: boolean;
  public idUniversidad: number;
  public universidad: string;
  public idEstadoProyecto: number;
  public estadoProyecto: string;
  public observaciones: string;
  public activo: boolean;
  public listaApoyos: Array<listaApoyosModel>;
  public listaLineasTrabajo: Array<listaLineasTrabajoModel>;
  public id: number
  constructor(
  ) { }

}

export class listaApoyosModel {
  constructor(
    public idApoyo: number,
    public activo: boolean,
    public Apoyo?: string,
  ) { }
}

export class listaLineasTrabajoModel {
  constructor(
    public idLineaTrabajo: number,
    public activo: boolean,
    public LineaTrabajo?: string,
  ) { }
}

export class ApoyosModel {
  constructor(
    public id: number,
    public apoyo: string,
    public activo: boolean,
  ) { }
}

export class LineasTrabajoModel {
  constructor(
    public id: number,
    public LineaTrabajo: string,
    public activo: boolean,
  ) { }
}

export class ProyectosAreasModel {
  constructor(
    public id: number,
    public Area: string,
    public FechaCracion: string,
    public activo: boolean,
  ) { }
}

export class ProyectosRangosModel {
  constructor(
    public id: number,
    public Rango: string,
    public FechaCracion: string,
    public activo: boolean,
  ) { }
}

export class ProyectosPoblacionesModel {
  constructor(
    public id: number,
    public Poblacion: string,
    public FechaCracion: string,
    public activo: boolean,
  ) { }
}
export class PeriodosModel {
  constructor(
    public id: number,
    public Periodo: string,
    public Descripcion: string,
    public FechaCracion: string,
    public activo: boolean,
  ) { }
}

export class EstadosProyectosModel {
  constructor(
    public id: number,
    public EstadoProyecto: string,
    public FechaCracion: string,
    public activo: boolean,
  ) { }
}
