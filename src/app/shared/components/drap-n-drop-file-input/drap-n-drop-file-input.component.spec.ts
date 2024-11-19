import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrapNDropFileInputComponent } from './drap-n-drop-file-input.component';

describe('DrapNDropFileInputComponent', () => {
  let component: DrapNDropFileInputComponent;
  let fixture: ComponentFixture<DrapNDropFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrapNDropFileInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrapNDropFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
