export class Usuario {
    constructor(
        public nombre: string,
        public apellidos: string,
        public email: string,
        public password: string,
        public universidad: string,

        public idUniversidad: number,
        public id: number,
        public disponible: boolean,

        public activo: boolean,

        
    ) { }

} 
