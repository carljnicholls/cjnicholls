import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// Solid Icons
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

// Brands Icons
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        FontAwesomeModule
    ]
})
export class IconsModule {

    constructor() {
        this.addSolidIcons();
        this.addBrandIcons();
    }

    private addSolidIcons(): void {
        library.add(faCoffee);
    }

    private addBrandIcons(): void {
        library.add(faGithub);
        library.add(faLinkedin);
    }
}
