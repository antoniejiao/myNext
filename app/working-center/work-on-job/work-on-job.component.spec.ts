import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOnJobComponent } from './work-on-job.component';

describe('WorkOnJobComponent', () => {
  let component: WorkOnJobComponent;
  let fixture: ComponentFixture<WorkOnJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOnJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOnJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
