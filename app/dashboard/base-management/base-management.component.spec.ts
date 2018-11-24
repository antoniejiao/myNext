import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseManagementComponent } from './base-management.component';

describe('BaseManagementComponent', () => {
  let component: BaseManagementComponent;
  let fixture: ComponentFixture<BaseManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
