import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeedBackComponent } from './edit-feed-back.component';

describe('EditFeedBackComponent', () => {
  let component: EditFeedBackComponent;
  let fixture: ComponentFixture<EditFeedBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFeedBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFeedBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
