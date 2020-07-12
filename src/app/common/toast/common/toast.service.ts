import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from './toast.model';

@Injectable()
export class ToastService {
  private showToast$: Subject<Toast> = new Subject();

  constructor() {}

  get(): Subject<Toast> {
    return this.showToast$;
  }

  setToastData(data: Toast): void {
    this.showToast$.next(data);
  }

  setErrorToast(message: string): void {
    this.showToast$.next({ message, variant: 'error' });
  }

  setInfoToast(message: string): void {
    this.showToast$.next({ message, variant: 'info' });
  }
}
