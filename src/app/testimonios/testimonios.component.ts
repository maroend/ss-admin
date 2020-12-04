import { Component, OnInit,ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { TestimoniosService } from '../services/testimonios.service';

import { Testimonios } from "../models/testimonios"

declare var $: any;
@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})
export class TestimoniosComponent implements OnInit {

  public testimonios: Testimonios[] = [  ];

  public fileToUpload: File = null;



  constructor(public testimoniosService: TestimoniosService) { 
  
  }


  ngOnInit(): void {

this.getTestimonios();


  }

  ngAfterViewInit() {
    Feather.replace();

  }

getTestimonios() {

  this.testimoniosService.gettestimonios().subscribe((res: any[])=>{
    this.testimonios=res;
   
    console.log(res);  
    })
}


modaleliminar(id) {
  $('#delete-'+id).modal('show');
console.log(id);
 }



 agregar() {
  $('#agregar').modal('show');

 }

 uploadFile(files: FileList) {
  this.fileToUpload = files.item(0);
}

subeArchivo() {
  
  var titulo=$('#titulo').val();
  var testimonio=$('#testimonio').val();

  this.testimoniosService.postFileImage(this.fileToUpload,titulo,testimonio).subscribe(data => {
    if (data.resultado == 1) {
      $('#agregar').modal('hide');

      location.reload();
    }
  }, error => {
    console.log(error);
  });
}
eliminar(id){
  this.testimoniosService.eliminar(id).subscribe(data => {
console.log(data);
      $('#delete-'+id).modal('hide');

      location.reload();
    
  }, error => {
    console.log(error);
  });
}
}
