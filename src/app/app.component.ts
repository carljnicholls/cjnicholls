import { Component, EventEmitter, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'cjnicholls';

    public isNavOpen = true;
    public arrowOpen = faArrowRight;
    public toggleNavVisibility = new EventEmitter<boolean>();

    public ngOnInit(): void {
        this.toggleNavVisibility.subscribe(x => {
            this.isNavOpen = x;
        });
    }

    public onNavOpenClick(): void {
        this.isNavOpen = true;
        this.toggleNavVisibility.emit(true);
    }
}
