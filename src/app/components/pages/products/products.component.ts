import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ProductsService} from "../../../services/products.service";
import {Router} from "@angular/router";
import {Subscription, tap} from "rxjs";
import {SearchProductsService} from "../../../services/search-products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: ProductType[] = [];
  showLoader: boolean = false;
  private subscription: Subscription | null = null;
  private subscriptionSearchSubject: Subscription | null = null;
  private searchText: string = '';
  private productsWithSearch: boolean = false;

  @ViewChild('title') title: ElementRef | null = null;

  constructor(private productsService: ProductsService,
              private router: Router,
              private rend: Renderer2,
              private searchSubject: SearchProductsService) {
  }

  ngOnInit(): void {
    this.getProducts();

    this.subscriptionSearchSubject = this.searchSubject.subject.subscribe(searchText => {
      this.searchText = searchText;
      this.productsWithSearch = true;
      this.getProducts();
    })
  }

  getProducts() {
    this.showLoader = true;

    this.subscription = this.productsService.getProducts()
      .pipe(
        tap(() => {
          this.showLoader = false;
        })
      )
      .subscribe({
        next: (result) => {
          if (result.length === 0) {
            this.rend.setProperty(this.title?.nativeElement, 'innerText', 'Ничего не найдено');
          } else {
            if (this.productsWithSearch) {
              this.rend.setProperty(this.title?.nativeElement, 'innerText', `Результаты поиска по запросу: ${this.searchText}`);
            } else {
              this.rend.setProperty(this.title?.nativeElement, 'innerText', 'Наши чайные коллекции');
            }
          }
          this.products = result;
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }
      })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionSearchSubject?.unsubscribe();
  }
}
