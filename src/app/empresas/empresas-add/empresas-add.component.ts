import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../../services/organization.service';
import { Areasaccion, Rubros,Universidades,Tipo,Giro,Clasificacion,AgregarOrganizacion,Contactoagregar } from "../../models/empresa"

@Component({
  selector: 'app-organization-add',
  templateUrl: './empresas-add.component.html',
  styleUrls: ['./empresas-add.component.scss']
})
export class EmpresasAddComponent implements OnInit {
  public areas: Areasaccion[] = [];
  public rubros: Rubros[] = [];
  public universidades: Universidades[] = [];
  public tipo: Tipo[] = [];
  public giro: Giro[] = [];
  public clasificacion: Clasificacion[] = [];
  agregarModel = new AgregarOrganizacion("","","","","","","","","","","","","","","","","",true,0,"",false,false,1,1,1,1,1,0,0,0,0,0,0,undefined,undefined,undefined,undefined)
  contactoModel = new Contactoagregar("","","","","","","",true)
  public listaAreasAccion = [];
  public listaRubros = [];

  constructor(private organizacionService: OrganizationService) { }

  ngOnInit(): void {
    this.obtenerAreas();
    this.obtenerRubros();
    this.obtenerUniversidades();
    this.obtenerTipo();
    this.obtenerGiro();
    this.obtenerClasificacion();

  }
  toggleArea(checked, id){
    var area = this.areas.find(x=>x.id===id);
    if(checked) this.areas.push(area);
    else this.listaAreasAccion = this.listaAreasAccion.filter(item => item.id !== id);    
  }
  togleRubros(checked, id){
    var rubro = this.rubros.find(x=>x.id===id);
    if(checked) this.rubros.push(rubro);
    else this.listaRubros = this.listaRubros.filter(item => item.id !== id);    
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
    
    model.listaAreasAccion = this.listaAreasAccion;
    model.listaRubros = this.listaRubros ;
    model.listaContactos = this.contactoModel;

    console.log(model)

    this.organizacionService.create(model).subscribe((res: any)=>{
      console.log(res.message)
    }, error=>{
      alert(error.error)
    })
  }

}
