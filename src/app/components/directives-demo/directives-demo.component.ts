import { Component, Directive, ElementRef, Renderer2, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Custom Highlight Directive
@Directive({
  selector: '[appHighlight]',
  standalone: true,
  host: {
    '[style.transition]': "'background-color 0.3s ease'",
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  @Input() defaultColor = 'transparent';
  
  private originalColor: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Set default background color
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.defaultColor);
  }

  ngOnChanges(): void {
    // Apply highlight color whenever input changes
    if (this.appHighlight) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', this.appHighlight);
      this.originalColor = this.appHighlight;
    }
  }

  onMouseEnter(): void {
    // Make it slightly darker on hover
    const darkerColor = this.adjustBrightness(this.appHighlight, -20);
    this.renderer.setStyle(this.el.nativeElement, 'background-color', darkerColor);
  }

  onMouseLeave(): void {
    // Return to original color
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.originalColor);
  }

  // Helper method to adjust color brightness
  private adjustBrightness(color: string, percent: number): string {
    // Simple brightness adjustment for hex colors
    if (color.startsWith('#')) {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.max(0, Math.min(255, (num >> 16) + amt));
      const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
      const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
      return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
    }
    return color; // Return as-is if not hex
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
