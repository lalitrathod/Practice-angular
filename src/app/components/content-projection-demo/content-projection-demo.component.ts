import { Component, ContentChild, ViewChild, TemplateRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Card component with content projection
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header" *ngIf="header">
        <ng-container *ngTemplateOutlet="header"></ng-container>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer" *ngIf="footer">
        <ng-container *ngTemplateOutlet="footer"></ng-container>
      </div>
    </div>
  `,
  styles: [`
    .card { border: 1px solid #ddd; border-radius: 6px; overflow: hidden; margin: 10px 0; }
    .card-header { padding: 15px; background-color: #f5f5f5; border-bottom: 1px solid #ddd; }
    .card-body { padding: 15px; }
    .card-footer { padding: 15px; background-color: #f9f9f9; border-top: 1px solid #ddd; }
  `]
})
export class CardComponent {
  @ContentChild('header') header: TemplateRef<any> | undefined;
  @ContentChild('footer') footer: TemplateRef<any> | undefined;
}

// Tabs component with view children
@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tab-content" *ngIf="selected">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tab-content { padding: 15px; }
  `]
})
export class TabComponent {
  @ViewChild('tabLabel') tabLabel: TemplateRef<any> | undefined;
  label: string = '';
  selected = false;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs">
      <div class="tab-labels">
        <button 
          *ngFor="let tab of tabs() as tabList; let i = index"
          [class.active]="selectedTab() === i"
          (click)="selectTab(i)">
          {{ tab.label }}
        </button>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tabs { border: 1px solid #ddd; border-radius: 6px; }
    .tab-labels { display: flex; background-color: #f5f5f5; border-bottom: 1px solid #ddd; }
    button { flex: 1; padding: 12px; border: none; background: none; cursor: pointer; border-bottom: 3px solid transparent; }
    button.active { border-bottom-color: #007bff; color: #007bff; font-weight: bold; }
    button:hover { background-color: #f0f0f0; }
  `]
})
export class TabsComponent {
  @ViewChild('tabs') tabsContainer: any;
  tabs = signal<TabComponent[]>([]);
  selectedTab = signal(0);

  ngAfterContentInit() {
    // Simulating ViewChildren functionality
    console.log('Tabs initialized');
  }

  selectTab(index: number) {
    this.selectedTab.set(index);
  }
}

// Accordion component with named slots
@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="accordion-item">
      <div class="accordion-header" (click)="toggle()">
        <span>{{ title }}</span>
        <span class="toggle">{{ expanded ? '▼' : '▶' }}</span>
      </div>
      <div class="accordion-content" *ngIf="expanded">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .accordion-item { border: 1px solid #ddd; margin: 5px 0; }
    .accordion-header { padding: 15px; background-color: #f5f5f5; cursor: pointer; display: flex; justify-content: space-between; }
    .accordion-header:hover { background-color: #efefef; }
    .accordion-content { padding: 15px; background-color: #fff; }
    .toggle { font-size: 12px; }
  `]
})
export class AccordionItemComponent {
  title = '';
  expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }
}

@Component({
  selector: 'app-content-projection-demo',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './content-projection-demo.component.html',
  styleUrl: './content-projection-demo.component.scss'
})
export class ContentProjectionDemoComponent {
  examples = signal<any[]>([]);

  ngOnInit() {
    this.loadExamples();
  }

  loadExamples() {
    this.examples.set([
      {
        name: 'Single Slot Projection',
        description: 'Project any content into ng-content',
        code: `
@Component({
  selector: 'app-card',
  template: \`<div class="card"><ng-content></ng-content></div>\`
})
export class CardComponent {{ '{' }}{{ '}' }}

// Usage:
<app-card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</app-card>
        `
      },
      {
        name: 'Named Slots',
        description: 'Project content into specific named slots',
        code: `
@Component({
  template: \`
    <div class="card">
      <ng-content select="[header]"></ng-content>
      <ng-content></ng-content>
      <ng-content select="[footer]"></ng-content>
    </div>
  \`
})
export class CardComponent {{ '{' }}{{ '}' }}

// Usage:
<app-card>
  <div header>Header Content</div>
  <p>Main content</p>
  <div footer>Footer Content</div>
</app-card>
        `
      },
      {
        name: '@ViewChild Query',
        description: 'Query child components in the template',
        code: `
@Component({
  selector: 'app-tabs',
  template: \`<div><ng-content></ng-content></div>\`
})
export class TabsComponent {
  @ViewChild(TabComponent) activeTab: TabComponent | undefined;
  
  ngAfterViewInit() {
    console.log(this.activeTab);
  }
}
        `
      },
      {
        name: '@ContentChild Query',
        description: 'Query projected content',
        code: `
@Component({
  selector: 'app-card',
  template: \`
    <div class="card">
      <ng-content></ng-content>
    </div>
  \`
})
export class CardComponent {
  @ContentChild(HeaderComponent) header: HeaderComponent | undefined;
}
        `
      }
    ]);
  }
}
