import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmapplicationComponent } from './confirmapplication.component';

describe('ConfirmapplicationComponent', () => {
  let component: ConfirmapplicationComponent;
  let fixture: ComponentFixture<ConfirmapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmapplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
