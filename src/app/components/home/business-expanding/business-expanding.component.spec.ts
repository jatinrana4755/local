import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessExpandingComponent } from './business-expanding.component';

describe('BusinessExpandingComponent', () => {
  let component: BusinessExpandingComponent;
  let fixture: ComponentFixture<BusinessExpandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessExpandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessExpandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
