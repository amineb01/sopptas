import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesFormDialogComponent } from './categories-form-dialog.component';

describe('CategoriesFormDialogComponent', () => {
  let component: CategoriesFormDialogComponent;
  let fixture: ComponentFixture<CategoriesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
