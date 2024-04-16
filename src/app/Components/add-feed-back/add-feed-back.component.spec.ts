import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedBackComponent } from './add-feed-back.component';

describe('AddFeedBackComponent', () => {
  let component: AddFeedBackComponent;
  let fixture: ComponentFixture<AddFeedBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeedBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeedBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
