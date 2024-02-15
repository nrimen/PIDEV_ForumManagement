import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrequestComponent } from './addrequest.component';

describe('AddrequestComponent', () => {
  let component: AddrequestComponent;
  let fixture: ComponentFixture<AddrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
