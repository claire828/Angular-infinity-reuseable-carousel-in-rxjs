import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentModalComponent } from './present-modal.component';

describe('PresentModalComponent', () => {
  let component: PresentModalComponent;
  let fixture: ComponentFixture<PresentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
