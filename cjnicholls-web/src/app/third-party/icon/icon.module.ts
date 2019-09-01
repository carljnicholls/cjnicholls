import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './icon/icon.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
    declarations: [
        IconComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        AngularMaterialModule
    ],
    exports: [
        FontAwesomeModule,
        IconComponent
    ]
})
export class IconModule {

    constructor() {
    }
}
