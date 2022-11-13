import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGraphBarComponent } from './dialog-graph-bar.component';

describe('DialogGraphBarComponent', () => {
  let component: DialogGraphBarComponent;
  let fixture: ComponentFixture<DialogGraphBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGraphBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGraphBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
