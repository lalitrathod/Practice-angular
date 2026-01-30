import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-routing-demo',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './routing-demo.component.html',
  styleUrl: './routing-demo.component.scss'
})
export class RoutingDemoComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Get route parameters
  routeParams: any = {};
  queryParams: any = {};
  fragment: string | null = null;

  constructor() {
    // Subscribe to route params
    this.route.params.subscribe(params => {
      this.routeParams = params;
    });

    // Subscribe to query params
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });

    // Subscribe to fragment
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
  }

  // Programmatic Navigation
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateWithParams(): void {
    this.router.navigate(['/learn/routing', '123']);
  }

  navigateWithQueryParams(): void {
    const queryParams: NavigationExtras = {
      queryParams: { page: 1, sort: 'name' }
    };
    this.router.navigate(['/learn/routing'], queryParams);
  }

  navigateWithFragment(): void {
    this.router.navigate(['/learn/routing'], { fragment: 'section1' });
  }

  navigateWithState(): void {
    this.router.navigate(['/learn/routing'], {
      state: { data: 'This is state data' }
    });
  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }
}
