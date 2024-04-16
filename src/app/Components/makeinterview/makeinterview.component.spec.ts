import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeinterviewComponent } from './makeinterview.component';

describe('MakeinterviewComponent', () => {
  let component: MakeinterviewComponent;
  let fixture: ComponentFixture<MakeinterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeinterviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeinterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
