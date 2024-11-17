import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderDescriptionComponent } from './page-header-description.component';

describe('PageHeaderDescriptionComponent', () => {
  let component: PageHeaderDescriptionComponent;
  let fixture: ComponentFixture<PageHeaderDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeaderDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageHeaderDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
