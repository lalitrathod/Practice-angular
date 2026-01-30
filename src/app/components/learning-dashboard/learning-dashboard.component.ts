import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learning-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './learning-dashboard.component.html',
  styleUrl: './learning-dashboard.component.scss'
})
export class LearningDashboardComponent {
  learningModules = [
    {
      level: 'Level 1: Fundamentals',
      topics: [
        { name: 'Components & Templates', route: '/learn/components', completed: false },
        { name: 'Data Binding', route: '/learn/data-binding', completed: false },
        { name: 'Directives', route: '/learn/directives', completed: false },
        { name: 'Pipes', route: '/learn/pipes', completed: false },
        { name: 'Signals (Complete Guide)', route: '/learn/signals', completed: false }
      ]
    },
    {
      level: 'Level 2: Intermediate',
      topics: [
        { name: 'Services & DI', route: '/learn/services', completed: false },
        { name: 'Routing', route: '/learn/routing', completed: false },
        { name: 'Forms', route: '/learn/forms', completed: false },
        { name: 'HTTP Client', route: '/learn/http', completed: false }
      ]
    },
    {
      level: 'Level 3: Advanced',
      topics: [
        { name: 'RxJS & Observables', route: '/learn/rxjs', completed: false },
        { name: 'Decorators & Metadata', route: '/learn/decorators', completed: false },
        { name: 'Change Detection', route: '/learn/change-detection', completed: false },
        { name: 'Content Projection', route: '/learn/content-projection', completed: false },
        { name: 'State Management', route: '/learn/state', completed: false },
        { name: 'Route Guards', route: '/learn/guards', completed: false },
        { name: 'Performance', route: '/learn/performance', completed: false }
      ]
    },
    {
      level: 'Level 4: Expert',
      topics: [
        { name: 'Testing', route: '/learn/testing', completed: false },
        { name: 'Interview Prep', route: '/learn/interview', completed: true }
      ]
    }
  ];
}
