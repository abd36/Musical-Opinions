import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaTakeDownPolicyComponent } from './dmca-take-down-policy.component';

describe('DmcaTakeDownPolicyComponent', () => {
  let component: DmcaTakeDownPolicyComponent;
  let fixture: ComponentFixture<DmcaTakeDownPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcaTakeDownPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcaTakeDownPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
