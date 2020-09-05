import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
// todo: hide icon imports behind interface with enum selector
import {faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
    public readonly githubUrl = 'https://github.com/carljnicholls';
    public readonly linkedInUrl = 'https://www.linkedin.com/in/carljnicholls/';
    public readonly email = 'carljnicholls@hotmail.com';

    constructor() { }

    @Input()
    public icon: IconDefinition;
    @Output()
    public onClick = new EventEmitter(true);

    public get iconLinkedIn(): IconDefinition {return faLinkedin; }
    public get iconGithub(): IconDefinition { return faGithubSquare; }
    public get iconEmail(): IconDefinition { return faEnvelopeSquare; }

    public ngOnInit(): void {
    }

    public onBtnClick(): void {
        this.onClick.emit();
    }
}
