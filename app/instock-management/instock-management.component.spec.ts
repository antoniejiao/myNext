import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstockManagementComponent } from './instock-management.component';

describe('InstockManagementComponent', () => {
  let component: InstockManagementComponent;
  let fixture: ComponentFixture<InstockManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstockManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstockManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
