import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { LoggerService } from '../../services/user.service';
import { LocalStorageService } from '../../services/user.service';

@Component({
  selector: 'app-services-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // Example: Providing service at component level (creates new instance)
  providers: [LocalStorageService],
  templateUrl: './services-demo.component.html',
  styleUrl: './services-demo.component.scss'
})
export class ServicesDemoComponent {
  // Method 1: Using inject() function (Angular 14+)
  private userService = inject(UserService);
  private loggerService = inject(LoggerService);
  private localStorageService = inject(LocalStorageService);

  // Method 2: Using constructor injection (traditional way)
  // constructor(
  //   private userService: UserService,
  //   private loggerService: LoggerService
  // ) {}

  // Component state
  users = this.userService.getUsers();
  currentUser = this.userService.getCurrentUser();
  newUser = signal<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: 'User'
  });
  selectedUserId = signal<number | null>(null);

  constructor() {
    this.loggerService.log('ServicesDemoComponent initialized');
    this.loadFromLocalStorage();
  }

  // Form field update helpers
  updateNewUserField(field: string, value: any): void {
    this.newUser.update(user => ({
      ...user,
      [field]: value
    }));
  }

  // CRUD Operations
  addUser(): void {
    if (this.newUser().name && this.newUser().email) {
      this.userService.addUser(this.newUser());
      this.loggerService.log(`User added: ${this.newUser().name}`);
      this.newUser.set({ name: '', email: '', role: 'User' });
      this.saveToLocalStorage();
    }
  }

  updateUser(id: number): void {
    const user = this.userService.getUserById(id);
    if (user) {
      const newName = prompt('Enter new name:', user.name);
      if (newName) {
        this.userService.updateUser(id, { name: newName });
        this.loggerService.log(`User updated: ${id}`);
        this.saveToLocalStorage();
      }
    }
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id);
      this.loggerService.log(`User deleted: ${id}`);
      this.saveToLocalStorage();
    }
  }

  selectUser(user: User): void {
    this.userService.setCurrentUser(user);
    this.selectedUserId.set(user.id);
    this.loggerService.log(`User selected: ${user.name}`);
  }

  clearSelection(): void {
    this.userService.setCurrentUser(null);
    this.selectedUserId.set(null);
  }

  // LocalStorage operations
  saveToLocalStorage(): void {
    this.localStorageService.setItem('users', this.users());
  }

  loadFromLocalStorage(): void {
    const saved = this.localStorageService.getItem<User[]>('users');
    if (saved) {
      saved.forEach(user => {
        if (!this.userService.getUserById(user.id)) {
          this.userService.addUser(user);
        }
      });
    }
  }

  getLogs(): string[] {
    return this.loggerService.getLogs();
  }
}
