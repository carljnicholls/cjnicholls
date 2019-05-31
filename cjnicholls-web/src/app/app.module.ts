import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './shared/shared.module';
import { AngularMaterialModule } from './third-party/angular-material/angular-material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Third Party
    AngularMaterialModule,

    // Shared
    SharedModule,

    // Views
    HomeModule,

    AppRoutingModule // always last
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
