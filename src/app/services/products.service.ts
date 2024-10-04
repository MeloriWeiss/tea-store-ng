import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../types/product.type";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  searchParam: string | null = null;
  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchParam = params['search'];
      } else {
        this.searchParam = null;
      }
    });
  }

  getProducts(): Observable<ProductType[]> {
    if (this.searchParam) {
      return this.http.get<ProductType[]>(`https://testologia.ru/tea?search=${this.searchParam}`);
    }
    return this.http.get<ProductType[]>('https://testologia.ru/tea');
  }
}
