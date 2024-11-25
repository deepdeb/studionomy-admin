import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailedSubscriptionComponent } from './availed-subscription.component';

describe('AvailedSubscriptionComponent', () => {
  let component: AvailedSubscriptionComponent;
  let fixture: ComponentFixture<AvailedSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailedSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailedSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
