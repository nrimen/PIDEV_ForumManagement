import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenStandsCardDialogComponent } from './open-stands-card-dialog.component';

describe('OpenStandsCardDialogComponent', () => {
  let component: OpenStandsCardDialogComponent;
  let fixture: ComponentFixture<OpenStandsCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenStandsCardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenStandsCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
