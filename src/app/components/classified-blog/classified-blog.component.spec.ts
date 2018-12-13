import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifiedBlogComponent } from './classified-blog.component';

describe('ClassifiedBlogComponent', () => {
  let component: ClassifiedBlogComponent;
  let fixture: ComponentFixture<ClassifiedBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifiedBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifiedBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
