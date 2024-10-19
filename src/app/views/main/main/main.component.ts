import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";


declare var $: any;
@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private subscription: Subscription | null = null;
  private observable: Observable<boolean>;
  openPopup: boolean = false;
  constructor() {
    this.observable = new Observable<boolean>(observer => {
      const timeout = setTimeout(() => {
        observer.next(true);
      }, 10000);

      return {
        unsubscribe() {
          clearTimeout(timeout);
        }
      }
    });
      // .pipe(
      //   tap(() => {
      //     this.openPopup = true;
      //   })
      // );
  }

  ngOnInit(): void {
    $( "#accordion" ).accordion({
      heightStyle: "content"
    });

    this.subscription = this.observable.subscribe({
      next: (result) => {
        if (result) {
          this.openPopup = result;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  closePopup() {
    this.openPopup = false;
  }
  stopClosing(event: Event) {
    event.stopPropagation();
  }
}
