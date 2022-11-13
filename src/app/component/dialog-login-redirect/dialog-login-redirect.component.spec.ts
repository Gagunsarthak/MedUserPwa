import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoginRedirectComponent } from './dialog-login-redirect.component';

describe('DialogLoginRedirectComponent', () => {
  let component: DialogLoginRedirectComponent;
  let fixture: ComponentFixture<DialogLoginRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLoginRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoginRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
