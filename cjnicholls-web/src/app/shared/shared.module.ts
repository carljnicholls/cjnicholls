import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../third-party/angular-material/angular-material.module';

import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,

        AngularMaterialModule,
    ],
    exports: [
        HeaderComponent
    ]
})
export class SharedModule { }
