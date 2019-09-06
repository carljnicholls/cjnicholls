import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaManagerService } from './shared/services/media-manager.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private readonly contentPaddingCssClass = 'page-content-padding';
    private readonly pageTitle = 'cjnicholls-web';

    constructor(
        private readonly mediaManager: MediaManagerService,
    ) {
    }

    public get title(): string { return this.pageTitle; }
    public get addPaddingClass(): string {
        return this.mediaManager.isSmallerThanMd()
            ? this.contentPaddingCssClass
            : '';
    }

    public ngOnInit(): void {
    }
}
