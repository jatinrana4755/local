import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressContactComponent } from './press-contact.component';

describe('PressContactComponent', () => {
  let component: PressContactComponent;
  let fixture: ComponentFixture<PressContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
