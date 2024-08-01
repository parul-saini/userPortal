import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAnimationBoxComponent } from './dialog-animation-box.component';

describe('DialogAnimationBoxComponent', () => {
  let component: DialogAnimationBoxComponent;
  let fixture: ComponentFixture<DialogAnimationBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAnimationBoxComponent]
    });
    fixture = TestBed.createComponent(DialogAnimationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
