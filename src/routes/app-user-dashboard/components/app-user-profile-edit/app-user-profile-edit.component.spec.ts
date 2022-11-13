import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserProfileEditComponent } from './app-user-profile-edit.component';

describe('AppUserProfileEditComponent', () => {
  let component: AppUserProfileEditComponent;
  let fixture: ComponentFixture<AppUserProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserProfileEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
