import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZegocloudComponent } from './zegocloud.component';

describe('ZegocloudComponent', () => {
  let component: ZegocloudComponent;
  let fixture: ComponentFixture<ZegocloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZegocloudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZegocloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
