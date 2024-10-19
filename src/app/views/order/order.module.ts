import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {OrderComponent} from "./order/order.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
