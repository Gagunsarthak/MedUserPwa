import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMedDetailComponent } from './dialog-add-med-detail.component';

describe('DialogAddMedDetailComponent', () => {
  let component: DialogAddMedDetailComponent;
  let fixture: ComponentFixture<DialogAddMedDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddMedDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddMedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
