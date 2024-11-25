import { Component, DestroyRef, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// primeng modules
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, from, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    CommonModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Input () placeholder: string = 'Search';
  @Input () debounceTime: number = 500;
  @Output () search: EventEmitter<string> = new EventEmitter();

  searchQuery:string = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private destroyRef: DestroyRef,
  ) {
    this.setupSearchSubscription();
  };
  

  onInput() {
    this.searchSubject.next(this.searchQuery);
  }

  private setupSearchSubscription(): void {
    this.searchSubject
      .pipe(
        debounceTime(this.debounceTime), 
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((query) => {
        // Emit search query
        this.search.emit(query);
      });
  }
}
