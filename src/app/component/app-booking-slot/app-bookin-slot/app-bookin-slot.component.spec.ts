import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBookinSlotComponent } from './app-bookin-slot.component';

describe('AppBookinSlotComponent', () => {
  let component: AppBookinSlotComponent;
  let fixture: ComponentFixture<AppBookinSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBookinSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBookinSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
