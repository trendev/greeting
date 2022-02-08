import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LogsGreetingComponent } from './logs-greeting.component';

describe('LogsGreetingComponent', () => {
  let component: LogsGreetingComponent;
  let fixture: ComponentFixture<LogsGreetingComponent>;
  const n = 10;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogsGreetingComponent]
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

  it('should have empty logs', () => {
    expect(component.logs).toBeDefined();
    expect(component.logs).toHaveSize(0);
  });
  
  it(`should have ${n} logs`, fakeAsync(() => {
    expect(component.logs).toBeDefined();

    for (let i = 0; i < n; i++) {
      component.logs.push(`log-${i}`);
    }

    expect(component.logs).toHaveSize(n);

    fixture.detectChanges();

    const appElement: HTMLElement = fixture.nativeElement;
    expect(appElement).toBeDefined();
    const elmt = appElement.querySelector('table')!;
    expect(elmt).toBeDefined();
    expect(elmt.hasChildNodes()).toBeTrue();
    expect(elmt.childElementCount).toEqual(n + 1); // header + n rows (logs)

  }));
});
