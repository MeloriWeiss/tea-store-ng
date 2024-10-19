import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./views/main/main/main.component";
import {ProductsComponent} from "./views/products/products/products.component";
import {ProductComponent} from "./views/products/product/product.component";
import {OrderComponent} from "./views/order/order/order.component";

const routes: Routes = [
  {path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)},
  {path: 'products', loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule)},
  {path: 'order', loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
