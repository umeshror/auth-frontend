import {NgModule, ModuleWithProviders} from '@angular/core';
import {ToastService} from './common';
import {ToastComponent} from './components';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule],
  exports: [ToastComponent]
})
export class ToastModule {
  static forRoot(): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [ToastService]
    };
  }
}
