import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalcallsservicesComponent } from './localcallsservices.component';

describe('LocalcallsservicesComponent', () => {
  let component: LocalcallsservicesComponent;
  let fixture: ComponentFixture<LocalcallsservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalcallsservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalcallsservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
