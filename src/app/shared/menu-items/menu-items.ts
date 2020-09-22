import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS : Menu[] = [
  {
    state: 'organizations',
    name: 'INSTITUCIONES',
    type: 'sub',
    icon: 'account_balance',
    children: [
      {state: 'home', name: 'INICIO'},
      {state: 'add', name: 'AGREGAR'},
      {state: 'documents', name: 'DOCUMENTOS'},
      {state: 'evaluation', name: 'EVALUACIONES'},
      {state: 'hours', name: 'HORAS'},
      {state: 'projects', name: 'PROYECTOS'}
    ]
  },
  {
    state: 'student',
    name: 'ALUMNOS',
    type: 'sub',
    icon: 'people',
    children: [
      {state: 'home', name: 'INICIO'},
      {state: 'projects', name: 'PROYECTOS'},
      {state: 'hours', name: 'HORAS'},
      {state: 'evaluation', name: 'EVALUACIONES'},
      {state: 'steps', name: 'PASOS'},
    ]
  },
  {
    state: 'admin',
    name: 'ADMINISTRACIÓN',
    type: 'sub',
    icon: 'miscellaneous_services',
    children: [
      {state: 'home', name: 'INICIO'},
      {state: 'projects', name: 'PROYECTOS'},
      {state: 'students', name: 'ALUMNOS'},
      {state: 'process', name: 'PROCESOS'},
      {state: 'users', name: 'USUARIOS'},
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
