import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first, finalize } from 'rxjs';

import { UpdateGreetingComponent } from './update-greeting.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdateGreetingComponent', () => {
  let component: UpdateGreetingComponent;
  let fixture: ComponentFixture<UpdateGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatInputModule
      ],
      declarations: [UpdateGreetingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be disabled', () => {
    expect(component.disabled).toBeTrue();
  });

  it('should emit if message is not empty', (done: DoneFn) => {
    const msg = 'message'.trim();
    const spy = spyOn(component.message, 'emit').and.callThrough();
    component.message.pipe(
      first(),
      finalize(done)
    ).subscribe(m => {
      expect(m).toBeTruthy();
      expect(m).toBe(msg);
    })
    component.updateGreeting(`   ${msg}    `);
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit if message is falsy', () => {
    const spy = spyOn(component.message, 'emit').and.callThrough();
    component.updateGreeting('');
    expect(spy).not.toHaveBeenCalled();
  });
});
