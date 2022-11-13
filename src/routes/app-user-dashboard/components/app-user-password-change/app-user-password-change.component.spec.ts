import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserPasswordChangeComponent } from './app-user-password-change.component';

describe('AppUserPasswordChangeComponent', () => {
  let component: AppUserPasswordChangeComponent;
  let fixture: ComponentFixture<AppUserPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserPasswordChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
