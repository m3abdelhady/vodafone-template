import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VodafoneTextComponent } from './vodafone-text.component';

describe('VodafoneTextComponent', () => {
  let component: VodafoneTextComponent;
  let fixture: ComponentFixture<VodafoneTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VodafoneTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VodafoneTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
