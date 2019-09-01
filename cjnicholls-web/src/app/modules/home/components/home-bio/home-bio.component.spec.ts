import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBioComponent } from './home-bio.component';
import { IconModule } from 'src/app/third-party/icon/icon.module';

describe('HomeBioComponent', () => {
  let component: HomeBioComponent;
  let fixture: ComponentFixture<HomeBioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [HomeBioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
