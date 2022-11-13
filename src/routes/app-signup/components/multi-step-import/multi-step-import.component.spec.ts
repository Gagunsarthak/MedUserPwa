import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStepImportComponent } from './multi-step-import.component';

describe('MultiStepImportComponent', () => {
  let component: MultiStepImportComponent;
  let fixture: ComponentFixture<MultiStepImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiStepImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStepImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
