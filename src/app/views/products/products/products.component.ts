import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription, tap} from "rxjs";
import {ProductsService} from "../../../shared/services/products.service";
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: ProductType[] = [];
  showLoader: boolean = false;
  private subscription: Subscription | null = null;
  private subscriptionSubjectSearch: Subscription | null = null;
  private searchText: string = '';
  private productsWithSearch: boolean = false;

  @ViewChild('title') title: ElementRef | null = null;

  constructor(private productsService: ProductsService,
              private router: Router,
              private rend: Renderer2,) {
  }

  ngOnInit(): void {
    this.getProducts();

    this.subscriptionSubjectSearch = this.productsService.subjectSearch.subscribe(searchText => {
      this.searchText = searchText;
      this.productsWithSearch = !!searchText;
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
            this.changeTitle('Ничего не найдено');
          } else {
            if (this.productsWithSearch) {
              this.changeTitle(`Результаты поиска по запросу: ${this.searchText}`);
            } else {
              this.changeTitle('Наши чайные коллекции');
            }
          }
          this.products = result;
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']).then();
        }
      })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionSubjectSearch?.unsubscribe();
  }

  changeTitle(title: string): void {
    this.rend.setProperty(this.title?.nativeElement, 'innerText', title);
  }
}
