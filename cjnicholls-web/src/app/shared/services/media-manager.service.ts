import { Injectable } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Injectable({
    providedIn: 'root'
})
export class MediaManagerService {
    private state: string;

    constructor(private media: MediaObserver) {
        media.asObservable()
            .subscribe((change: MediaChange[]) =>
                this.onMediaStateChange(change));
    }

    /**
     * Gets the current responsive view state 
     * (e.g. `sm, md, lg, lt-md, gt-md`)
     */
    public get currentState(): string {
        return this.state;
    }

    /**
     * Indicates whether the responsive view state is 
     * smaller than md (e.g. `state < md`)
     */
    public isSmallerThanMd(): boolean {
        return this.media.isActive('lt-md');
    }

    private onMediaStateChange(change: MediaChange[]): void {
        this.state = change
            ? change[0].mqAlias
            : '';
    }
}
