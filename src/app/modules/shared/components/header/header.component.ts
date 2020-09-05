import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisH, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private subs: Subscription[];

    constructor() {
        this.subs = [];
    }

    public get arrowCollapse(): IconDefinition { return faArrowLeft; }
    public get ellipsisH(): IconDefinition { return faEllipsisH; }

    @Input()
    public isOpen: boolean;
    @Input()
    public toggleVisibility: EventEmitter<boolean>;

    public showFiller: boolean;

    public ngOnInit(): void {
        if (!this.toggleVisibility) {
            this.toggleVisibility = new EventEmitter();
        }

        this.subs.push(
            this.toggleVisibility.subscribe((x: boolean) => {
                this.isOpen = x;
            })
        );
    }

    public ngOnDestroy(): void {
        this.subs.forEach(x => x.unsubscribe());
        this.subs = [];
    }

    public onBioCloseClick(): void {
        this.toggleVisibility.emit(false);
    }
}
