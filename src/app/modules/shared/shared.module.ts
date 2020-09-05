import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BioComponent } from './components/bio/bio.component';

@NgModule({
    declarations: [HeaderComponent, FooterComponent, BioComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatButtonModule,
        MatTooltipModule,

        BrowserAnimationsModule,

        FontAwesomeModule
    ],
    exports: [
        FlexLayoutModule,
        MatSidenavModule,
        MatButtonModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        FontAwesomeModule,

        BioComponent,
        HeaderComponent,
        FooterComponent,
    ]
})
export class SharedModule { }
