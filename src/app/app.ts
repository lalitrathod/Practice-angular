import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ThemeSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('Angular Learning Hub');
  protected readonly navItems = signal<NavItem[]>([
    { label: 'Dashboard', route: '/' },
    { label: 'Components', route: '/learn/components' },
    { label: 'Signals', route: '/learn/signals' },
    { label: 'Services', route: '/learn/services' },
    { label: 'Routing', route: '/learn/routing' },
    { label: 'HTTP', route: '/learn/http' },
    { label: 'Interview Prep', route: '/learn/interview' }
  ]);
}

