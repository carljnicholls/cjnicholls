import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { HomeRoutingModule } from './home-routing.module.';
// Third Party
import { AngularMaterialModule } from 'src/app/third-party/angular-material/angular-material.module';

import { HomeComponent } from './home.component';
import { HomeBodyComponent } from './components/home-body/home-body.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeBodyComponent
  ],
  imports: [
    CommonModule,

    AngularMaterialModule,

    HomeRoutingModule
  ]
})
export class HomeModule { }
