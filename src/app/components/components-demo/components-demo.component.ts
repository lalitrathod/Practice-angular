import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-components-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './components-demo.component.html',
  styleUrl: './components-demo.component.scss'
})
export class ComponentsDemoComponent implements OnInit, OnDestroy {
  // Signals (Angular 16+)
  userName = signal('Lalit');
  userAge = signal(25);
  isActive = signal(true);
  
  // Computed signal
  userInfo = computed(() => 
    `${this.userName()} is ${this.userAge()} years old and is ${this.isActive() ? 'active' : 'inactive'}`
  );

  // Traditional properties
  title = 'Components & Lifecycle Hooks';
  counter = 0;
  message = '';

  constructor() {
    console.log('1. Constructor called - Component is being created');
  }

  ngOnInit(): void {
    console.log('2. ngOnInit called - Component initialized');
    this.message = 'Component has been initialized!';
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called - Component is being destroyed');
  }

  incrementCounter(): void {
    this.counter++;
  }

  updateUser(): void {
    this.userName.set('Lalit Rathod');
    this.userAge.set(26);
  }

  toggleActive(): void {
    this.isActive.update(value => !value);
  }
}
