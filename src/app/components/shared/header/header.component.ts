import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchValue = new FormControl('');
  constructor(private router: Router,
              private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  search() {
    this.router.navigate(['/products']).then();
    if (this.searchValue && this.searchValue.value) {
      console.log(this.searchValue.value);
      this.productsService.changeSearch(<string>this.searchValue.value);
    } else {
      this.productsService.changeSearch('');
    }
  }
}
