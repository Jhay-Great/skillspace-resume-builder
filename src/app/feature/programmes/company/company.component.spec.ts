import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyComponent } from './company.component';
import { TabMenuList } from '../../../core/interfaces/interfaces';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tabMenuList with correct values', () => {
    const expectedTabs: TabMenuList[] = [
      { label: 'Career programmes' },
      { label: 'Saved drafts' },
      { label: 'Published programmes' },
    ];
    expect(component.tabMenuList).toEqual(expectedTabs);
  });

  it('should set the default active tab to Career programmes', () => {
    expect(component.activeItem.label).toBe('Career programmes');
    expect(component.careerProgrammes).toBeTrue();
    expect(component.activeTabData).toBe(0);
  });

  it('should set active tab to Saved drafts when called', () => {
    component.setActiveTab('Saved drafts');
    expect(component.savedDraft).toBeTrue();
    expect(component.activeTabData).toBe(1);
    expect(component.careerProgrammes).toBeFalse();
    expect(component.publishedProgrammes).toBeFalse();
  });

  it('should set active tab to Published programmes when called', () => {
    component.setActiveTab('Published programmes');
    expect(component.publishedProgrammes).toBeTrue();
    expect(component.activeTabData).toBe(2);
    expect(component.careerProgrammes).toBeFalse();
    expect(component.savedDraft).toBeFalse();
  });

  it('should show the dialog when showDialog is called', () => {
    component.showDialog();
    expect(component.visible).toBeTrue();
  });

  it('should open and close the form modal correctly', () => {
    component.openForm();
    expect(component.formModal).toBeTrue();

    component.closeForm();
    expect(component.formModal).toBeFalse();
  });
});
