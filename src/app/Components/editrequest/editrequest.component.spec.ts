import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrequestComponent } from './editrequest.component';

describe('EditrequestComponent', () => {
  let component: EditrequestComponent;
  let fixture: ComponentFixture<EditrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
