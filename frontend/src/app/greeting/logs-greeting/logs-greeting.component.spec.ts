import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsGreetingComponent } from './logs-greeting.component';

describe('LogsGreetingComponent', () => {
  let component: LogsGreetingComponent;
  let fixture: ComponentFixture<LogsGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsGreetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
