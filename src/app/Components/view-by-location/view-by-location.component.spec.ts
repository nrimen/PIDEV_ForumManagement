import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByLocationComponent } from './view-by-location.component';

describe('ViewByLocationComponent', () => {
  let component: ViewByLocationComponent;
  let fixture: ComponentFixture<ViewByLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewByLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewByLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
