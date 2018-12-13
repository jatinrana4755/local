import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlladsComponent } from './allads.component';

describe('AlladsComponent', () => {
  let component: AlladsComponent;
  let fixture: ComponentFixture<AlladsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlladsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlladsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
