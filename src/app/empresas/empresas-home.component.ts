import { Component, OnInit,ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Empresa } from "../models/empresa"
import { OrganizationService } from '../services/organization.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({ 
  selector: 'app-empresas-projects',
  templateUrl: './empresas-home.component.html',
  styleUrls: ['./empresas-home.component.scss']
})
export class EmpresashomeComponent implements OnInit {
  public empresa: Empresa[] = [  ];

  public empresa1: Empresa[] = [  ];

  public empresa2: Empresa[] = [  ];

  @ViewChild('dataTable', {static: true}) table;
  public  logo="https://img.icons8.com/ios/452/company.png";

  dataTable:any;
  public validar=true;

  constructor(private organizacionService: OrganizationService,private router: Router) { 
  
  }
  ngOnInit(): void {
    this.obtenerorganizaciones();
    document.getElementById("empresa").style.backgroundColor ="blue";

    document.getElementById("alumnos").style.backgroundColor ="gray";

    this.dataTable.DataTable();

  }

  
  obtenerorganizaciones() {
     this.organizacionService
      .getAll()
      .subscribe((res: any[])=>{
console.log(this.empresa);

for(var i=0;i<res.length;i++){

  if(res[i]['responsable']['externa']){
this.empresa1.push(res[i]);

  }
  else{
    this.empresa2.push(res[i]);


  }
  this.empresa = res;

}

      });
  }
  eliminar(id) {
       this.organizacionService.eliminar(id).subscribe((res: any)=>{
        this.validar=true;
        location.reload();
  
      }, error=>{
        alert(error.error)
      })

   

    
    }

    modaleliminar(id) {
      console.log("dfdsfdsfds"+ id);
      $('#delete-modal-preview-'+id).modal('show');

     }



    
     ngAfterViewInit() {
      Feather.replace();
    }
  recargar()
  {


    this.empresa=[];
    var red = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    document.getElementById("empresa").style.backgroundColor ="blue";

    document.getElementById("alumnos").style.backgroundColor ="gray";

this.empresa=this.empresa1;
    this.ngAfterViewInit();


  }

  recargar2()
  {

    document.getElementById("empresa").style.backgroundColor ="gray";

    document.getElementById("alumnos").style.backgroundColor ="blue";
    this.empresa=[];
    $('#empresa').backgroundColor="green";

    this.empresa=this.empresa2;
    this.ngAfterViewInit();


  }
}
