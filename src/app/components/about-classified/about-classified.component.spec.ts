import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutClassifiedComponent } from './about-classified.component';

describe('AboutClassifiedComponent', () => {
  let component: AboutClassifiedComponent;
  let fixture: ComponentFixture<AboutClassifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutClassifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutClassifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
