import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-route-guards-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './route-guards-demo.component.html',
  styleUrl: './route-guards-demo.component.scss'
})
export class RouteGuardsDemoComponent {
  // User authentication state
  isAuthenticated = false;
  hasAdminRole = false;
  userRole = 'guest';

  codeExamples = {
    canActivateGuard: `// canActivate - Controls access to a route
import { Injectable } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

// Using the guard in routes:
const routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  }
];`,

    canDeactivateGuard: `// canDeactivate - Prevents navigation with unsaved changes
import { Injectable } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<any> = (component) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};

// In component:
export class FormComponent implements CanComponentDeactivate {
  isDirty = false;

  canDeactivate(): boolean {
    return !this.isDirty || confirm(
      'You have unsaved changes. Do you want to leave?'
    );
  }
}`,

    canMatchGuard: `// canMatch - Routes are only matched if guard returns true
import { CanMatchFn } from '@angular/router';

export const featureFlagGuard: CanMatchFn = (route) => {
  const featureFlags = {
    'admin-panel': true,
    'beta-features': false
  };

  return featureFlags[route.path] ?? false;
};

// Routes only match if feature is enabled:
const routes = [
  {
    path: 'admin',
    canMatch: [featureFlagGuard],
    loadComponent: () => import('./admin.component')
  }
];`,

    resolverGuard: `// Resolve - Pre-fetch data before navigation
import { Injectable } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from './user.service';

export const userResolver: ResolveFn<User> = (route) => {
  const userId = route.paramMap.get('id')!;
  return inject(UserService).getUser(userId);
};

// Routes with resolver:
const routes = [
  {
    path: 'user/:id',
    component: UserDetailComponent,
    resolve: { user: userResolver }
  }
];

// In component, access resolved data:
export class UserDetailComponent {
  user = inject(ActivatedRoute).data.pipe(map(data => data.user));
}`,

    guardComposition: `// Combining multiple guards
const routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, roleGuard, featureFlagGuard]
  }
];

// All guards must return true for navigation to succeed
// Guards are evaluated left to right
// First false or rejected promise stops navigation`,

    functionGuard: `// Modern Functional Guards (Angular 14.2+)
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

// Use in routes:
const routes = [
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin.component')
  }
];`
  };
}
