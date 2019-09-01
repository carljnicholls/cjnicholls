import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HomeBodyComponent } from './components/home-body/home-body.component';
import { HomeBioComponent } from './components/home-bio/home-bio.component';
import { IconComponent } from 'src/app/third-party/icon/icon/icon.component';
import { IconModule } from 'src/app/third-party/icon/icon.module';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                HomeBioComponent,
                HomeBodyComponent
            ],
            providers: [],
            imports: [IconModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
