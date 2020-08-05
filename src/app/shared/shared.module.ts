import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';

import {RouterModule} from '@angular/router';
import {ScrollToDirective} from './directives/scroll-to.directive';
import {MaterialModule} from './material/material.module';

@NgModule({
  declarations: [ScrollToDirective],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ScrollToDirective
  ],
  providers: []
})
export class SharedModule {
}
