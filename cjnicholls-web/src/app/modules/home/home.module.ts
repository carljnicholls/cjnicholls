import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { HomeRoutingModule } from './home-routing.module.';
// Third Party
import { AngularMaterialModule } from 'src/app/third-party/angular-material/angular-material.module';
import { IconModule } from 'src/app/third-party/icon/icon.module';

import { HomeComponent } from './home.component';
import { HomeBodyComponent } from './components/home-body/home-body.component';
import { HomeBioComponent } from './components/home-bio/home-bio.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeBodyComponent,
    HomeBioComponent
  ],
  imports: [
    CommonModule,

    AngularMaterialModule,
    IconModule,

    HomeRoutingModule
  ]
})
export class HomeModule { }
