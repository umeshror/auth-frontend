import {Component, OnInit, OnDestroy} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Toast, ToastService} from '../common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  toast: Toast;
  showToast = false;
  unsubscribeObservable$: Subject<void> = new Subject();

  constructor(private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.toastService
      .get()
      .pipe(takeUntil(this.unsubscribeObservable$))
      .subscribe(newToast => {
        this.toast = newToast;
        this.showToast = true;
      });
  }

  closeToast(): void {
    this.showToast = false;
  }

  ngOnDestroy(): void {
    this.unsubscribeObservable$.next();
    this.unsubscribeObservable$.complete();
  }
}
