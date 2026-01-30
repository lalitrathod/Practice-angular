import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Observable, of, interval, fromEvent, merge, combineLatest, debounceTime, distinctUntilChanged, map, filter, takeUntil, switchMap, catchError } from 'rxjs';

@Component({
  selector: 'app-rxjs-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-demo.component.html',
  styleUrl: './rxjs-demo.component.scss'
})
export class RxjsDemoComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Observable examples
  count = signal(0);
  searchTerm = signal('');
  combinedValue = signal('');
  errorMessage = signal<string | null>(null);

  // Subject examples
  private subject = new Subject<string>();
  subjectMessages = signal<string[]>([]);

  constructor() {
    this.setupObservables();
    this.setupSubjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // 1. Basic Observable
  setupObservables(): void {
    // Create observable from array
    const numbers$ = of(1, 2, 3, 4, 5);
    
    numbers$.subscribe(value => {
      console.log('Observable value:', value);
    });

    // Interval observable
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.count.set(value);
      });
  }

  // 2. Operators
  demonstrateOperators(): void {
    const source$ = of(1, 2, 3, 4, 5, 2, 3, 1);
    
    source$.pipe(
      map(x => x * 2),           // Transform: [2, 4, 6, 8, 10, 4, 6, 2]
      filter(x => x > 5),        // Filter: [6, 8, 10, 6]
      distinctUntilChanged()     // Remove duplicates: [6, 8, 10]
    ).subscribe(value => {
      console.log('Operator result:', value);
    });
  }

  // 3. Search with debounce
  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    
    of(value).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        // Simulate API call
        return this.searchAPI(term);
      }),
      catchError(error => {
        this.errorMessage.set('Search failed');
        return of([]);
      })
    ).subscribe(results => {
      console.log('Search results:', results);
    });
  }

  private searchAPI(term: string): Observable<any[]> {
    // Simulate API call
    return of([{ id: 1, name: `Result for ${term}` }]);
  }

  // 4. Combine Observables
  combineObservables(): void {
    const source1$ = of('Hello');
    const source2$ = of('World');
    
    combineLatest([source1$, source2$])
      .pipe(
        map(([val1, val2]) => `${val1} ${val2}`)
      )
      .subscribe(result => {
        this.combinedValue.set(result);
      });
  }

  // 5. Merge Observables
  mergeObservables(): void {
    const source1$ = interval(1000).pipe(map(x => `Source1: ${x}`));
    const source2$ = interval(1500).pipe(map(x => `Source2: ${x}`));
    
    merge(source1$, source2$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        console.log('Merged:', value);
      });
  }

  // 6. Subject
  setupSubjects(): void {
    this.subject.pipe(
      takeUntil(this.destroy$)
    ).subscribe(message => {
      this.subjectMessages.update(messages => [...messages, message]);
    });
  }

  sendMessage(): void {
    this.subject.next(`Message ${Date.now()}`);
  }

  // 7. Error Handling
  demonstrateErrorHandling(): void {
    const error$ = of(1, 2, 3).pipe(
      map(x => {
        if (x === 2) throw new Error('Error at 2');
        return x;
      }),
      catchError(error => {
        this.errorMessage.set(error.message);
        return of('Error handled');
      })
    );

    error$.subscribe({
      next: value => console.log('Value:', value),
      error: err => console.error('Error:', err),
      complete: () => console.log('Complete')
    });
  }
}
