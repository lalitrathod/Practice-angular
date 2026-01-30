import { Component, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-state-management-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="state-management-container">
      <h1>🔄 State Management with Signals</h1>
      
      <p class="intro-text">
        Angular Signals provide a modern way to manage reactive state. They automatically track dependencies and trigger updates when values change.
      </p>

      <section class="demo-section">
        <h2>Interactive Todo Demo</h2>
        <div class="todo-app">
          <div class="stats">
            <div class="stat-item">
              <span class="stat-label">Total</span>
              <span class="stat-value">{{ totalTodos() }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Active</span>
              <span class="stat-value active">{{ activeCount() }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Completed</span>
              <span class="stat-value completed">{{ completedCount() }}</span>
            </div>
          </div>

          <div class="add-todo">
            <input 
              [(ngModel)]="newTodoTitle"
              (keyup.enter)="addTodo(newTodoTitle())"
              type="text" 
              placeholder="Add a new todo..."
              class="todo-input">
            <button (click)="addTodo(newTodoTitle())" class="btn-primary">Add</button>
          </div>

          <div class="filters">
            <button 
              *ngFor="let f of ['all', 'active', 'completed']"
              [class.active]="filter() === f"
              (click)="setFilter(f)"
              class="filter-btn">
              {{ f | titlecase }}
            </button>
          </div>

          <div class="todo-list">
            <div *ngIf="filteredTodos().length === 0" class="empty-state">
              <p>No todos</p>
            </div>
            
            <div *ngFor="let todo of filteredTodos()" class="todo-item" [class.completed]="todo.completed">
              <input 
                type="checkbox" 
                [checked]="todo.completed"
                (change)="toggleComplete(todo.id)"
                class="todo-checkbox">
              <span class="todo-text">{{ todo.title }}</span>
              <button (click)="removeTodo(todo.id)" class="btn-remove">×</button>
            </div>
          </div>
        </div>
      </section>

      <section class="concepts-section">
        <h2>✨ Key Concepts</h2>
        
        <div class="concepts-grid">
          <div class="concept-card">
            <h3>Signal</h3>
            <p>A wrapper around a value that notifies subscribers when it changes. Use signal() to create one.</p>
          </div>
          
          <div class="concept-card">
            <h3>Computed</h3>
            <p>A derived signal that automatically updates based on dependencies. Use computed() for derived state.</p>
          </div>

          <div class="concept-card">
            <h3>Effect</h3>
            <p>A side effect function that runs when signal dependencies change. Use effect() for side effects.</p>
          </div>

          <div class="concept-card">
            <h3>Update</h3>
            <p>Modify signal state using .update() for deriving new state from old state.</p>
          </div>

          <div class="concept-card">
            <h3>asReadonly</h3>
            <p>Create a read-only version of a signal using .asReadonly() to prevent accidental mutations.</p>
          </div>

          <div class="concept-card">
            <h3>Signal Equality</h3>
            <p>By default, signals use reference equality. Use equal option to customize comparison.</p>
          </div>
        </div>
      </section>

      <section class="best-practices-section">
        <h2>🎯 Best Practices</h2>
        
        <ul class="practices-list">
          <li><strong>Use signals for UI state:</strong> Form values, filters, UI toggles</li>
          <li><strong>Use computed for derived state:</strong> Filtered lists, counts, transformations</li>
          <li><strong>Keep effects minimal:</strong> Use for side effects like logging, API calls</li>
          <li><strong>Avoid nested signals:</strong> Use computed instead for complex state</li>
          <li><strong>Leverage caching:</strong> Computed signals cache results until dependencies change</li>
          <li><strong>Use asReadonly():</strong> Make signals read-only when passing to other components</li>
          <li><strong>Combine with services:</strong> Create signal-based services for global state</li>
          <li><strong>Test signal logic:</strong> Signals are testable and don't require RxJS knowledge</li>
        </ul>
      </section>

      <section class="advantages-section">
        <h2>⭐ Advantages of Signals</h2>
        
        <div class="advantages-grid">
          <div class="advantage-card">
            <h3>Fine-grained Reactivity</h3>
            <p>Updates only affected parts of your application, not the entire component tree</p>
          </div>

          <div class="advantage-card">
            <h3>Zero-dependency</h3>
            <p>No need to learn RxJS or manage subscriptions manually</p>
          </div>

          <div class="advantage-card">
            <h3>Simple API</h3>
            <p>Easy to understand and use with straightforward signal() and computed() functions</p>
          </div>

          <div class="advantage-card">
            <h3>Better Performance</h3>
            <p>Automatic change detection optimization with OnPush strategy</p>
          </div>

          <div class="advantage-card">
            <h3>Composable</h3>
            <p>Combine multiple signals and computed values for complex state logic</p>
          </div>

          <div class="advantage-card">
            <h3>Developer Experience</h3>
            <p>Better IDE support, type safety, and easier debugging</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrl: './state-management-demo.component.scss'
})
export class StateManagementDemoComponent {
  // Signals for state management
  todos = signal<Todo[]>([
    { id: 1, title: 'Learn Angular Signals', completed: true },
    { id: 2, title: 'Understand State Management', completed: false },
    { id: 3, title: 'Build a Todo App', completed: false }
  ]);

  newTodoTitle = signal('');
  filter = signal<'all' | 'active' | 'completed'>('all');

  // Computed signals - automatically update when dependencies change
  completedCount = computed(() => 
    this.todos().filter(t => t.completed).length
  );

  activeCount = computed(() => 
    this.todos().filter(t => !t.completed).length
  );

  filteredTodos = computed(() => {
    const allTodos = this.todos();
    switch (this.filter()) {
      case 'active':
        return allTodos.filter(t => !t.completed);
      case 'completed':
        return allTodos.filter(t => t.completed);
      default:
        return allTodos;
    }
  });

  totalTodos = computed(() => this.todos().length);

  constructor() {
    // effect - runs whenever dependencies change
    effect(() => {
      const completed = this.completedCount();
      const total = this.totalTodos();
      if (total > 0) {
        const percentage = (completed / total) * 100;
        console.log(`Progress: ${percentage.toFixed(0)}% (${completed}/${total} completed)`);
      }
    });
  }

  addTodo(title: string): void {
    if (title.trim()) {
      const newId = Math.max(0, ...this.todos().map(t => t.id)) + 1;
      this.todos.update(todos => [
        ...todos,
        { id: newId, title: title.trim(), completed: false }
      ]);
      this.newTodoTitle.set('');
    }
  }

  removeTodo(id: number): void {
    this.todos.update(todos => todos.filter(t => t.id !== id));
  }

  toggleComplete(id: number): void {
    this.todos.update(todos =>
      todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  setFilter(newFilter: any): void {
    if (newFilter === 'all' || newFilter === 'active' || newFilter === 'completed') {
      this.filter.set(newFilter);
    }
  }
}
