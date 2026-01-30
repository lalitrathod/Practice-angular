import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testing-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testing-demo.component.html',
  styleUrl: './testing-demo.component.scss'
})
export class TestingDemoComponent {
  codeExamples = {
    basicTest: `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Title');
  });
});`,

    serviceTest: `import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should fetch users', () => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
  });
});`,

    componentWithInput: `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GreeterComponent } from './greeter.component';

describe('GreeterComponent', () => {
  let component: GreeterComponent;
  let fixture: ComponentFixture<GreeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreeterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GreeterComponent);
    component = fixture.componentInstance;
  });

  it('should greet user with input name', () => {
    component.name = 'Alice';
    fixture.detectChanges();

    const greeting = fixture.nativeElement.textContent;
    expect(greeting).toContain('Hello, Alice!');
  });

  it('should update greeting when name changes', () => {
    component.name = 'Bob';
    fixture.detectChanges();

    let greeting = fixture.nativeElement.textContent;
    expect(greeting).toContain('Hello, Bob!');

    component.name = 'Charlie';
    fixture.detectChanges();

    greeting = fixture.nativeElement.textContent;
    expect(greeting).toContain('Hello, Charlie!');
  });
});`,

    signalTest: `import { signal, computed, effect } from '@angular/core';

describe('Signals', () => {
  it('should create and update signal', () => {
    const count = signal(0);
    expect(count()).toBe(0);

    count.set(5);
    expect(count()).toBe(5);
  });

  it('should compute derived value', () => {
    const count = signal(3);
    const doubled = computed(() => count() * 2);

    expect(doubled()).toBe(6);

    count.set(5);
    expect(doubled()).toBe(10);
  });

  it('should run effect when signal changes', () => {
    const count = signal(0);
    let effectRuns = 0;

    effect(() => {
      count();
      effectRuns++;
    });

    expect(effectRuns).toBe(1);
    count.set(1);
    expect(effectRuns).toBe(2);
  });
});`,

    e2eTest: `// Using Cypress for E2E testing
describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('should load dashboard', () => {
    cy.get('h1').should('contain', 'Dashboard');
  });

  it('should add todo item', () => {
    cy.get('input[placeholder="Add todo"]').type('Learn Cypress');
    cy.get('button').contains('Add').click();
    
    cy.get('.todo-list').should('contain', 'Learn Cypress');
  });

  it('should complete todo', () => {
    cy.get('.todo-item').first().find('input[type="checkbox"]').click();
    cy.get('.todo-item').first().should('have.class', 'completed');
  });

  it('should delete todo', () => {
    cy.get('.todo-item').first().find('.delete-btn').click();
    cy.get('.todo-item').should('have.length', 2);
  });
});`,

    mockingService: `import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

// Mock service for testing
@Injectable({ providedIn: 'root' })
export class MockUserService {
  private users = signal([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ]);

  getUsers = () => this.users().slice();
  addUser = (user: any) => {
    this.users.update(users => [...users, user]);
  };
}

describe('Component with Mock Service', () => {
  it('should use mock service', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    });

    const service = TestBed.inject(UserService);
    expect(service.getUsers().length).toBe(2);
  });
});`
  };
}
