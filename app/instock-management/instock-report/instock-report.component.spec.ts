import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstockReportComponent } from './instock-report.component';

describe('InstockReportComponent', () => {
  let component: InstockReportComponent;
  let fixture: ComponentFixture<InstockReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstockReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
