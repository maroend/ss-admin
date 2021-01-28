import { Component, OnInit,OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';
import { Alumno } from '../models/alumno';
import { AlumnoService } from '../services/alumno.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
declare var $: any;
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  alumnos: Alumno[];
  public validar = false;
  dtTrigger = new Subject<any>();
  public fileToUpload: File = null;
  public idDocumento: string = "";
  mensaje = "";


  constructor(private alumnosService: AlumnoService,private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
  
      language:{url:'//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'}
    };
   this.obtenerAlumnos();

  }

  obtenerAlumnos() {

    return this.alumnosService
    .getAlumnos()
    .subscribe((alumnos: Alumno[]) =>{ this.alumnos = alumnos;
      this.dtTrigger.next();

    });
  }

  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();

  }
  eliminar(id) {
    this.alumnosService.deleteAlumno(id).subscribe((res: any) => {

      if (res) {
        this.validar = true;
        location.reload();
      } else {
        alert("¡Algo salio mal!");
      }
    }, error => {
      alert(error.error)
    })
  }

  modaleliminar(id) {
    console.log("dfdsfdsfds" + id);
    $('#delete-modal-preview-' + id).modal('show');
  }

  // obtenerAlumnos() {

  //   this.dtOptions = {
  //     pagingType: 'full_numbers',
  //     pageLength: 10,
  //     serverSide: true,
  //     processing: true,
  //     ajax: (dataTablesParameters: any, callback) => {

  //       this.alumnosService
  //       .getAlumnos(dataTablesParameters)
  //       .subscribe((resp:any) => {
            
  //           this.alumnos = resp.data;

  //           callback({
  //             recordsTotal: resp.recordsTotal,
  //             recordsFiltered: resp.recordsFiltered,
  //             data: []
  //           });
  //         });
  //     },
  //     columns: [{ data: 'nombre' }, { data: 'matricula' }, { data: 'universidad' },{ data: 'facultad' }]
  //   };

  // }

  ngAfterViewInit() {
    Feather.replace();
  }


  abrirsubir() {
    //this.idDocumento = id;
    $('#abrirsubir').modal('show');
  }

  closeSubir() {
    this.fileToUpload = null;
    this.idDocumento = "0";
    $("#file").val("");
  }

  uploadFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  subeArchivo() {
    if (this.fileToUpload != null) {
      console.log(this.idDocumento);
      document.getElementById("carg").style.display = "block";

      this.alumnosService.postFileAlumnosExcel(this.fileToUpload, this.idDocumento).subscribe(data => {
        if (data == true) {
          $('#abrirsubir').modal('hide');
          $('#success-modal-preview-file').modal('show');
          console.log(data);
          document.getElementById("carg").style.display = "none";

          if (this.idDocumento == "1" || this.idDocumento == "2" ) {
            this.mensaje = "Se agregaron las matrículas";
          } else if (this.idDocumento == "3" || this.idDocumento == "4") {
            this.mensaje = "Se modificaron los eventos en las matrículas";
          }

          this.idDocumento = "0";
          this.fileToUpload = null;
          $("#file").val("");
          //location.reload();
          //this.obtenerdocumentosSubidosConRequeridos();
        }
      }, error => {
        console.log(error);
        alert(error.error);
        document.getElementById("carg").style.display = "none";

      });
    }
  }

}
