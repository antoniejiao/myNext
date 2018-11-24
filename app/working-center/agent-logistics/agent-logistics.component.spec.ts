import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLogisticsComponent } from './agent-logistics.component';

describe('AgentLogisticsComponent', () => {
  let component: AgentLogisticsComponent;
  let fixture: ComponentFixture<AgentLogisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentLogisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
