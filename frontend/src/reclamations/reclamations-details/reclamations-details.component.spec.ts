import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationsDetailsComponent } from './reclamations-details.component';

describe('ReclamationsDetailsComponent', () => {
  let component: ReclamationsDetailsComponent;
  let fixture: ComponentFixture<ReclamationsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamationsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
