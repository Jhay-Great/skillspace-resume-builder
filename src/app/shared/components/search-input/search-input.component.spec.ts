import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { Subject } from 'rxjs';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    component['searchSubject'] = new Subject<string>();
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call next() on searchSubject with current searchQuery', () => {
    const testQuery = 'test search';
    component.searchQuery = testQuery;
    
    const nextSpy = spyOn(component['searchSubject'], 'next');
    
    component.onInput();
    
    expect(nextSpy).toHaveBeenCalledWith(testQuery);
  });

  it('should handle empty search query', () => {
    component.searchQuery = '';
    
    const nextSpy = spyOn(component['searchSubject'], 'next');
    
    component.onInput();
    
    expect(nextSpy).toHaveBeenCalledWith('');
  });
  
});
