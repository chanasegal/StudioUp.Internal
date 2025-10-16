import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentTableComponent } from './managment-table.component';

describe('ManagmentTableComponent', () => {
  let component: ManagmentTableComponent;
  let fixture: ComponentFixture<ManagmentTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagmentTableComponent]
    });
    fixture = TestBed.createComponent(ManagmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
