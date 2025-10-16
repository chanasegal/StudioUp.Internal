import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDeatailsComponent } from './training-deatails.component';

describe('TrainingDeatailsComponent', () => {
  let component: TrainingDeatailsComponent;
  let fixture: ComponentFixture<TrainingDeatailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingDeatailsComponent]
    });
    fixture = TestBed.createComponent(TrainingDeatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
