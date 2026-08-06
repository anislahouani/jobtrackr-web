import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { ToastService } from '../../../shared/services/toast';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private formBuilder = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private toastService = inject(ToastService);
  
  isLoading = false;
  errorMessage = '';

  registerForm = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerForm.getRawValue()).subscribe({
  next: response => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('firstName', response.firstName);

    this.toastService.show('Compte créé avec succès.');
    this.router.navigate(['/dashboard']);

    this.isLoading = false;
  },
  error: error => {
    this.isLoading = false;

    if (error.status === 409) {
      this.errorMessage = 'Cette adresse email est déjà utilisée.';
      return;
    }

    this.errorMessage = 'Impossible de créer le compte.';
  }
});
  }
}
