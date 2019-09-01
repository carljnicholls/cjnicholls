import { Component, OnInit, Input } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { IconTypeEnum } from '../dtos/icon-type.enum';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEnvelopeSquare, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'icon-component',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

    private _iconType: IconTypeEnum;
    private _text: string;
    private _iconOnly: boolean;

    public constructor() { }

    /**
     * Returns a font awesome `IconDefinition` dependant on 
     * `this._iconType` 
     */
    public get iconType(): IconDefinition {
        if (isNullOrUndefined(this._iconType)
            || this._iconType === 0) { return; }

        switch (this._iconType) {
            case IconTypeEnum.email: {
                return faEnvelopeSquare;
            }
            case IconTypeEnum.github: {
                return faGithub;
            }
            case IconTypeEnum.linkedIn: {
                return faLinkedin;
            }
            default: {
                return faQuestionCircle;
            }
        }
    }
    /**
     * Gets the text set on the component input `message` 
     */
    public get text(): string {
        return this._text;
    }
    /**
     * Gets the `iconOnly` set on component input
     */
    public get iconOnly(): boolean {
        return this._iconOnly || false;
    }
    /**
     * Sets the icon to be displayed
     */
    @Input()
    public set icon(icon: IconTypeEnum) {
        this._iconType = icon;
    }
    /**
     * Sets the message to be displayed inline with the icon
     */
    @Input()
    public set message(value: string) {
        this._text = value;
    }
    /**
     * Sets whether to omit the `message` input even if set. 
     * Changes UI elements to icon only.
     */
    @Input()
    public set iconOnly(value: boolean) {
        this._iconOnly = value;
    }

    public ngOnInit() {
    }

}
