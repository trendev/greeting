import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectEthNetworkComponent } from './dialog-select-eth-network.component';

describe('DialogSelectEthNetworkComponent', () => {
  let component: DialogSelectEthNetworkComponent;
  let fixture: ComponentFixture<DialogSelectEthNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectEthNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectEthNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
