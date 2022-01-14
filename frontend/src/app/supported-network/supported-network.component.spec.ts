import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedNetworkComponent } from './supported-network.component';

describe('SupportedNetworkComponent', () => {
  let component: SupportedNetworkComponent;
  let fixture: ComponentFixture<SupportedNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportedNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportedNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
