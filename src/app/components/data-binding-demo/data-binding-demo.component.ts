import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-binding-demo.component.html',
  styleUrl: './data-binding-demo.component.scss'
})
export class DataBindingDemoComponent {
  // Interpolation examples
  title = 'Data Binding in Angular';
  currentDate = new Date();
  price = 99.99;
  
  // Property binding
  imageUrl = 'https://angular.dev/assets/images/logos/angular/angular.svg';
  buttonDisabled = false;
  inputValue = '';
  
  // Event binding
  clickCount = 0;
  mousePosition = { x: 0, y: 0 };
  
  // Two-way binding
  userName = signal('');
  email = signal('');
  selectedColor = signal('blue');
  
  // Class and style binding
  isHighlighted = false;
  fontSize = 16;
  
  // Calculator for two-way binding demo
  num1 = signal(0);
  num2 = signal(0);
  result = signal(0);

  onButtonClick(): void {
    this.clickCount++;
    alert(`Button clicked ${this.clickCount} times!`);
  }

  onMouseMove(event: MouseEvent): void {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

  calculate(): void {
    this.result.set(this.num1() + this.num2());
  }

  toggleHighlight(): void {
    this.isHighlighted = !this.isHighlighted;
  }

  increaseFont(): void {
    this.fontSize += 2;
  }

  decreaseFont(): void {
    this.fontSize -= 2;
  }
}
