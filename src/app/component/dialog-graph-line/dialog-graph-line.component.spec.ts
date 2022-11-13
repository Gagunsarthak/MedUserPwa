import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGraphLineComponent } from './dialog-graph-line.component';

describe('DialogGraphLineComponent', () => {
  let component: DialogGraphLineComponent;
  let fixture: ComponentFixture<DialogGraphLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGraphLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGraphLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
