/*

    Programado por Luis Cabrera Benito 
  ____          _____               _ _           _       
 |  _ \        |  __ \             (_) |         | |      
 | |_) |_   _  | |__) |_ _ _ __ _____| |__  _   _| |_ ___ 
 |  _ <| | | | |  ___/ _` | '__|_  / | '_ \| | | | __/ _ \
 | |_) | |_| | | |  | (_| | |   / /| | |_) | |_| | ||  __/
 |____/ \__, | |_|   \__,_|_|  /___|_|_.__/ \__, |\__\___|
         __/ |                               __/ |        
        |___/                               |___/         
    
    
    Blog:       https://parzibyte.me/blog
    Ayuda:      https://parzibyte.me/blog/contrataciones-ayuda/
    Contacto:   https://parzibyte.me/blog/contacto/
*/
export class Empresa {
    constructor(
        public organizacion: string,
        public estadoOrganizacion: string,
        public universidad: string,
        public id?: number




        
    ) { }

}
export class Areasaccion {
    constructor(
        public areaAccion: string,
        public fechaCreacion: string,
        public activo: boolean,
        public id?: number




        
    ) { }
}
export class Rubros {
    constructor(
        public rubro: string,
        public fechaCreacion: string,
        public activo: boolean,
        public id?: number




        
    ) { }

}
export class Universidades {
    constructor(
        public universidad: string,
        public fechaCreacion: string,
        public activo: boolean,
        public id?: number




        
    ) { }

}
export class Tipo {
    constructor(
        public tipo: string,
        public fechaCreacion: string,
        public activo: boolean,
        public id?: number




        
    ) { }

}
export class Giro {
    constructor(
        public giro: string,
        public fechaCreacion: string,
        public activo: boolean,
        public id?: number




        
    ) { }

}
export class Clasificacion {
    constructor(
        public clasificacion: string,
        public fechaCreacion: string,
        public activo: boolean,
        public id?: number




        
    ) { }    

}
export class Contactoagregar {
    constructor(
        public nombre: string,
        public prefijo: string,
        public puesto: string,
        public correo: string,
        public telefono: string,
        public ext: string,
        public celular: string,
        public activo: boolean,




        
    ) { }    

}
export class AgregarOrganizacion {
    constructor(
        public imagen: string,
        public organizacion: string,
        public mision: string,
        public objetivo: string,
        public logros: string,
        public descripcion: string,
        public reconocimiento: string,
        public web: string,
        public cp: string,
        public pais: string,
        public estado: string,
        public municipio:string,
        public ciudad:string,
        public colonia: string,
        public calle: string,
        public noExt: string,
        public noInt: string,
        public activo: string,
        public configuracion: string,
        public idUniversidad: string,
        public idEstadoOrganizacion: string,
        public observaciones: string,

        public legionario: boolean,
        public disponible:  boolean,

        public idTipoOrganizacion: number,
        public idGiroOrganizacion: number,
        public idClasificacionOrganizacion: number,
        public indigenas: number,
        public jovenes: number,
        public mujeres: number,
        public ninos: number,
        public ancianos: number,
        public discapacitados: number,
  public listaAreasAccion: any,
  public listaContactos: any,
  public listaRubros: any,
  public responsable: any



  
    ) { }


    

}