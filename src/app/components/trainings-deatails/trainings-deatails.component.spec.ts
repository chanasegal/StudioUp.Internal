import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsDeatailsComponent } from './trainings-deatails.component';

describe('TrainingsDeatailsComponent', () => {
  let component: TrainingsDeatailsComponent;
  let fixture: ComponentFixture<TrainingsDeatailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingsDeatailsComponent]
    });
    fixture = TestBed.createComponent(TrainingsDeatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
