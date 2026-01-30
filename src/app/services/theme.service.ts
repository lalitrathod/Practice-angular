import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export const DEFAULT_THEME: Theme = {
  name: 'light',
  primary: '#007bff',
  secondary: '#6c757d',
  accent: '#ffc107',
  background: '#ffffff',
  text: '#212529',
  border: '#dee2e6',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
  info: '#17a2b8'
};

export const DARK_THEME: Theme = {
  name: 'dark',
  primary: '#0d6efd',
  secondary: '#6c757d',
  accent: '#ffc107',
  background: '#212529',
  text: '#e9ecef',
  border: '#495057',
  success: '#198754',
  warning: '#ffc107',
  error: '#dc3545',
  info: '#0dcaf0'
};

export const BLUE_THEME: Theme = {
  name: 'blue',
  primary: '#004085',
  secondary: '#4373c3',
  accent: '#5cb3ff',
  background: '#f8f9fa',
  text: '#003366',
  border: '#cfe2ff',
  success: '#0c5460',
  warning: '#856404',
  error: '#721c24',
  info: '#0c5460'
};

export const PURPLE_THEME: Theme = {
  name: 'purple',
  primary: '#6f42c1',
  secondary: '#9b59b6',
  accent: '#e056fd',
  background: '#f8f9fa',
  text: '#4a235a',
  border: '#e8daef',
  success: '#1e8449',
  warning: '#b7950b',
  error: '#a93226',
  info: '#1f618d'
};

export const GREEN_THEME: Theme = {
  name: 'green',
  primary: '#28a745',
  secondary: '#20c997',
  accent: '#82e0aa',
  background: '#f8f9fa',
  text: '#0b5345',
  border: '#d4edda',
  success: '#155724',
  warning: '#856404',
  error: '#721c24',
  info: '#0c5460'
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private currentTheme = signal<Theme>(this.loadTheme());
  
  themes = [
    DEFAULT_THEME,
    DARK_THEME,
    BLUE_THEME,
    PURPLE_THEME,
    GREEN_THEME
  ];

  theme$ = this.currentTheme.asReadonly();

  constructor() {
    // Only apply theme in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme(this.currentTheme());
    }
  }

  private loadTheme(): Theme {
    // Check if we're in a browser environment before accessing localStorage
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('app-theme');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_THEME;
        }
      }
    }
    return DEFAULT_THEME;
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.applyTheme(theme);
    // Only save to localStorage in browser environment
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('app-theme', JSON.stringify(theme));
    }
  }

  setThemeByName(themeName: string): void {
    const theme = this.themes.find(t => t.name === themeName);
    if (theme) {
      this.setTheme(theme);
    }
  }

  private applyTheme(theme: Theme): void {
    // Only apply theme to DOM in browser environment
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      root.style.setProperty('--color-primary', theme.primary);
      root.style.setProperty('--color-secondary', theme.secondary);
      root.style.setProperty('--color-accent', theme.accent);
      root.style.setProperty('--color-background', theme.background);
      root.style.setProperty('--color-text', theme.text);
      root.style.setProperty('--color-border', theme.border);
      root.style.setProperty('--color-success', theme.success);
      root.style.setProperty('--color-warning', theme.warning);
      root.style.setProperty('--color-error', theme.error);
      root.style.setProperty('--color-info', theme.info);
    }
  }

  getCurrentTheme(): Theme {
    return this.currentTheme();
  }

  getThemes(): Theme[] {
    return this.themes;
  }

  // Create custom theme
  createCustomTheme(name: string, colors: Partial<Theme>): Theme {
    const customTheme: Theme = {
      ...DEFAULT_THEME,
      ...colors,
      name
    };
    return customTheme;
  }
}
