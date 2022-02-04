import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastBlockNumberComponent } from './last-block-number.component';

describe('LastBlockNumberComponent', () => {
  let component: LastBlockNumberComponent;
  let fixture: ComponentFixture<LastBlockNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastBlockNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastBlockNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
