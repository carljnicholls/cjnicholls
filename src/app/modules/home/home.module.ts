import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule
  ],
  exports: [
    IndexComponent
  ]
})
export class HomeModule { }
