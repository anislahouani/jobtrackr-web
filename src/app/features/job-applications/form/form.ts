import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobApplications } from '../../../core/services/job-applications';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form {
  private formBuilder = inject(FormBuilder);
  private jobApplicationsService = inject(JobApplications);
  router = inject(Router);

  errorMessage = '';

  applicationForm = this.formBuilder.nonNullable.group({
    company: ['', Validators.required],
    position: ['', Validators.required],
    location: [''],
    jobUrl: [''],
    status: [0],
    appliedAt: [''],
    notes: ['']
  });

  onSubmit(): void {
  if (this.applicationForm.invalid) {
    this.applicationForm.markAllAsTouched();
    return;
  }

  const rawValue = this.applicationForm.getRawValue();

  const request = {
    ...rawValue,
    appliedAt: rawValue.appliedAt
      ? new Date(`${rawValue.appliedAt}T00:00:00Z`).toISOString()
      : ''
  };

  this.jobApplicationsService
    .create(request)
    .subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Impossible de créer la candidature.';
      }
    });
}
}