import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverStandComponent } from './reserver-stand.component';

describe('ReserverStandComponent', () => {
  let component: ReserverStandComponent;
  let fixture: ComponentFixture<ReserverStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserverStandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserverStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
