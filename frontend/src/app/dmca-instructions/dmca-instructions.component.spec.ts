import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaInstructionsComponent } from './dmca-instructions.component';

describe('DmcaInstructionsComponent', () => {
  let component: DmcaInstructionsComponent;
  let fixture: ComponentFixture<DmcaInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcaInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcaInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
