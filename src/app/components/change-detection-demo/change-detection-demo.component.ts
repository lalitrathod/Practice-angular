import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Item {
  id: number;
  name: string;
  value: number;
}

@Component({
  selector: 'app-change-detection-default',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="strategy-demo">
      <h4>Default Change Detection</h4>
      <p>{{ items().length }} items | Total: {{ total() }}</p>
      <button (click)="addItem()">Add Item</button>
      <p class="note">Updates on every event (checks entire component tree)</p>
    </div>
  `,
  styles: [`
    .strategy-demo { padding: 15px; border: 1px solid #ddd; margin: 10px 0; border-radius: 4px; }
    .note { color: #666; font-size: 12px; margin-top: 10px; }
  `]
})
export class ChangeDetectionDefaultComponent {
  items = signal<Item[]>([
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 }
  ]);

  total = computed(() => this.items().reduce((sum, item) => sum + item.value, 0));

  addItem() {
    const newId = Math.max(...this.items().map(i => i.id), 0) + 1;
    this.items.update(items => [...items, { id: newId, name: `Item ${newId}`, value: Math.random() * 1000 }]);
  }
}

@Component({
  selector: 'app-change-detection-onpush',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="strategy-demo">
      <h4>OnPush Change Detection</h4>
      <p>{{ items().length }} items | Total: {{ total() }}</p>
      <button (click)="addItem()">Add Item</button>
      <button (click)="manualDetection()">Manual Detection</button>
      <p class="note">Only updates on @Input change or events in this component</p>
    </div>
  `,
  styles: [`
    .strategy-demo { padding: 15px; border: 1px solid #ddd; margin: 10px 0; border-radius: 4px; background: #f0f8ff; }
    .note { color: #666; font-size: 12px; margin-top: 10px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionOnPushComponent {
  items = signal<Item[]>([
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 }
  ]);

  total = computed(() => this.items().reduce((sum, item) => sum + item.value, 0));

  constructor(private cdr: ChangeDetectorRef) {}

  addItem() {
    const newId = Math.max(...this.items().map(i => i.id), 0) + 1;
    this.items.update(items => [...items, { id: newId, name: `Item ${newId}`, value: Math.random() * 1000 }]);
    this.cdr.markForCheck();
  }

  manualDetection() {
    this.cdr.detectChanges();
    alert('Manual change detection triggered');
  }
}

@Component({
  selector: 'app-change-detection-demo',
  standalone: true,
  imports: [CommonModule, ChangeDetectionDefaultComponent, ChangeDetectionOnPushComponent],
  templateUrl: './change-detection-demo.component.html',
  styleUrl: './change-detection-demo.component.scss'
})
export class ChangeDetectionDemoComponent implements OnInit {
  detectionInfo = signal<any[]>([]);
  changeCount = signal(0);

  ngOnInit() {
    this.loadInfo();
  }

  loadInfo() {
    this.detectionInfo.set([
      {
        strategy: 'Default (CheckAlways)',
        description: 'Angular checks the component on every event',
        pros: ['Simple', 'Automatic updates'],
        cons: ['Performance issues with large apps', 'Checks entire tree'],
        useCase: 'Small to medium applications'
      },
      {
        strategy: 'OnPush',
        description: 'Angular only checks when @Input changes or events fire',
        pros: ['Better performance', 'Predictable updates', 'Explicit control'],
        cons: ['Requires manual intervention sometimes', 'More complex'],
        useCase: 'Large applications, performance-critical components'
      }
    ]);
  }

  simulateChange() {
    this.changeCount.update(count => count + 1);
  }
}
