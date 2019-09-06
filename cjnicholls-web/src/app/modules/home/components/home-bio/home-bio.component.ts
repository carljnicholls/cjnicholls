import { Component, OnInit } from '@angular/core';
import { IconTypeEnum } from 'src/app/third-party/icon/dtos/icon-type.enum';
import { MediaManagerService } from 'src/app/shared/services/media-manager.service';

@Component({
    selector: 'home-bio-component',
    templateUrl: './home-bio.component.html',
    styleUrls: ['./home-bio.component.scss']
})
export class HomeBioComponent implements OnInit {
    public readonly githubUrl = 'https://github.com/carljnicholls';
    public readonly linkedInUrl = 'https://www.linkedin.com/in/carljnicholls/';
    public readonly email = 'carljnicholls@hotmail.com';

    constructor(private readonly mediaManager: MediaManagerService) { }

    public get iconLinkedIn(): IconTypeEnum { return IconTypeEnum.linkedIn; }
    public get iconGithub(): IconTypeEnum { return IconTypeEnum.github; }
    public get iconEmail(): IconTypeEnum { return IconTypeEnum.email; }
    public get collapseIcons(): boolean {
        return this.mediaManager.isSmallerThanMd();
    }

    public ngOnInit() {
    }
}
