import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductType;

  constructor(private activatedRoute: ActivatedRoute,
              private productsService: ProductsService,
              private router: Router,
              private cartService: CartService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.productsService.getProducts()
          .subscribe({
            next: (result) => {
              const product = result.find(product => product.id === +params['id']);
              if (product) {
                this.product = product;
              }
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(['/']).then();
            }
          });
      }
    });
  }

  addToCart() {
    this.cartService.productTitle = this.product.title;
  }
}
