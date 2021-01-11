import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneFormDialogComponent } from './zone-form-dialog.component';

describe('ZoneFormDialogComponent', () => {
  let component: ZoneFormDialogComponent;
  let fixture: ComponentFixture<ZoneFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
