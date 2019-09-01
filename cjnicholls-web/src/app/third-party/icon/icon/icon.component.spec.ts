import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('IconComponent', () => {
    let component: IconComponent;
    let fixture: ComponentFixture<IconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FontAwesomeModule],
            declarations: [IconComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
