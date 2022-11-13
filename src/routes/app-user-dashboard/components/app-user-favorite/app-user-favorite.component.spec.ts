import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserFavoriteComponent } from './app-user-favorite.component';

describe('AppUserFavoriteComponent', () => {
  let component: AppUserFavoriteComponent;
  let fixture: ComponentFixture<AppUserFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserFavoriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
