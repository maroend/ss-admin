import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItems } from './menu-items/menu-items';
import { HorizontalMenuItems } from './menu-items/horizontal-menu-items';
import { AccordionDirective } from './accordion/accordion.directive';
import { AccordionAnchorDirective } from './accordion/accordionanchor.directive';
import { AccordionLinkDirective } from './accordion/accordionlink.directive';
import { HttpClientModule } from '@angular/common/http';
import { Utils } from './functions/utils';



@NgModule({
  declarations: [
    AuthLayoutComponent, 
    AdminLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective],
  imports: [
    CommonModule,
  
    FormsModule,
    RouterModule
  ],
  exports: [
   
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    HttpClientModule
  ],
  providers: [ MenuItems, HorizontalMenuItems, Utils ]
})
export class SharedModule { }
