import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signals-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signals-demo.component.html',
  styleUrl: './signals-demo.component.scss'
})
export class SignalsDemoComponent {
  // 1. BASIC SIGNALS (Writable Signals)
  // Creating signals with initial values
  count = signal(0);
  userName = signal('Lalit');
  isActive = signal(true);
  price = signal(99.99);
  
  // Array signal
  items = signal<string[]>(['Apple', 'Banana', 'Cherry']);
  
  // Object signal
  user = signal({
    id: 1,
    name: 'Lalit Rathod',
    email: 'lalit@example.com',
    age: 25
  });

  // 2. COMPUTED SIGNALS (Derived State)
  // Computed signals derive values from other signals
  doubleCount = computed(() => this.count() * 2);
  
  // Complex computed signal
  userInfo = computed(() => 
    `${this.userName()} is ${this.isActive() ? 'active' : 'inactive'}`
  );
  
  // Computed from multiple signals
  totalPrice = computed(() => {
    const basePrice = this.price();
    const discount = this.isActive() ? 0.1 : 0;
    return basePrice * (1 - discount);
  });
  
  // Computed array operations
  itemCount = computed(() => this.items().length);
  hasItems = computed(() => this.items().length > 0);
  
  // Computed from object signal
  userDisplay = computed(() => 
    `${this.user().name} (${this.user().age} years)`
  );

  // 3. SIGNAL EFFECTS
  // Effects run side effects when signals change
  constructor() {
    // Effect to log count changes
    effect(() => {
      console.log(`Count changed to: ${this.count()}`);
    });
    
    // Effect with multiple signals
    effect(() => {
      const name = this.userName();
      const active = this.isActive();
      console.log(`User ${name} status: ${active ? 'Active' : 'Inactive'}`);
    });
    
    // Effect with cleanup (for demo purposes)
    effect(() => {
      const count = this.count();
      if (count > 10) {
        console.warn('Count is getting high!');
      }
    });
  }

  // 4. SIGNAL UPDATE METHODS
  
  // set() - Replace the value
  resetCount(): void {
    this.count.set(0);
  }
  
  setUserName(name: string): void {
    this.userName.set(name);
  }

  // update() - Update based on current value
  incrementCount(): void {
    this.count.update(value => value + 1);
  }
  
  decrementCount(): void {
    this.count.update(value => value - 1);
  }
  
  toggleActive(): void {
    this.isActive.update(value => !value);
  }
  
  // update() - Update arrays in place
  addItem(item: string): void {
    this.items.update(items => [...items, item]);
  }
  
  removeItem(index: number): void {
    this.items.update(items => items.filter((_, i) => i !== index));
  }
  
  updateUserAge(age: number): void {
    this.user.update(user => ({
      ...user,
      age: age
    }));
  }
  
  updateUserProperty(key: string, value: any): void {
    this.user.update(user => ({
      ...user,
      [key]: value
    }));
  }

  // 5. ADVANCED SIGNAL OPERATIONS
  
  // Signal with async operations simulation
  loading = signal(false);
  data = signal<any>(null);
  
  async loadData(): Promise<void> {
    this.loading.set(true);
    // Simulate API call
    setTimeout(() => {
      this.data.set({ message: 'Data loaded!', timestamp: new Date() });
      this.loading.set(false);
    }, 1000);
  }
  
  // Signal-based counter with history
  history = signal<number[]>([]);
  
  incrementWithHistory(): void {
    this.count.update(value => {
      const newValue = value + 1;
      this.history.update(h => [...h, newValue]);
      return newValue;
    });
  }
  
  // Computed from history
  historyStats = computed(() => {
    const h = this.history();
    if (h.length === 0) return { sum: 0, avg: 0, max: 0, min: 0 };
    return {
      sum: h.reduce((a, b) => a + b, 0),
      avg: h.reduce((a, b) => a + b, 0) / h.length,
      max: Math.max(...h),
      min: Math.min(...h)
    };
  });

  // 6. SIGNAL IN FORMS
  formData = signal({
    name: '',
    email: '',
    age: 0
  });
  
  formValid = computed(() => {
    const data = this.formData();
    return data.name.length > 0 && 
           data.email.includes('@') && 
           data.age > 0;
  });
  
  updateFormField(field: string, value: any): void {
    this.formData.update(data => ({
      ...data,
      [field]: value
    }));
  }
  
  submitForm(): void {
    if (this.formValid()) {
      console.log('Form submitted:', this.formData());
      alert('Form submitted successfully!');
    }
  }

  // 7. SIGNAL-BASED STATE MANAGEMENT
  cart = signal<Array<{id: number, name: string, price: number, quantity: number}>>([]);
  
  addToCart(product: {id: number, name: string, price: number}): void {
    this.cart.update((cart) => {
      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      return cart;
    });
  }
  
  removeFromCart(id: number): void {
    this.cart.update((cart) => {
      const index = cart.findIndex((item) => item.id === id);
      if (index > -1) {
        cart.splice(index, 1);
      }
      return cart;
    });
  }
  
  cartTotal = computed(() => {
    return this.cart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  });
  
  cartItemCount = computed(() => {
    return this.cart().reduce((sum, item) => sum + item.quantity, 0);
  });
  
  // Sample products
  products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
  ];
}
