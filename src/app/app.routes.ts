import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/learning-dashboard/learning-dashboard.component').then(m => m.LearningDashboardComponent)
  },
  {
    path: 'learn/components',
    loadComponent: () => import('./components/components-demo/components-demo.component').then(m => m.ComponentsDemoComponent)
  },
  {
    path: 'learn/data-binding',
    loadComponent: () => import('./components/data-binding-demo/data-binding-demo.component').then(m => m.DataBindingDemoComponent)
  },
  {
    path: 'learn/directives',
    loadComponent: () => import('./components/directives-demo/directives-demo.component').then(m => m.DirectivesDemoComponent)
  },
  {
    path: 'learn/pipes',
    loadComponent: () => import('./components/pipes-demo/pipes-demo.component').then(m => m.PipesDemoComponent)
  },
  {
    path: 'learn/signals',
    loadComponent: () => import('./components/signals-demo/signals-demo.component').then(m => m.SignalsDemoComponent)
  },
  {
    path: 'learn/services',
    loadComponent: () => import('./components/services-demo/services-demo.component').then(m => m.ServicesDemoComponent)
  },
  {
    path: 'learn/routing',
    loadComponent: () => import('./components/routing-demo/routing-demo.component').then(m => m.RoutingDemoComponent)
  },
  {
    path: 'learn/forms',
    loadComponent: () => import('./components/forms-demo/forms-demo.component').then(m => m.FormsDemoComponent)
  },
  {
    path: 'learn/http',
    loadComponent: () => import('./components/http-demo/http-demo.component').then(m => m.HttpDemoComponent)
  },
  {
    path: 'learn/rxjs',
    loadComponent: () => import('./components/rxjs-demo/rxjs-demo.component').then(m => m.RxjsDemoComponent)
  },
  {
    path: 'learn/decorators',
    loadComponent: () => import('./components/decorators-demo/decorators-demo.component').then(m => m.DecoratorsDemoComponent)
  },
  {
    path: 'learn/change-detection',
    loadComponent: () => import('./components/change-detection-demo/change-detection-demo.component').then(m => m.ChangeDetectionDemoComponent)
  },
  {
    path: 'learn/content-projection',
    loadComponent: () => import('./components/content-projection-demo/content-projection-demo.component').then(m => m.ContentProjectionDemoComponent)
  },
  {
    path: 'learn/state',
    loadComponent: () => import('./components/state-management-demo/state-management-demo.component').then(m => m.StateManagementDemoComponent)
  },
  {
    path: 'learn/guards',
    loadComponent: () => import('./components/route-guards-demo/route-guards-demo.component').then(m => m.RouteGuardsDemoComponent)
  },
  {
    path: 'learn/performance',
    loadComponent: () => import('./components/performance-demo/performance-demo.component').then(m => m.PerformanceDemoComponent)
  },
  {
    path: 'learn/testing',
    loadComponent: () => import('./components/testing-demo/testing-demo.component').then(m => m.TestingDemoComponent)
  },
  {
    path: 'learn/interview',
    loadComponent: () => import('./components/interview-prep/interview-prep.component').then(m => m.InterviewPrepComponent)
  }
];
