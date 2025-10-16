import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAvailableTrainingsComponent } from './generate-available-trainings.component';

describe('GenerateAvailableTrainingsComponent', () => {
  let component: GenerateAvailableTrainingsComponent;
  let fixture: ComponentFixture<GenerateAvailableTrainingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateAvailableTrainingsComponent]
    });
    fixture = TestBed.createComponent(GenerateAvailableTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
