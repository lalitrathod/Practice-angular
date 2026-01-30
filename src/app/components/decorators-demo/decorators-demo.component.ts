import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom Property Decorator
export function Required(target: any, propertyKey: string) {
  let value: any;
  const getter = function() {
    return value;
  };
  const setter = function(newVal: any) {
    if (newVal === undefined || newVal === null) {
      throw new Error(`${propertyKey} is required!`);
    }
    value = newVal;
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

// Custom Method Decorator
export function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`${propertyKey} returned:`, result);
    return result;
  };
  return descriptor;
}

// Custom Class Decorator
export function Component_(config: any) {
  return function(target: any) {
    console.log('Component decorated:', target.name);
    target.prototype.componentName = config.name;
  };
}

// Custom Parameter Decorator
export function ValidateEmail(target: any, propertyKey: string | symbol, parameterIndex: number) {
  const metadata = target.__validate_email_params || [];
  metadata.push(parameterIndex);
  target.__validate_email_params = metadata;
}

class UserModel {
  @Required
  email: string = '';

  @Log
  validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

@Component({
  selector: 'app-decorators-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decorators-demo.component.html',
  styleUrl: './decorators-demo.component.scss'
})
export class DecoratorsDemoComponent implements OnInit {
  examples = signal<any[]>([]);
  userModel: UserModel = new UserModel();

  @Input() title: string = 'Decorators Demo';
  @Output() eventTriggered = new EventEmitter<string>();

  ngOnInit() {
    this.loadExamples();
  }

  loadExamples() {
    this.examples.set([
      {
        name: 'Property Decorator - @Required',
        description: 'Validates that a property is not null/undefined',
        example: 'Throws error if email is not provided',
        code: `
export function Required(target: any, propertyKey: string) {
  let value: any;
  const getter = () => value;
  const setter = (newVal: any) => {
    if (newVal === undefined || newVal === null) {
      throw new Error(\`\${propertyKey} is required!\`);
    }
    value = newVal;
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter
  });
}
        `
      },
      {
        name: 'Method Decorator - @Log',
        description: 'Logs method calls and returns',
        example: 'Logs method arguments and result',
        code: `
export function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${propertyKey} with:\`, args);
    const result = originalMethod.apply(this, args);
    console.log(\`\${propertyKey} returned:\`, result);
    return result;
  };
  return descriptor;
}
        `
      },
      {
        name: 'Class Decorator - @Component_',
        description: 'Adds metadata to a class',
        example: 'Decorates a class with component metadata',
        code: `
export function Component_(config: any) {
  return function(target: any) {
    console.log('Component decorated:', target.name);
    target.prototype.componentName = config.name;
  };
}
        `
      },
      {
        name: 'Parameter Decorator - @ValidateEmail',
        description: 'Marks parameters for validation',
        example: 'Marks email parameters for validation',
        code: `
export function ValidateEmail(target: any, propertyKey: string | symbol, parameterIndex: number) {
  const existingMetadata = Reflect.getOwnMetadata('validate:email', target, propertyKey) || [];
  existingMetadata.push(parameterIndex);
  Reflect.defineMetadata('validate:email', existingMetadata, target, propertyKey);
}
        `
      }
    ]);
  }

  testRequired() {
    try {
      this.userModel.email = '';
      alert('Email set successfully');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  }

  testLog() {
    const result = this.userModel.validateEmail('test@example.com');
    alert(`Email validation result: ${result}`);
  }

  emitEvent() {
    this.eventTriggered.emit('Decorator event triggered!');
  }
}
