import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../../services/organization.service';
import { Empresa,Responsablemodel,check,escueladirecciones,cordinaciones,vicerrectorias  } from "../../models/empresa"
import { AreaAccion } from "../../models/areaaccion"

import { RubroEmpresa } from "../../models/rubrosempresa"
import { Universidad } from "../../models/universidad"
import { TipoEmpresa } from "../../models/tipoempresa"
import { GiroEmpresa } from "../../models/giroempresa"
import { ClasificacionEmpresa } from "../../models/clasificacionempresa"
import { EstadoEmpresa } from "../../models/estadoempresa"
import {Location} from '@angular/common';



import { Router,ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-organization-add',
  templateUrl: './empresas-edit.component.html',
  styleUrls: ['./empresas-edit.component.scss']
})
export class EmpresasEditComponent implements OnInit {
  public areas: AreaAccion[] = [];
  public responsable: Responsablemodel[] = [];
  public rubros: RubroEmpresa[] = [];
  public universidades: Universidad[] = [];
  public tipo: TipoEmpresa[] = [];
public idobtenido:string;
  public giro: GiroEmpresa[] = [];
  public estado: EstadoEmpresa[] = [];
  public listaAreasAccion = [];
  public listaRubros = [];
  public idRubro:any;
  public imagensubidaurl:string="";
  public  logo="https://img.icons8.com/ios/452/company.png";
  public idAreaAccion:any;
  public fileToUpload: File = null;
  public idDocumento: string = "";
  public cambio=false;
  public listacolonias = [];
  public listaestados = [];
  public listamunicipios = [];
  public listaciudad = [];
  public listapais = [];
public validar=false;
  public contactos = [];
  public clasificacion: ClasificacionEmpresa[] = [];
  horasAlumno = [];
  public mensajevalidacion="";
  public vicerectorias: vicerrectorias[] = [];
  public escueladirecciones: escueladirecciones[] = [];
  public cordinaciones: cordinaciones[] = [];

  public responsablemodel = new Responsablemodel("","","","","","","","",true,false)
  checkmodel = new check("false","false")
  public empresaModel = new Empresa("","","","",0,0,0,0,"","","","","","",0,"","","","","","","","","","","","","","","","","","","","",true,0,"",0,false,1,1,1,1,1,0,0,0,0,1,0,undefined,undefined,undefined)


  constructor(private organizacionService: OrganizationService,private router: Router,private activatedRoute: ActivatedRoute,private _location: Location) { 
  
  }
  
  //TODO SERGIO
  abrirsubir(){

    //console.log("dfdsfdsfds" + id);
    $('#abrirsubir').modal('show');

  }
  uploadFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  
    
  subeArchivo() {
  
    this.organizacionService.postFileImage(this.fileToUpload,"0").subscribe(data => {
      if (data.resultado == 1) {
       this.imagensubidaurl= data.datos;
       console.log(this.imagensubidaurl);

this.imagensubidaurl=this.imagensubidaurl;

console.log(this.imagensubidaurl);
this.getBase64(this.fileToUpload).then(
  data => 
  this.logo=data.toString()
);


$('#abrirsubir').modal('hide');
        $('#success-modal-preview-file').modal('show');
      }
    }, error => {
      console.log(error);
    });


  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  ngOnInit(): void {



    this.idobtenido=this.activatedRoute.snapshot.paramMap.get("id");
    this.getempresa(this.idobtenido);
    this.obtenerUniversidades();
    this.obtenerTipo();
    this.obtenerGiro();
    this.obtenerClasificacion();
    this.obtenerEstado();
    this.obtenervicerretoria();
    this.obtenerescueladireccion();
    this.obtenercordinaciones();  
    this.obtenerAreas();

    this.obtenerRubros();
  }
  obtenervicerretoria() {
    return this.organizacionService
      .getvice()
      .subscribe((vicerectorias: vicerrectorias[]) => this.vicerectorias = vicerectorias );
  }
  obtenerescueladireccion() {
    return this.organizacionService
      .getescueladireccion()
      .subscribe((escueladirecciones: escueladirecciones[]) => this.escueladirecciones = escueladirecciones );
  }
  obtenercordinaciones() {
    return this.organizacionService
      .getcordinaciones()
      .subscribe((cordinaciones: cordinaciones[]) => this.cordinaciones = cordinaciones );
  }




  toggleArea(checked, id){
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
  getempresa(id){
    this.organizacionService.getOrganizacion(id).subscribe((res: any[])=>{
      this.horasAlumno = res;
      this.empresaModel = <Empresa><any>res;

      this.responsablemodel=res['responsable'];
      console.log(this.responsablemodel);
      this.externa();
      this.listaAreasAccion=res['listaAreasAccion'];
      this.listaRubros=res['listaRubros'];

      this.idRubro =  this.listaRubros.map(({ idRubro }) => idRubro);
      this.idAreaAccion =  this.listaAreasAccion.map(({ idAreaAccion }) => idAreaAccion);

      this.logo ="data:image/jpeg;base64,"+ res['imagenArchivo'];
      this.imagensubidaurl=res['imagen'];
      this.cambio=res['externa'];
      var cp=res['cp'];
      this.obtenerdirecciones(cp);
      console.log(this.cambio);

      
    })
  }
  obtenerAreas() {
    return this.organizacionService
      .getAreas()
      .subscribe((areas: AreaAccion[]) => this.areas = areas );
  }
  obtenerRubros() {
    return this.organizacionService
      .getRubros()
      .subscribe((rubros: RubroEmpresa[]) => this.rubros = rubros );
  }
  obtenerUniversidades() {
    return this.organizacionService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades );
  }
  obtenerTipo() {
    return this.organizacionService
      .getTipo()
      .subscribe((tipo: TipoEmpresa[]) => this.tipo = tipo );
  }
 
  obtenerEstado() {
    return this.organizacionService
      .getEstado()
      .subscribe((estado: EstadoEmpresa[]) => this.estado = estado );
  }
  obtenerGiro() {
    return this.organizacionService
      .getGiro()
      .subscribe((giro: GiroEmpresa[]) => this.giro = giro );
  }
  obtenerClasificacion() {
    return this.organizacionService
      .getClasificacion()
      .subscribe((clasificacion: ClasificacionEmpresa[]) => this.clasificacion = clasificacion );
  }



  onSubmit() {
    this.responsablemodel.usuario=this.responsablemodel.correo;

    let model = this.empresaModel;

   
    model.Responsable = this.responsablemodel;
model.Imagen=this.imagensubidaurl;
model.listaAreasAccion = this.listaAreasAccion ;

    model.listaRubros = this.listaRubros ;


console.log(model);
if(this.responsablemodel.externa){
    if(model.organizacion==""){
      this.mensajevalidacion="No puedes dejar el campo de empresa vacío";
            $('#validacion').modal('show');
      
          }
          else if(model.nombreComun==""){
            this.mensajevalidacion="No puedes dejar el campo de Nombre Común de la Institución vacío"
            $('#validacion').modal('show');
          }
          else if(model.razon==""){
            this.mensajevalidacion="No puedes dejar el campo de razón de ser de la Institución vacío"
            $('#validacion').modal('show');
          }
          else if(model.logros==""){
            this.mensajevalidacion="No puedes dejar el campo de  los Principales Logros de la Institución vacío"
            $('#validacion').modal('show');
          }
          else if(model.reconocimiento==""){
            this.mensajevalidacion="No puedes dejar el campo de  Reconocimientos y Certificaciones vacío"
            $('#validacion').modal('show');
          }
      
          else if(model.facebook==""){
            this.mensajevalidacion="No puedes dejar el campo de  facebook vacío"
            $('#validacion').modal('show');
          }  

          
          else if(model.mision==""){
            this.mensajevalidacion="No puedes dejar el campo de mision vacío";
            $('#validacion').modal('show');
          }
          else  if(model.objetivo==""){
            this.mensajevalidacion="No puedes dejar el campo de objetivo vacío";
            $('#validacion').modal('show');
          }
          else if(model.logros==""){
            this.mensajevalidacion="No puedes dejar el campo de logros vacío";
            $('#validacion').modal('show');
          }
          else if(model.web==""){
            this.mensajevalidacion="No puedes dejar el campo de web vacío";
            $('#validacion').modal('show');
          }
          else if(model.cp==""){
            this.mensajevalidacion="No puedes dejar el campo de cp vacío";
            $('#validacion').modal('show');
          }
          else if(model.estado==""){
            this.mensajevalidacion="No puedes dejar el campo de estado vacío";
            $('#validacion').modal('show');
          }
          else if(model.ciudad==""){
            this.mensajevalidacion="No puedes dejar el campo de ciudad vacío";
            $('#validacion').modal('show');
          }
          else if(model.colonia==""){
            this.mensajevalidacion="No puedes dejar el campo de colonia vacío";
            $('#validacion').modal('show');
          }
          else if(model.calle==""){
            this.mensajevalidacion="No puedes dejar el campo de calle vacío";
            $('#validacion').modal('show');
          }
      
          else if(model.noExt==""){
            this.mensajevalidacion="No puedes dejar el campo de noExt vacío";
            $('#validacion').modal('show');
          }
      
          else if(model.Responsable['NombreCompletoDirector']==""){
            this.mensajevalidacion="No puedes dejar el campo de Nombre Completo del Director vacío"
            $('#validacion').modal('show');
      
          }
          else if(model.Responsable['NombreCompletoresponsable']==""){
            this.mensajevalidacion="No puedes dejar el campo de Nombre Completo del responsable vacío"
            $('#validacion').modal('show');
      
          }   else if(model.Responsable['correo']==""){
              this.mensajevalidacion="No puedes dejar el campo de correo vacío";
            $('#validacion').modal('show');
      
          }  
          else if(model.Responsable['telefono']==""){
            this.mensajevalidacion="No puedes dejar el campo de telefono vacío";
            $('#validacion').modal('show');
      
          }  
          else if(model.Responsable['departamento']==""){
            this.mensajevalidacion="No puedes dejar el campo de departamento vacío";
            $('#validacion').modal('show');
      
          }  
          else if(model.Responsable['puesto']==""){
            this.mensajevalidacion="No puedes dejar el campo de puesto vacío";
            $('#validacion').modal('show');
      
          }  
          // else if(model.Responsable['usuario']==""){
          //   this.mensajevalidacion="No puedes dejar el campo de usuario vacío";
          //   $('#validacion').modal('show');
      
          // } 
          else if(model.Responsable['contraseña']==""){
            this.mensajevalidacion="No puedes dejar el campo de contraseña vacío";
            $('#validacion').modal('show');
      
          } 
          else if(this.listaRubros.length==0){
            this.mensajevalidacion="Debes selecciónar al menos un rubro";
            $('#validacion').modal('show');
      
          } 
          
          else if(this.listaAreasAccion.length==0){
            this.mensajevalidacion="Debes selecciónar al menos una Area";
            $('#validacion').modal('show');
      
          } 
          else{
      
    
    this.organizacionService.updateempresa(this.idobtenido,model).subscribe(() => {
          $('#success-modal-preview').modal('show');

    this._location.back();

     
    })
  }
}
else{
  model.organizacion="Interna";
  model.nombreComun="Interna";

console.log(model);
         if(model.Responsable['NombreCompletoDirector']==""){
          this.mensajevalidacion="No puedes dejar el campo de Nombre Completo del Director vacío"
          $('#validacion').modal('show');
    
        }
        else if(model.Responsable['NombreCompletoresponsable']==""){
          this.mensajevalidacion="No puedes dejar el campo de Nombre Completo del responsable vacío"
          $('#validacion').modal('show');
    
        }  else if(model.Responsable['correo']==""){
            this.mensajevalidacion="No puedes dejar el campo de correo vacío"
          $('#validacion').modal('show');
    
        }  
        else if(model.Responsable['telefono']==""){
          this.mensajevalidacion="No puedes dejar el campo de telefono vacío"
          $('#validacion').modal('show');
    
        }  
        else if(model.Responsable['departamento']==""){
          this.mensajevalidacion="No puedes dejar el campo de departamento vacío"
          $('#validacion').modal('show');
    
        }  
        else if(model.Responsable['puesto']==""){
          this.mensajevalidacion="No puedes dejar el campo de puesto vacío"
          $('#validacion').modal('show');
    
        }  
        // else if(model.Responsable['usuario']==""){
        //   this.mensajevalidacion="No puedes dejar el campo de usuario vacío"
        //   $('#validacion').modal('show');
    
        // } 
        else if(model.Responsable['contraseña']==""){
          this.mensajevalidacion="No puedes dejar el campo de contraseña vacío"
          $('#validacion').modal('show');
    
        } 
        
       
        else if(model.descripcionArea==""){
          this.mensajevalidacion="No puedes dejar el campo de  los descripcion de la área  vacío"
          $('#validacion').modal('show');
        }
        else if(model.objetivo==""){
          this.mensajevalidacion="No puedes dejar el campo de  los objetivos n vacío"
          $('#validacion').modal('show');
        }
     
        else if(this.listaAreasAccion.length==0){
          this.mensajevalidacion="Debes selecciónar al menos una Area"
          $('#validacion').modal('show');
    
        }else{

          console.log(model);
      
          this.organizacionService.updateempresa(this.idobtenido,model).subscribe(() => {
            $('#success-modal-preview').modal('show');
  
      this._location.back();
      
      
          }, error=>{
            alert(error.error)
      
          }) 

        }
}


  }

  externa(){

    console.log(this.responsablemodel.externa);
     this.cambio=this.responsablemodel.externa;
 
  }

  obtenerdirecciones(cp) {
    this.organizacionService.obtenerdirecciones(cp).subscribe((re: any[])=>{
      console.log(re);
      if(re.length>0){
        this.listacolonias=[];

        this.listaestados=[];
        this.listaciudad=[];
        this.listapais=[];
        this.listamunicipios=[];

        var listacoloniast=[];
        var listamunicipiost=[];

        var listaestadost=[];
        var listaciudadt=[];
        var listapaist=[];

        for(var i=0;i<re.length;i++){
          
          
          listacoloniast.push(re[i]['colonia']);

            listamunicipiost.push(re[i]['municipio']);
  
            listaestadost.push(re[i]['estado']);
  
            listaciudadt.push(re[i]['ciudad']);
  
            listapaist.push(re[i]['pais']);
  

 


        }
        const myObj1 = {}
        const myObj2 = {}
        const myObj3 = {}
        const myObj4 = {}
        const myObj5 = {}

listapaist.forEach(el => {
          // comprobamos si el valor existe en el objeto
          if (!(el in myObj1)) {
            // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
            myObj1[el] = true
            this.listapais.push(el)
          }
        })
        listaestadost.forEach(el => {
          // comprobamos si el valor existe en el objeto
          if (!(el in myObj2)) {
            // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
            myObj2[el] = true
            this.listaestados.push(el)
          }
        })

        listamunicipiost.forEach(el => {
          // comprobamos si el valor existe en el objeto
          if (!(el in myObj3)) {
            // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
            myObj3[el] = true
            this.listamunicipios.push(el)
          }
        })

        listacoloniast.forEach(el => {
          // comprobamos si el valor existe en el objeto
          if (!(el in myObj4)) {
            // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
            myObj4[el] = true
            this.listacolonias.push(el)
          }
        })
        listaciudadt.forEach(el => {
          // comprobamos si el valor existe en el objeto
          if (!(el in myObj5)) {
            // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
            myObj5[el] = true
            this.listaciudad.push(el)
          }
        })


  console.log(this.listapais);
  console.log(this.listaciudad);
  console.log(this.listaestados);
  console.log(this.listacolonias);


      }else{
        this.listacolonias=[];

        this.listaestados=[];
        this.listaciudad=[];
        this.listapais=[];
      }

    })

  }
  obtenerdireccion(){
    var cp=this.empresaModel.cp;
    console.log(cp);
    if(cp.length==5){
    this.obtenerdirecciones(cp);
    }
  }
 
}
