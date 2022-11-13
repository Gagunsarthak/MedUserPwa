import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserBookingsComponent } from './app-user-bookings.component';

describe('AppUserBookingsComponent', () => {
  let component: AppUserBookingsComponent;
  let fixture: ComponentFixture<AppUserBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserBookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
