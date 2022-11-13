import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserDashboardComponent } from './app-user-dashboard.component';

describe('AppUserDashboardComponent', () => {
  let component: AppUserDashboardComponent;
  let fixture: ComponentFixture<AppUserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
