import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCityComponent } from './all-city.component';

describe('AllCityComponent', () => {
  let component: AllCityComponent;
  let fixture: ComponentFixture<AllCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
