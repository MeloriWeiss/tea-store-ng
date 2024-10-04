import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {SearchProductsService} from "../../../services/search-products.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() searchValue: string = '';
  constructor(private router: Router,
              private searchSubject: SearchProductsService) { }

  ngOnInit(): void {
  }

  search() {
    this.searchSubject.subject.next(this.searchValue);
    this.router.navigate(['products'], {queryParams: {search: this.searchValue}});
  }
}
