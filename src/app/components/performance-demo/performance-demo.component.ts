import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance-demo',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="performance-container">
      <h1>⚡ Performance Optimization</h1>
      
      <p class="intro-text">
        Performance is crucial for user experience. Learn techniques to optimize change detection, reduce bundle size, improve rendering speed, and monitor performance metrics.
      </p>

      <section class="demo-section">
        <h2>Interactive Performance Demo</h2>
        <div class="demo-app">
          <div class="controls">
            <div class="control-group">
              <label>
                Items: {{ itemCount() }}
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  [value]="itemCount()"
                  (change)="itemCount.set($any($event.target).value)">
              </label>
            </div>

            <div class="control-group">
              <label>
                Track By Method:
                <select 
                  [value]="trackByMethod()"
                  (change)="trackByMethod.set($any($event.target).value)">
                  <option value="index">By Index (slowest)</option>
                  <option value="id">By ID (recommended)</option>
                  <option value="email">By Email</option>
                </select>
              </label>
            </div>
          </div>

          <div class="list-container">
            <h3>Item List {{ trackByMethod() === 'index' ? '⚠️ Inefficient' : '✓ Optimized' }}</h3>
            <div class="items-list">
              <div class="item" *ngFor="let item of items()">
                <div class="item-header">
                  <span class="item-id">#{{ item.id }}</span>
                  <span class="item-name">{{ item.name }}</span>
                </div>
                <div class="item-content">
                  <p class="item-email">{{ item.email }}</p>
                  <p class="item-description">{{ item.description }}</p>
                </div>
              </div>
            </div>
            <div class="list-info">
              Rendered items: {{ items().length }}
              <span *ngIf="trackByMethod() === 'index'" class="warning">
                ⚠️ Using index - causes full re-render
              </span>
              <span *ngIf="trackByMethod() !== 'index'" class="success">
                ✓ Using stable ID - reuses DOM nodes
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="techniques-section">
        <h2>🎯 Performance Techniques</h2>
        
        <div class="techniques-grid">
          <div class="technique-card">
            <div class="technique-icon">🔍</div>
            <h3>OnPush Change Detection</h3>
            <p>Only run change detection when inputs change or events fire.</p>
            <ul>
              <li>Use for presentational components</li>
              <li>Combine with immutable data</li>
              <li>Reduces overhead significantly</li>
            </ul>
          </div>

          <div class="technique-card">
            <div class="technique-icon">📋</div>
            <h3>TrackBy in *ngFor</h3>
            <p>Tell Angular how to identify items in lists.</p>
            <ul>
              <li>Use unique property (ID)</li>
              <li>Avoid using index</li>
              <li>Huge perf boost for large lists</li>
            </ul>
          </div>

          <div class="technique-card">
            <div class="technique-icon">📦</div>
            <h3>Lazy Loading</h3>
            <p>Load feature modules only when needed.</p>
            <ul>
              <li>Lazy load routes</li>
              <li>Load components dynamically</li>
              <li>Code splitting strategies</li>
            </ul>
          </div>

          <div class="technique-card">
            <div class="technique-icon">🔗</div>
            <h3>Signal-based State</h3>
            <p>Use Signals instead of Observables for simpler state management.</p>
            <ul>
              <li>Fine-grained reactivity</li>
              <li>Automatic caching</li>
              <li>No subscription overhead</li>
            </ul>
          </div>

          <div class="technique-card">
            <div class="technique-icon">🧠</div>
            <h3>Memory Management</h3>
            <p>Prevent memory leaks by properly cleaning up.</p>
            <ul>
              <li>Unsubscribe in ngOnDestroy</li>
              <li>Use takeUntil operator</li>
              <li>Clear intervals/timeouts</li>
            </ul>
          </div>

          <div class="technique-card">
            <div class="technique-icon">📊</div>
            <h3>Bundle Analysis</h3>
            <p>Monitor and optimize bundle size.</p>
            <ul>
              <li>Use webpack-bundle-analyzer</li>
              <li>Tree-shake unused code</li>
              <li>Monitor dependencies</li>
            </ul>
          </div>

          <div class="technique-card">
            <div class="technique-icon">🖼️</div>
            <h3>Image Optimization</h3>
            <p>Optimize images for web with responsive techniques.</p>
            <ul>
              <li>Use NgSrc directive</li>
              <li>Lazy load images</li>
              <li>WebP format support</li>
            </ul>
          </div>

          <div class="technique-card">
            <div class="technique-icon">📈</div>
            <h3>Performance Monitoring</h3>
            <p>Track performance metrics and identify bottlenecks.</p>
            <ul>
              <li>Use Chrome DevTools</li>
              <li>Monitor Core Web Vitals</li>
              <li>Profile change detection</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="metrics-section">
        <h2>📊 Performance Metrics</h2>
        
        <div class="metrics-grid">
          <div class="metric-card">
            <h3>Core Web Vitals</h3>
            <ul>
              <li><strong>LCP:</strong> Largest Contentful Paint (less than 2.5s)</li>
              <li><strong>FID:</strong> First Input Delay (less than 100ms)</li>
              <li><strong>CLS:</strong> Cumulative Layout Shift (less than 0.1)</li>
            </ul>
          </div>

          <div class="metric-card">
            <h3>Bundle Metrics</h3>
            <ul>
              <li><strong>Main Bundle:</strong> Keep under 150KB</li>
              <li><strong>Lazy Bundle:</strong> Each under 100KB</li>
              <li><strong>Gzip Size:</strong> Measure gzipped size</li>
            </ul>
          </div>

          <div class="metric-card">
            <h3>Runtime Metrics</h3>
            <ul>
              <li><strong>TTI:</strong> Time to Interactive</li>
              <li><strong>FCP:</strong> First Contentful Paint</li>
              <li><strong>FMP:</strong> First Meaningful Paint</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="best-practices-section">
        <h2>🎯 Best Practices</h2>
        
        <ul class="practices-list">
          <li><strong>Use OnPush by default:</strong> Switch to Default only if necessary</li>
          <li><strong>Always use trackBy:</strong> Essential for lists with dynamic content</li>
          <li><strong>Lazy load features:</strong> Reduce initial bundle size</li>
          <li><strong>Prefer Signals:</strong> Better performance than RxJS for state</li>
          <li><strong>Monitor bundle size:</strong> Track size in CI/CD pipeline</li>
          <li><strong>Optimize images:</strong> Use responsive images and lazy loading</li>
          <li><strong>Clean up subscriptions:</strong> Prevent memory leaks</li>
          <li><strong>Profile regularly:</strong> Use Chrome DevTools Performance tab</li>
          <li><strong>Test on slow devices:</strong> Ensure good performance everywhere</li>
          <li><strong>Use service workers:</strong> Cache assets for offline support</li>
        </ul>
      </section>
    </div>
  `,
  styleUrl: './performance-demo.component.scss'
})
export class PerformanceDemoComponent {
  renderCount = signal(0);
  itemCount = signal(5);
  trackByMethod = signal<'index' | 'id' | 'email'>('index');

  items = computed(() => {
    const count = this.itemCount();
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      email: `item${i + 1}@example.com`,
      description: `This is item number ${i + 1} in the list`
    }));
  });
}
