import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-supported-network', template: '<h2>Networks</h2><table></table>' })
class SupportedNetworkStubComponent {
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        SupportedNetworkStubComponent,
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  describe('is not initialized', () => {

    const tags = [
      {
        tag: 'h1',
        msg: 'Metamask Authentication REQUIRED'
      },
      {
        tag: 'h3',
        msg: 'Other networks are not supported yet...'
      },
      {
        tag: 'h4',
        msg: 'All Github sources'
      }
    ];

    tags.forEach(t => {
      it(`should have <${t.tag}> with text "${t.msg}"`, () => {
        const appElement: HTMLElement = fixture.nativeElement;
        expect(appElement).toBeDefined();
        const elmt = appElement.querySelector(t.tag)!;
        expect(elmt).toBeDefined();
        expect(elmt.textContent).toBeDefined();
        expect(elmt.textContent).toContain(t.msg);
      });
    });

    it('should have <app-supported-network> with 2 Elements', () => {
      const appElement: HTMLElement = fixture.nativeElement;
      expect(appElement).toBeDefined();
      const elmt = appElement.querySelector('app-supported-network')!;
      expect(elmt).toBeDefined();
      expect(elmt.hasChildNodes()).toBeTrue();
      expect(elmt.childElementCount).toEqual(2); //<h2> + <table>
    });

  });


});
