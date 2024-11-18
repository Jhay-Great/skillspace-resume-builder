import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentRegistrationComponent } from './talent-registration.component';

describe('TalentRegistrationComponent', () => {
  let component: TalentRegistrationComponent;
  let fixture: ComponentFixture<TalentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalentRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TalentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
