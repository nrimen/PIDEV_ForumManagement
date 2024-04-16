import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleStandsDialogComponent } from './add-multiple-stands-dialog.component';

describe('AddMultipleStandsDialogComponent', () => {
  let component: AddMultipleStandsDialogComponent;
  let fixture: ComponentFixture<AddMultipleStandsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultipleStandsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMultipleStandsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
