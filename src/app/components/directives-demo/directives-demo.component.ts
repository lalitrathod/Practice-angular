import { Component, Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Custom Highlight Directive
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight = 'yellow';
  @Input() defaultColor = 'transparent';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.defaultColor);
  }

  @Input() set highlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}

@Component({
  selector: 'app-directives-demo',
  standalone: true,
  imports: [CommonModule, HighlightDirective, FormsModule],
  templateUrl: './directives-demo.component.html',
  styleUrl: './directives-demo.component.scss'
})
export class DirectivesDemoComponent {
  // *ngIf examples
  showMessage = true;
  userRole = 'admin';
  
  // *ngFor examples
  items = ['Apple', 'Banana', 'Cherry', 'Date'];
  users = [
    { id: 1, name: 'Lalit', age: 25, role: 'Developer' },
    { id: 2, name: 'John', age: 30, role: 'Designer' },
    { id: 3, name: 'Jane', age: 28, role: 'Manager' }
  ];
  
  // *ngSwitch examples
  selectedView = 'list';
  
  // ngClass examples
  isActive = true;
  isDisabled = false;
  status = 'success';
  
  // ngStyle examples
  fontSize = 16;
  textColor = 'blue';
  
  // Custom directive
  highlightColor = 'yellow';

  toggleMessage(): void {
    this.showMessage = !this.showMessage;
  }

  addItem(): void {
    this.items.push(`Item ${this.items.length + 1}`);
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }
}
