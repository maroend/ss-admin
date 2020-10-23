import { Binary } from '@angular/compiler';

export class Documentos {
    constructor(
        public documento: string,
        public configuracion:  number,
        public id: number,
        
  


  
    ) { }  

}

export class DocumentosSubidos {
    constructor(
        public idEstado:  number,
        public idOrganizacion: number,
        public idDocumento:  number,
        public ruta: string,
        public Estado:  string,
      public file: any
    ) { }
}

export class DocumentosSubidosRequeridos {
    constructor(
        public idEstado:  number,
        public idOrganizacion: number,
        public idDocumento:  number,
        public ruta: string,
      public Estado: string,
      public idDocumentoRequerido :number,
      public documento :string,
      public configuracion :number,

      public file: any
    ) { }
}

export class DocumentosCadena {
    constructor(
        public idEstado:  number,
        public idOrganizacion: number,
        public iddocumento:  number,
        public ruta: string,
        public Estado:  string,
      public file: any
    ) { }
}

export class Documentosfile {
  public file: File;
  constructor(
    ) { }
}
