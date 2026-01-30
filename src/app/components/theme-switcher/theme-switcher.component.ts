import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-switcher-compact">
      <button 
        class="theme-toggle"
        (click)="toggleThemeMenu()"
        title="Change Theme">
        🎨
      </button>
      
      @if (showMenu) {
        <div class="theme-menu">
          <button 
            *ngFor="let theme of themes"
            [class.active]="isActiveTheme(theme)"
            (click)="selectTheme(theme)"
            class="theme-option"
            [style.--theme-color]="theme.primary">
            <span class="color-dot" [style.background-color]="theme.primary"></span>
            <span>{{ theme.name | titlecase }}</span>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .theme-switcher-compact {
      position: relative;
    }

    .theme-toggle {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 36px;
      height: 36px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1.1rem;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .theme-toggle:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .theme-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 8px;
      background: var(--color-background);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 8px;
      z-index: 1000;
      min-width: 150px;
    }

    .theme-option {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 12px;
      border: none;
      background: transparent;
      color: var(--color-text);
      cursor: pointer;
      border-radius: 6px;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      text-align: left;
    }

    .theme-option:hover {
      background: var(--color-primary);
      color: white;
    }

    .theme-option.active {
      background: var(--color-primary);
      color: white;
      font-weight: 600;
    }

    .color-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `]
})
export class ThemeSwitcherComponent implements OnInit {
  private themeService = inject(ThemeService);
  themes: Theme[] = [];
  showMenu = false;

  ngOnInit() {
    this.themes = this.themeService.getThemes();
  }

  isActiveTheme(theme: Theme): boolean {
    return this.themeService.getCurrentTheme().name === theme.name;
  }

  selectTheme(theme: Theme) {
    this.themeService.setTheme(theme);
    this.showMenu = false;
  }

  toggleThemeMenu() {
    this.showMenu = !this.showMenu;
  }
}
