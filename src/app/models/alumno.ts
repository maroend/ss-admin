export class Alumno {
    constructor(
        public matricula: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public edad: number,
        public id?: number,
    ) { }

}