import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProductCardComponent} from "./components/product-card/product-card.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ProductCardComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductCardComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
