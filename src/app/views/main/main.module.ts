import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./main/main.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule
  ]
})
export class MainModule { }
