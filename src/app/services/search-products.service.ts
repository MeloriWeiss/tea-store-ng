import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {

  subject: Subject<string>
  constructor() {
    this.subject = new Subject<string>();
  }
}
