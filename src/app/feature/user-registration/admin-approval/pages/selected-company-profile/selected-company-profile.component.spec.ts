import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCompanyProfileComponent } from './selected-company-profile.component';

describe('SelectedCompanyProfileComponent', () => {
  let component: SelectedCompanyProfileComponent;
  let fixture: ComponentFixture<SelectedCompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedCompanyProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectedCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
