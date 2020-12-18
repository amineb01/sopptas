import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthentificationComponent } from './athentification.component';

describe('AthentificationComponent', () => {
  let component: AthentificationComponent;
  let fixture: ComponentFixture<AthentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
