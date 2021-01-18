import { Component, OnInit,OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Empresa,Vacantes } from "../models/empresa"
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria,Tipo } from "../models/convocatoria"
import { count } from 'rxjs-compat/operator/count';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ConstantPool } from '@angular/compiler';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from "../models/proyectos"
import { Subject } from 'rxjs';
import { ReportesService } from '../services/reportes.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit {
  public empresa: Empresa[] = [  ];
  public empresacantidad: number;
  public empresapermisos: Empresa[] = [  ];
  public vacantes: Vacantes[] = [  ];

  public empresaactiva: Empresa[] = [  ];
  public empresadesaciva: Empresa[] = [  ];
  public d: Date = new Date(); 
  public tipoModel = new Tipo(1);
  public convocatorias:Convocatoria [] = [ ];
  public convocatoriasalumnos:Convocatoria [] = [ ];
  public proyectos: Proyecto[] = [];
  public proyectosrechazados: Proyecto[] = [];
  public proyectosactivos: Proyecto[] = [];
  public proyectospendientes: Proyecto[] = [];

  public convocatoriasf:Convocatoria [] = [ ];
  public convocatoriasalumnosf:Convocatoria [] = [ ];
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger  = new Subject<any>();
  constructor( private organizacionService: OrganizationService, private reportesService:ReportesService, private convocatoriaService: ConvocatoriaServices,private proyectoService: ProyectoService) { 
  
  }

  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();

  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      paging:   false,

  
      language:{url:'//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'}
    };
    this.proyectos=[];
    this.proyectosactivos=[];
    this.proyectosrechazados=[];
    this.proyectospendientes=[];

     this.empresa=[];
     this.empresacantidad=0;
     this.empresaactiva = [  ];
     this.empresadesaciva = [  ];
  
     this.tipoModel = new Tipo(1);
     this.convocatorias = [ ];
     this.convocatoriasalumnos = [ ];
     this.convocatoriasf = [ ];
     this.convocatoriasalumnosf = [ ];
     this.vacantes = [ ];

     this.obtenervacantes();

this.obtenerpermisos();
    this.obtenerempresa();
    this.obtenerConvocatoria1();
    this.obtenerConvocatoria2();
this.obtenerProyectos();



  }

  ngAfterViewInit() {
    Feather.replace();

  }



  obtenerempresa() {
    let model = this.tipoModel;
    model.tipo=1;
    this.organizacionService.getAll().subscribe((res: any[])=>{     

this.empresacantidad= res.length;
this.empresa= res;


for(var i=0;i<this.empresacantidad;i++){

 if(this.empresa[i].idEstadoOrganizacion==3){
this.empresaactiva.push(this.empresa[i]);
 }
 if(this.empresa[i].idEstadoOrganizacion==1 || this.empresa[i].idEstadoOrganizacion==2 ){
   this.empresadesaciva.push(this.empresa[i]);


 }

}
console.log(this.empresa);

})

  }


  obtenerConvocatoria1() {
    let model = this.tipoModel;
    model.tipo=1;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[])=>{        
      var Fecha = new Date((this.d.toString()));
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      console.log(res);

this.convocatorias=res;
for(var i=0;i<this.convocatorias.length;i++){


  var Fecha1 = new Date((this.convocatorias[i].fechaTermino.toString()));
  var ini = new Date((this.convocatorias[i].fechaInicio.toString()));

if(Fecha1> Fecha ){
  this.convocatorias[i].Termino=Fecha1.toLocaleDateString("es-ES", options);
  this.convocatorias[i].Inicio=ini.toLocaleDateString("es-ES", options);
  console.log(Fecha1);
this.convocatoriasf.push(this.convocatorias[i]);


}
}


})
  }

  obtenerConvocatoria2() {
    let model = this.tipoModel;
    model.tipo=2;
    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    var Fecha = new Date((this.d.toString()));

    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[])=>{
this.convocatoriasalumnos=res;
for(var i=0;i<this.convocatoriasalumnos.length;i++){
  var Fecha1 = new Date((this.convocatoriasalumnos[i].fechaTermino.toString()));

  var ini = new Date((this.convocatoriasalumnos[i].fechaInicio.toString()));

  if(Fecha1> Fecha ){
    this.convocatoriasalumnos[i].Termino=Fecha1.toLocaleDateString("es-ES", options);
    this.convocatoriasalumnos[i].Inicio=ini.toLocaleDateString("es-ES", options);
    console.log(Fecha1);
    this.convocatoriasalumnosf.push(this.convocatoriasalumnos[i]);

}
}



})
  }

  obtenerProyectos() {

    this.proyectoService.getAll().subscribe((res: any[])=>{        
                   
      this.proyectos=res;



      for(var i=0;i<this.proyectos.length;i++){
      
      
      if(this.proyectos[i].idEstadoProyecto==3){
      this.proyectosactivos.push(this.proyectos[i]);
      
      }
      if(this.proyectos[i].idEstadoProyecto==4){
        this.proyectosrechazados.push(this.proyectos[i]);
        
        }
        if(this.proyectos[i].idEstadoProyecto<3 ){
          this.proyectospendientes.push(this.proyectos[i]);
          
          }
        


      }

     

  });
}

obtenerpermisos() {
  return this.organizacionService
    .getempresapermiso()
    .subscribe((empresapermisos: Empresa[]) => this.empresapermisos = empresapermisos );
}
  
obtener () {
  return this.organizacionService
    .getempresapermiso()
    .subscribe((empresapermisos: Empresa[]) =>{ this.empresapermisos = empresapermisos;
    
    
    } );
}


subeArchivo(id) {
    
  this.organizacionService.cambiarestado(id).subscribe(data => {
      $('#abrirsubir-' + id).modal('hide');
      $('#success-modal-preview-file').modal('show');
    console.log(data);
  }, error => {
    console.log(error);
  });
}
abrirsubir(id){

  //console.log("dfdsfdsfds" + id);
  $('#abrirsubir-'+id).modal('show');

}
obtenervacantes() {
  return this.organizacionService
    .getvacantes()
    .subscribe((vacantes: Vacantes[]) =>{ this.vacantes = vacantes;
      console.log(this.vacantes);
      this.dtTrigger.next();

  } );
}
  
reportealumnos () {
  return this.reportesService
    .getalumnosreport()
    .subscribe((res) =>{ 
    
    
    } );
}
reporteinstituciones() {
  return this.reportesService
    .getinstitucionesreport()
    .subscribe((res) =>{ 
    
    
    } );
}
}
