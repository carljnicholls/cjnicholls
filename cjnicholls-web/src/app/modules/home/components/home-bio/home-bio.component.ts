import { Component, OnInit } from '@angular/core';
import { IconTypeEnum } from 'src/app/third-party/icon/dtos/icon-type.enum';

@Component({
    selector: 'home-bio-component',
    templateUrl: './home-bio.component.html',
    styleUrls: ['./home-bio.component.scss']
})
export class HomeBioComponent implements OnInit {
    public readonly githubUrl = 'https://github.com/carljnicholls';
    public readonly linkedInUrl = 'https://www.linkedin.com/in/carljnicholls/';
    public readonly email = 'carljnicholls@hotmail.com';

    constructor() { }

    public get iconLinkedIn(): IconTypeEnum { return IconTypeEnum.linkedIn; }
    public get iconGithub(): IconTypeEnum { return IconTypeEnum.github; }
    public get iconEmail(): IconTypeEnum { return IconTypeEnum.email; }

    public ngOnInit() {
    }
}
