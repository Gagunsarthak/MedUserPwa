import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLiveQueueComponent } from './app-live-queue.component';

describe('AppLiveQueueComponent', () => {
  let component: AppLiveQueueComponent;
  let fixture: ComponentFixture<AppLiveQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLiveQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLiveQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
