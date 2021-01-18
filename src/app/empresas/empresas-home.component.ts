import { Component, OnInit,OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';
import { Empresa } from "../models/empresa"
import { OrganizationService } from '../services/organization.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({ 
  selector: 'app-empresas-projects',
  templateUrl: './empresas-home.component.html',
  styleUrls: ['./empresas-home.component.scss']
})
export class EmpresashomeComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger  = new Subject<any>();
  dtTrigger2  = new Subject<any>();

data: any;
  public empresa: Empresa[] = [  ];

  public empresa1: Empresa[] = [  ];

  public empresa2: Empresa[] = [  ];

  public  logo="https://img.icons8.com/ios/452/company.png";

  public validar=true;

  constructor(private organizacionService: OrganizationService,private router: Router,private httpClient: HttpClient) { 
  
  }
  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();

  }
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
  
      language:{url:'//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'}
    };

  
    Feather.replace();

   

    this.obtenerorganizaciones();
    document.getElementById("empresa").style.backgroundColor ="#FF8300";

    document.getElementById("alumnos").style.backgroundColor ="gray";


  }

  
  obtenerorganizaciones() {
     this.organizacionService
      .getAll()
      .subscribe((res: any[])=>{
console.log(res);
for(var i=0;i<res.length;i++){ 
  var t=res[i]['responsable'];

  if(t!=null){

  if(t['externa']){
this.empresa1.push(res[i]);

  }
  else{
    this.empresa2.push(res[i]);


  }
  
}
  // Calling the DT trigger to manually render the table
  this.empresa = this.empresa1;
  this.empresa2 = this.empresa2;

}

this.dtTrigger.next();
this.dtTrigger2.next();


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


    document.getElementById("empresa").style.backgroundColor ="#FF8300";

    document.getElementById("alumnos").style.backgroundColor ="gray";

    var tabla1 = document.getElementById("tabla1");
    var tabla2 = document.getElementById("tabla2");
    tabla1.style.display = "block";
    tabla2.style.display = "none";





  }

  recargar2()
  {


    document.getElementById("empresa").style.backgroundColor ="gray";

    document.getElementById("alumnos").style.backgroundColor ="#FF8300";

    var tabla1 = document.getElementById("tabla1");
    var tabla2 = document.getElementById("tabla2");
    tabla1.style.display = "none";
    tabla2.style.display = "block";

  }
}
