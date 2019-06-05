import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,

    FlexLayoutModule,

    MatToolbarModule
  ],
  exports: [
    BrowserAnimationsModule,

    FlexLayoutModule,

    MatToolbarModule
  ]
})
export class AngularMaterialModule { }
