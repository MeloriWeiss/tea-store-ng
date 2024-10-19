import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable, Subscription, tap} from "rxjs";
import {CartService} from "../../../shared/services/cart.service";
import {OrderService} from "../../../shared/services/order.service";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  orderComplete: boolean = false;
  hasError: boolean = false;
  fieldsFilled: boolean = true;
  processingForm: boolean = false;
  private subscription: Subscription | null = null;
  private subscriptionShowError: Subscription | null = null;

  formValues = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^\\s*[А-Я][а-я]+\\s*$')]],
    lastName: ['', [Validators.required, Validators.pattern('^\\s*[А-Я][а-я]+\\s*$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    country: ['', Validators.required],
    zip: ['', Validators.required],
    address: ['', [Validators.required, Validators.pattern('^[А-Яа-я0-9/ -]+$')]],
    comment: [''],
    product: ['', Validators.required]
  })
  constructor(private cartService: CartService,
              private fb: FormBuilder,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.formValues.patchValue({
      product: this.cartService.productTitle
    })
  }

  order() {
    if (this.formValues.valid) {
      this.processingForm = true;
      this.fieldsFilled = true;
      this.subscription = this.orderService.order({
        name: <string>this.formValues.get('name')?.value,
        last_name: <string>this.formValues.get('lastName')?.value,
        phone: <string>this.formValues.get('phone')?.value,
        country: <string>this.formValues.get('country')?.value,
        zip: <string>this.formValues.get('zip')?.value,
        product: <string>this.formValues.get('product')?.value,
        address: <string>this.formValues.get('address')?.value,
        comment: <string>this.formValues.get('comment')?.value,
      })
        .pipe(
          tap(() => {
            this.processingForm = false;
          })
        )
        .subscribe({
          next: (result) => {
            if (result.success === 1) {
              this.orderComplete = true;
              this.hasError = false;
              this.formValues.reset();
            } else {
              this.orderComplete = false;
              this.hasError = true;
              const showError: Observable<boolean> = new Observable(observer => {
                const timeout = setTimeout(() => {
                  observer.next(false);
                }, 3000);

                return {
                  unsubscribe() {
                    clearTimeout(timeout);
                  }
                }
              });

              this.subscriptionShowError = showError.subscribe({
                next: (result) => {
                  this.hasError = result;
                }
              })
            }
          },
          error: (error) => {
            console.log(error);
            this.orderComplete = false;
            this.hasError = true;
          }
        })
    } else {
      this.fieldsFilled = false;
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionShowError?.unsubscribe();
  }
}
