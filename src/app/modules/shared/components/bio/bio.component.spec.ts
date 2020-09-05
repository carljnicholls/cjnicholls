import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BioComponent } from './bio.component';

describe('HomeBioComponent', () => {
    let component: BioComponent;
    let fixture: ComponentFixture<BioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [BioComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
