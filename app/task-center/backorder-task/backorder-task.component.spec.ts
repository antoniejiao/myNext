import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackorderTaskComponent } from './backorder-task.component';

describe('BackorderTaskComponent', () => {
  let component: BackorderTaskComponent;
  let fixture: ComponentFixture<BackorderTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackorderTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackorderTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
