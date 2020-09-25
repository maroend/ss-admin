import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../../services/organization.service';
import { Areasaccion, Rubros,Universidades,Tipo,Giro,Clasificacion,Estado,AgregarOrganizacion,Contactoagregar,Responsablemodel,check,obtenerOrganizacion } from "../../models/empresa"
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-add',
  templateUrl: './empresas-edit.component.html',
  styleUrls: ['./empresas-edit.component.scss']
})
export class EmpresasEditComponent implements OnInit {
  public areas: Areasaccion[] = [];
  public obtenerorganizacion = new obtenerOrganizacion("","","","","","","","","","","","","","","","","",true,0,"",false,false,1,1,1,1,1,0,0,0,0,0,0,undefined,undefined,undefined,undefined)


  public rubros: Rubros[] = [];
  public universidades: Universidades[] = [];
  public tipo: Tipo[] = [];
  public idobtenido:string;
  public giro: Giro[] = [];
  public estado: Estado[] = [];

  public clasificacion: Clasificacion[] = [];
  agregarModel = new AgregarOrganizacion("","","","","","","","","","","","","","","","","",true,0,"",false,false,1,1,1,1,1,0,0,0,0,0,0,undefined,undefined,undefined,undefined)
  contactoModel = new Contactoagregar("","","","","","","",true)
  public listaAreasAccion = [];
  public listaRubros = [];
  public contactos = [];
  responsablemodel = new Responsablemodel("","","","","","","","","",true,true)
  checkmodel = new check("false","false")


  constructor(private organizacionService: OrganizationService,private router: Router,private activatedRoute: ActivatedRoute) {

    
  }

  ngOnInit(): void {
    this.idobtenido=this.activatedRoute.snapshot.paramMap.get("id");
    this.organizacionService.getOrganizacion(this.idobtenido).subscribe((obtenerorganizacion: obtenerOrganizacion) => this.obtenerorganizacion = obtenerorganizacion);
console.log(this.obtenerorganizacion);  
    this.obtenerAreas();
    this.obtenerRubros();
    this.obtenerUniversidades();
    this.obtenerTipo();
    this.obtenerGiro();
    this.obtenerClasificacion();
    this.obtenerEstado();

  }
  toggleArea(checked, id){
    console.log(checked);
var valor= { "idAreaAccion": id ,"activo": true};

    var area = this.areas.find(x=>x.id===id);
    if(checked) this.listaAreasAccion.push(valor);
    else this.listaAreasAccion = this.listaAreasAccion.filter(item => item.idAreaAccion !== id);   
    
    console.log(this.listaAreasAccion);
  }
  togleRubros(checked, id){
    console.log(checked);
var valor= { "idRubro": id ,"activo": true};

    var area = this.areas.find(x=>x.id===id);
    if(checked) this.listaRubros.push(valor);
    else this.listaRubros = this.listaRubros.filter(item => item.idRubro !== id);   
    
    console.log(this.listaRubros);

  }

  ngAfterViewInit() {
    Feather.replace();
  }

  obtenerAreas() {
    return this.organizacionService
      .getAreas()
      .subscribe((areas: Areasaccion[]) => this.areas = areas );
  }
  obtenerRubros() {
    return this.organizacionService
      .getRubros()
      .subscribe((rubros: Rubros[]) => this.rubros = rubros );
  }
  obtenerUniversidades() {
    return this.organizacionService
      .getUniversidades()
      .subscribe((universidades: Universidades[]) => this.universidades = universidades );
  }
  obtenerTipo() {
    return this.organizacionService
      .getTipo()
      .subscribe((tipo: Tipo[]) => this.tipo = tipo );
  }
 
  obtenerEstado() {
    return this.organizacionService
      .getEstado()
      .subscribe((estado: Estado[]) => this.estado = estado );
  }
  obtenerGiro() {
    return this.organizacionService
      .getGiro()
      .subscribe((giro: Giro[]) => this.giro = giro );
  }
  obtenerClasificacion() {
    return this.organizacionService
      .getClasificacion()
      .subscribe((clasificacion: Clasificacion[]) => this.clasificacion = clasificacion );
  }


  create(){
    let model = this.agregarModel;

    if(this.checkmodel.jerarquia == "1"){
      model.legionario=true;
    }
    else{
      model.legionario=false;

    }
    if(this.checkmodel.disponible == "1"){
      model.disponible=true;
    }
    else{
      model.disponible=false;

    }

    model.listaAreasAccion = this.listaAreasAccion;
    model.listaRubros = this.listaRubros ;
    var contacto= { "nombre": this.contactoModel.nombre ,"prefijo": this.contactoModel.prefijo,"puesto": this.contactoModel.puesto,
    "correo": this.contactoModel.correo,"telefono": this.contactoModel.telefono,  "ext": this.contactoModel.ext,"celular": this.contactoModel.celular,"activo": true };

  
    
    model.listaContactos = new Array()  ;
    model.responsable = this.responsablemodel;

    console.log(model)

    this.organizacionService.create(model).subscribe((res: any)=>{
      console.log(res.message)
      this.router.navigate(['/empresas']);

    }, error=>{
      alert(error.error)
    })
  }

}
