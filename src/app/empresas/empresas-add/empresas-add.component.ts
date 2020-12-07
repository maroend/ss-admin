import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../../services/organization.service';
import { Empresa,Responsablemodel,check,direcciones,escueladirecciones,cordinaciones,vicerrectorias } from "../../models/empresa"
import { AreaAccion } from "../../models/areaaccion"

import { RubroEmpresa } from "../../models/rubrosempresa"
import { Universidad } from "../../models/universidad"
import { TipoEmpresa } from "../../models/tipoempresa"
import { GiroEmpresa } from "../../models/giroempresa"
import { ClasificacionEmpresa } from "../../models/clasificacionempresa"
import { EstadoEmpresa } from "../../models/estadoempresa"
import { Router } from '@angular/router';
declare var $: any;
import {Location} from '@angular/common';

@Component({
  selector: 'app-organization-add',
  templateUrl: './empresas-add.component.html',
  styleUrls: ['./empresas-add.component.scss']
})
export class EmpresasAddComponent implements OnInit {
  public areas: AreaAccion[] = [];
  public rubros: RubroEmpresa[] = [];
  public universidades: Universidad[] = [];
  public tipo: TipoEmpresa[] = [];

  public vicerectorias: vicerrectorias[] = [];
  public escueladirecciones: escueladirecciones[] = [];
  public cordinaciones: cordinaciones[] = [];

  public responsablemodel = new Responsablemodel("","","","","","","","",true,false)
  public direcciones = new direcciones()

public validar=false;
  public giro: GiroEmpresa[] = [];
  public estado: EstadoEmpresa[] = [];
  public listaAreasAccion = [];
  public listaRubros = [];
  public clasificacion: ClasificacionEmpresa[] = [];
  public empresaModel = new Empresa(0,"","","","","","","",1,1,1,0,"","","","","","",0,"","","","","","","","","","","","","","","","","","","","",true,0,"",0,false,1,1,1,1,1,0,0,0,0,0,0,undefined,undefined,undefined)
public mensajevalidacion="";
  public contactos = [];
  checkmodel = new check("false","false")
  public imagensubidaurl:string="";
public  logo="https://img.icons8.com/ios/452/company.png";
public cambio=false;

public listacolonias = [];
public listaestados = [];
public listamunicipios = [];
public listaciudad = [];
public listapais = [];


public fileToUpload: File = null;

  constructor(private organizacionService: OrganizationService,private router: Router,private _location: Location) { 
  
  }
  ngOnInit(): void {
    this.obtenerAreas();
    this.obtenerRubros();
    this.obtenerUniversidades();
    this.obtenerTipo();
    this.obtenerGiro();
    this.obtenerClasificacion();
    this.obtenerEstado();
    this.obtenercordinaciones();
    this.obtenerescueladireccion();
    this.obtenervicerretoria();
this.externa();

  }

  toggleArea(checked, id){
 
    console.log(checked);
var valor= { "idAreaAccion": id ,"activo": true};

    if(checked) 
    {
      if(id==13){

        $("#areatext").prop("disabled", false);
      }
      if (this.listaAreasAccion.length < 3) {

    this.listaAreasAccion.push(valor);
      }
      else {
        $("#area-" + id).prop("checked", false);
        this.mensajevalidacion = "solo permite seleccionar como máximo 3 áreas de accion "
        $('#validacion').modal('show');
      }
    }
    else 
    {
      if(id==13){

        $("#areatext").prop("disabled", true);
        $("#areatext").val("");

      }

      this.listaAreasAccion = this.listaAreasAccion.filter(item => item.idAreaAccion !== id);   
    }
    console.log(this.listaAreasAccion);
    
  }


  togleRubros(checked, id){
    console.log(checked);
var valor= { "idRubro": id ,"activo": true};


if(checked) this.listaRubros.push(valor);
    else this.listaRubros = this.listaRubros.filter(item => item.idRubro !== id);   
    
    console.log(this.listaRubros);

  }

  ngAfterViewInit() {
    Feather.replace();
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
        this.empresaModel.colonia= listacoloniast[0];
        this.empresaModel.municipio= listamunicipiost[0];
        this.empresaModel.estado= listaestadost[0];
        this.empresaModel.ciudad= listaciudadt[0];
        this.empresaModel.pais= listapaist[0];

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
        this.mensajevalidacion="Ingresa un CP valido";
        $('#validacion').modal('show');
      }

    })

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


  validarEmail(valor) {
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(valor) == false){
     return false
    } else {
     return true;
    }
  }
  mostrarpass(){
    console.log("cambioar");
    if ($('#mostrar_contrasena').is(':checked')) {
      $('#password').attr('type', 'text');
    } else {
      $('#password').attr('type', 'password');
    }
  
  }

  create(){
    this.responsablemodel.usuario=this.responsablemodel.correo;

    let model = this.empresaModel;
    model.Imagen="";
model.Responsable = this.responsablemodel;
model.listaAreasAccion = this.listaAreasAccion;
model.listaRubros = this.listaRubros ;

model.Imagen=this.imagensubidaurl;

console.log(this.responsablemodel.externa);

if(model.Responsable.externa){
     if(model.organizacion==""){
this.mensajevalidacion="No puedes dejar el campo de Nombre Oficial de la Institución vacío"
      $('#validacion').modal('show');

    }

//responsable
else if(this.responsablemodel.telefono.length<10){
  this.mensajevalidacion="Ingrese un telefono valido"
  $('#validacion').modal('show');
} 
else if(!this.validarEmail(this.responsablemodel.correo)){
  this.mensajevalidacion="Ingrese un correo valido"
  $('#validacion').modal('show');
} 


//maximo
    else if(model.descripcion.length>500){
      this.mensajevalidacion="El campo de descripcion debe tener menos de 500 caracteres"
      $('#validacion').modal('show');
    } 
    else if(model.razon.length>500){
      this.mensajevalidacion="El campo de Razón de ser debe tener menos de 500 caracteres"
      $('#validacion').modal('show');
    } 
    else if(model.mision.length>500){
      this.mensajevalidacion="El campo de misión debe tener menos de 500 caracteres"
      $('#validacion').modal('show');
    } 
    else if(model.vision.length>500){
      this.mensajevalidacion="El campo de Visión debe tener menos de 500 caracteres"
      $('#validacion').modal('show');
    } 
    else if(model.mision.length>500){
      this.mensajevalidacion="El campo de misión debe tener menos de 500 caracteres"
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
      this.mensajevalidacion="No puedes dejar el campo de mision vacío"
      $('#validacion').modal('show');
    }
    else  if(model.objetivo==""){
      this.mensajevalidacion="No puedes dejar el campo de objetivo vacío"
      $('#validacion').modal('show');
    }
    else if(model.logros==""){
      this.mensajevalidacion="No puedes dejar el campo de logros vacío"
      $('#validacion').modal('show');
    }
    else if(model.web==""){
      this.mensajevalidacion="No puedes dejar el campo de web vacío"
      $('#validacion').modal('show');
    }
    else if(model.cp==""){
      this.mensajevalidacion="No puedes dejar el campo de cp vacío"
      $('#validacion').modal('show');
    }
    else if(model.estado==""){
      this.mensajevalidacion="No puedes dejar el campo de estado vacío"
      $('#validacion').modal('show');
    }
    else if(model.ciudad==""){
      this.mensajevalidacion="No puedes dejar el campo de ciudad vacío"
      $('#validacion').modal('show');
    }
    else if(model.colonia==""){
      this.mensajevalidacion="No puedes dejar el campo de colonia vacío"
      $('#validacion').modal('show');
    }
    else if(model.calle==""){
      this.mensajevalidacion="No puedes dejar el campo de calle vacío"
      $('#validacion').modal('show');
    }

    else if(model.noExt==""){
      this.mensajevalidacion="No puedes dejar el campo de noExt vacío"
      $('#validacion').modal('show');
    }

    else if(model.Responsable['NombreCompletoDirector']==""){
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
   
    
    else if(this.listaAreasAccion.length==0 && this.listaAreasAccion.length < 4){
      this.mensajevalidacion="Debes selecciónar al menos una Area y maximo 3"
      $('#validacion').modal('show');

    } 
    
    else{


console.log(this.responsablemodel);
    console.log(model)

     this.organizacionService.create(model).subscribe((res: any)=>{
       console.log(res);
      this.validar=true;

               $('#success-modal-preview').modal('show');

    this._location.back();


    }, error=>{
      alert(error.error)

    }) 
  
 
  
  }

}else{
  model.organizacion = model.vicerrectoria+"/"+ model.cordinacion;
  model.nombreComun="Interna";

console.log(model);
         if(model.Responsable['NombreCompletoDirector']==""){
          this.mensajevalidacion="No puedes dejar el campo de Nombre Completo del Director vacío"
          $('#validacion').modal('show');
    
        }


//responsable
else if(this.responsablemodel.telefono.length<10){
  this.mensajevalidacion="Ingrese un telefono valido"
  $('#validacion').modal('show');
} 
else if(!this.validarEmail(this.responsablemodel.correo)){
  this.mensajevalidacion="Ingrese un correo valido"
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
         else if (model.vision== "") {
          this.mensajevalidacion="No puedes dejar el campo visión vacío"
          $('#validacion').modal('show');
        }
     
        else if(this.listaAreasAccion.length==0 && this.listaAreasAccion.length < 4){
          this.mensajevalidacion="Debes selecciónar al menos una Area y maximo 3"
          $('#validacion').modal('show');
    
        }else{

          console.log(model);
      
           this.organizacionService.create(model).subscribe((res: any)=>{
             console.log(res);
            this.validar=true;
      
                     $('#success-modal-preview').modal('show');
      
          this._location.back();
      
      
          }, error=>{
            alert(error.error)
      
          }) 

        }
}
  }
  uploadFile(files: FileList) {
    this.fileToUpload = files.item(0);

    
   }
  

      //TODO SERGIO
  abrirsubir(){

    //console.log("dfdsfdsfds" + id);
    $('#abrirsubir').modal('show');

  }
  subeArchivo() {


    this.organizacionService.postFileImage(this.fileToUpload,"0").subscribe(data => {
      if (data.resultado == 1) {
       this.imagensubidaurl= data.datos;
       console.log(this.imagensubidaurl);
       $('#abrirsubir').modal('hide');

this.getBase64(this.fileToUpload).then(
  data => 
  this.logo=data.toString()
);




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
  
  externa(){

    console.log(this.responsablemodel.externa);
     this.cambio=this.responsablemodel.externa;
 
  }
  obtenerdireccion(){
    var cp=this.empresaModel.cp;
    console.log(cp);
    this.obtenerdirecciones(cp);
    
  }
  recargar(){
    console.log("recargar");
    location.reload();
  }
 
}
