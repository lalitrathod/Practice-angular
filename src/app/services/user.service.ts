import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root' // Singleton service - available app-wide
})
export class UserService {
  // Using signals for state management
  private users = signal<User[]>([
    { id: 1, name: 'Lalit Rathod', email: 'lalit@example.com', role: 'Admin' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'User' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ]);

  currentUser = signal<User | null>(null);

  // Get all users
  getUsers() {
    return this.users.asReadonly();
  }

  // Get user by ID
  getUserById(id: number): User | undefined {
    return this.users().find(user => user.id === id);
  }

  // Add user
  addUser(user: Omit<User, 'id'>): void {
    this.users.update((users: User[]) => {
      const newId = Math.max(...users.map((u: User) => u.id), 0) + 1;
      return [...users, { ...user, id: newId }];
    });
  }

  // Update user
  updateUser(id: number, updates: Partial<User>): void {
    this.users.update((users: User[]) => {
      const index = users.findIndex((u: User) => u.id === id);
      if (index > -1) {
        return users.map((u: User, i: number) => 
          i === index ? { ...u, ...updates } : u
        );
      }
      return users;
    });
  }

  // Delete user
  deleteUser(id: number): void {
    this.users.update((users: User[]) => {
      return users.filter((u: User) => u.id !== id);
    });
  }

  // Set current user
  setCurrentUser(user: User | null): void {
    this.currentUser.set(user);
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser.asReadonly();
  }
}

// Example of a service with providedIn: 'any' - creates new instance per lazy-loaded module
@Injectable({
  providedIn: 'any'
})
export class LoggerService {
  private logs: string[] = [];

  log(message: string): void {
    const timestamp = new Date().toISOString();
    this.logs.push(`[${timestamp}] ${message}`);
    console.log(`[LoggerService] ${message}`);
  }

  getLogs(): string[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

// Example of a service that needs to be provided in component
@Injectable()
export class LocalStorageService {
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
