import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionOptionsComponent } from './subscription-options.component';

describe('SubscriptionOptionsComponent', () => {
  let component: SubscriptionOptionsComponent;
  let fixture: ComponentFixture<SubscriptionOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionOptionsComponent]
    });
    fixture = TestBed.createComponent(SubscriptionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
