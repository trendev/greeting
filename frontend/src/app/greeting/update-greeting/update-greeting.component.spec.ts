import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGreetingComponent } from './update-greeting.component';

describe('UpdateGreetingComponent', () => {
  let component: UpdateGreetingComponent;
  let fixture: ComponentFixture<UpdateGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGreetingComponent ]
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
});
