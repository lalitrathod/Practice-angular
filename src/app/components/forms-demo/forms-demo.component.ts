import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forms-demo.component.html',
  styleUrl: './forms-demo.component.scss'
})
export class FormsDemoComponent {
  private fb = new FormBuilder();

  // Template-driven form
  formData: { name: string; email: string; age: number } = {
    name: '',
    email: '',
    age: 0
  };

  // Reactive form
  reactiveForm: FormGroup;

  // Form with FormArray
  dynamicForm: FormGroup;

  // Form submission
  submittedData = signal<any>(null);

  constructor() {
    // Initialize reactive form
    this.reactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: [0, [Validators.required, Validators.min(18), Validators.max(100)]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    // Initialize dynamic form with FormArray
    this.dynamicForm = this.fb.group({
      name: ['', Validators.required],
      hobbies: this.fb.array([this.createHobby()])
    });
  }

  // Custom validator
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);
    
    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
    return valid ? null : { passwordStrength: true };
  }

  // Cross-field validator
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) return null;
    
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  // Template-driven form submit
  onSubmitTemplateForm(): void {
    if (this.formData.name && this.formData.email) {
      this.submittedData.set({ type: 'Template-Driven', data: { ...this.formData } });
      alert('Template form submitted!');
    }
  }

  // Reactive form submit
  onSubmitReactiveForm(): void {
    if (this.reactiveForm.valid) {
      this.submittedData.set({ type: 'Reactive', data: this.reactiveForm.value });
      alert('Reactive form submitted!');
    } else {
      this.markFormGroupTouched(this.reactiveForm);
    }
  }

  // Mark all fields as touched
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Get form control for easy access
  get f() {
    return this.reactiveForm.controls;
  }

  // FormArray methods
  get hobbies(): FormArray {
    return this.dynamicForm.get('hobbies') as FormArray;
  }

  createHobby(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      years: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addHobby(): void {
    this.hobbies.push(this.createHobby());
  }

  removeHobby(index: number): void {
    if (this.hobbies.length > 1) {
      this.hobbies.removeAt(index);
    }
  }

  onSubmitDynamicForm(): void {
    if (this.dynamicForm.valid) {
      this.submittedData.set({ type: 'Dynamic', data: this.dynamicForm.value });
      alert('Dynamic form submitted!');
    }
  }

  // Reset forms
  resetTemplateForm(): void {
    this.formData = { name: '', email: '', age: 0 };
  }

  resetReactiveForm(): void {
    this.reactiveForm.reset();
  }

  resetDynamicForm(): void {
    this.dynamicForm.reset();
    this.hobbies.clear();
    this.hobbies.push(this.createHobby());
  }
}
