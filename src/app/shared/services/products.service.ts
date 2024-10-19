import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {ProductType} from "../../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  subjectSearch: Subject<string>;
  searchValue: string | null = null;
  constructor(private http: HttpClient) {

    this.subjectSearch = new Subject<string>();
  }

  getProducts(): Observable<ProductType[]> {
    if (this.searchValue) {
      return this.http.get<ProductType[]>(`https://testologia.ru/tea?search=${this.searchValue}`);
    }
    return this.http.get<ProductType[]>('https://testologia.ru/tea');
  }

  changeSearch(search: string): void {
    this.searchValue = search;
    this.subjectSearch.next(search);
  }
}
