import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderType} from "../../../types/order.type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  order(data: OrderType): Observable<{ success: number }> {
    return this.http.post<{ success: number }>('https://testologia.ru/order-tea', data);
  }
}
