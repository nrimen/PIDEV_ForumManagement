import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestadminComponent } from './requestadmin.component';

describe('RequestadminComponent', () => {
  let component: RequestadminComponent;
  let fixture: ComponentFixture<RequestadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
