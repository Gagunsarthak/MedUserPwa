import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAccountResetComponent } from './app-account-reset.component';

describe('AppAccountResetComponent', () => {
  let component: AppAccountResetComponent;
  let fixture: ComponentFixture<AppAccountResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAccountResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAccountResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
