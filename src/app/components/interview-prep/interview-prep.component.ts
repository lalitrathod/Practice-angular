import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Question {
  id: number;
  category: string;
  question: string;
  answer: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
}

@Component({
  selector: 'app-interview-prep',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interview-prep.component.html',
  styleUrl: './interview-prep.component.scss'
})
export class InterviewPrepComponent {
  selectedCategory = signal<string>('all');
  searchTerm = signal('');
  
  questions: Question[] = [
    // Components
    {
      id: 1,
      category: 'Components',
      question: 'What is a Component in Angular?',
      answer: 'A component is a TypeScript class decorated with @Component that controls a view (template). It consists of a class (logic), template (view), and metadata (decorator).',
      difficulty: 'Basic'
    },
    {
      id: 2,
      category: 'Components',
      question: 'What is the difference between constructor and ngOnInit?',
      answer: 'Constructor is called when the class is instantiated (before Angular processes the component). ngOnInit is called after Angular has initialized the component\'s data-bound properties. Use ngOnInit for initialization logic.',
      difficulty: 'Basic'
    },
    {
      id: 3,
      category: 'Components',
      question: 'What are Signals in Angular?',
      answer: 'Signals (Angular 16+) are a reactive primitive that can hold a value and notify consumers when that value changes. They provide fine-grained reactivity and better performance.',
      difficulty: 'Intermediate'
    },
    
    // Data Binding
    {
      id: 4,
      category: 'Data Binding',
      question: 'What are the different types of data binding in Angular?',
      answer: '1. Interpolation {{ }} - Component to View\n2. Property Binding [property] - Component to View\n3. Event Binding (event) - View to Component\n4. Two-way Binding [(ngModel)] - Component ↔ View',
      difficulty: 'Basic'
    },
    
    // Directives
    {
      id: 5,
      category: 'Directives',
      question: 'What\'s the difference between *ngIf and [hidden]?',
      answer: '*ngIf removes the element from the DOM, while [hidden] just hides it with CSS. Use *ngIf when you want to conditionally render elements (better performance).',
      difficulty: 'Basic'
    },
    {
      id: 6,
      category: 'Directives',
      question: 'Why use trackBy in *ngFor?',
      answer: 'trackBy helps Angular identify which items have changed, added, or removed. This improves performance by reusing DOM elements instead of recreating them, especially important for large lists.',
      difficulty: 'Intermediate'
    },
    
    // Services & DI
    {
      id: 7,
      category: 'Services',
      question: 'What is Dependency Injection in Angular?',
      answer: 'Dependency Injection is a design pattern where dependencies are provided to a class rather than the class creating them itself. Angular\'s DI system automatically resolves and injects dependencies.',
      difficulty: 'Basic'
    },
    {
      id: 8,
      category: 'Services',
      question: 'What\'s the difference between providedIn: \'root\' and providedIn: \'any\'?',
      answer: 'providedIn: \'root\' creates a singleton service instance shared across the entire app. providedIn: \'any\' creates a new instance for each lazy-loaded module.',
      difficulty: 'Intermediate'
    },
    
    // Routing
    {
      id: 9,
      category: 'Routing',
      question: 'What are Route Guards?',
      answer: 'Route guards are interfaces that control navigation:\n- CanActivate: Controls if route can be activated\n- CanDeactivate: Controls if route can be deactivated\n- CanLoad: Controls if module can be loaded\n- Resolve: Resolves data before route activation',
      difficulty: 'Intermediate'
    },
    {
      id: 10,
      category: 'Routing',
      question: 'What is Lazy Loading?',
      answer: 'Lazy loading loads feature modules only when their routes are accessed, reducing initial bundle size and improving app startup time. Use loadChildren instead of component in route configuration.',
      difficulty: 'Intermediate'
    },
    
    // Forms
    {
      id: 11,
      category: 'Forms',
      question: 'What\'s the difference between Template-driven and Reactive forms?',
      answer: 'Template-driven: Forms defined in template, uses directives, simpler, less testable. Reactive: Forms defined in component, uses FormBuilder, more powerful, testable, better for complex forms.',
      difficulty: 'Basic'
    },
    {
      id: 12,
      category: 'Forms',
      question: 'What is FormArray?',
      answer: 'FormArray is used to manage an array of FormControls, FormGroups, or FormArrays. It\'s useful for dynamic forms where the number of fields can change (e.g., adding/removing items).',
      difficulty: 'Intermediate'
    },
    
    // HTTP
    {
      id: 13,
      category: 'HTTP',
      question: 'What are HTTP Interceptors?',
      answer: 'Interceptors are middleware that can modify HTTP requests and responses. They\'re useful for adding headers, logging, error handling, authentication tokens, etc.',
      difficulty: 'Intermediate'
    },
    
    // RxJS
    {
      id: 14,
      category: 'RxJS',
      question: 'What\'s the difference between Observable and Promise?',
      answer: 'Observables can emit multiple values over time, are lazy and cancellable, and support operators. Promises emit a single value, execute immediately, and are not cancellable.',
      difficulty: 'Basic'
    },
    {
      id: 15,
      category: 'RxJS',
      question: 'What\'s the difference between switchMap and mergeMap?',
      answer: 'switchMap cancels previous inner observables, only latest emits. mergeMap merges all inner observables, all emit concurrently.',
      difficulty: 'Advanced'
    },
    
    // Advanced
    {
      id: 16,
      category: 'Advanced',
      question: 'How do you optimize Angular application performance?',
      answer: '1. Use OnPush change detection\n2. Use trackBy in *ngFor\n3. Lazy load modules\n4. Use signals for fine-grained reactivity\n5. Virtual scrolling for large lists\n6. AOT compilation\n7. Code splitting',
      difficulty: 'Advanced'
    },
    {
      id: 17,
      category: 'Advanced',
      question: 'What is Change Detection in Angular?',
      answer: 'Change detection is the process of checking if component data has changed and updating the DOM accordingly. Angular uses Zone.js to detect changes. OnPush strategy only checks when inputs change or events occur.',
      difficulty: 'Advanced'
    }
  ];
  
  filteredQuestions = signal<Question[]>(this.questions);
  selectedQuestion = signal<Question | null>(null);
  
  categories = ['all', 'Components', 'Data Binding', 'Directives', 'Services', 'Routing', 'Forms', 'HTTP', 'RxJS', 'Advanced'];
  
  constructor() {
    this.filterQuestions();
  }
  
  filterQuestions(): void {
    let filtered = [...this.questions];
    
    if (this.selectedCategory() !== 'all') {
      filtered = filtered.filter(q => q.category === this.selectedCategory());
    }
    
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(term) || 
        q.answer.toLowerCase().includes(term)
      );
    }
    
    this.filteredQuestions.set(filtered);
  }
  
  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.filterQuestions();
  }
  
  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.filterQuestions();
  }
  
  selectQuestion(question: Question): void {
    this.selectedQuestion.set(question);
  }
  
  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Basic': return '#4caf50';
      case 'Intermediate': return '#ff9800';
      case 'Advanced': return '#f44336';
      default: return '#666';
    }
  }
}
