import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStandComponent } from './create-stand.component';

describe('CreateStandComponent', () => {
  let component: CreateStandComponent;
  let fixture: ComponentFixture<CreateStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
