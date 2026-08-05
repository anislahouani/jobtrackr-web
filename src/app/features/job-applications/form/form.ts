import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApplications } from '../../../core/services/job-applications';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form implements OnInit {
  private formBuilder = inject(FormBuilder);
  private jobApplicationsService = inject(JobApplications);
  private route = inject(ActivatedRoute);

  router = inject(Router);

  errorMessage = '';
  applicationId: string | null = null;
  isEditMode = false;

  applicationForm = this.formBuilder.nonNullable.group({
    company: ['', Validators.required],
    position: ['', Validators.required],
    location: [''],
    jobUrl: [''],
    status: [0],
    appliedAt: [''],
    notes: ['']
  });

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.applicationId !== null;

    if (!this.applicationId) {
      return;
    }

    this.jobApplicationsService
      .getById(this.applicationId)
      .subscribe({
        next: application => {
          this.applicationForm.patchValue({
            company: application.company,
            position: application.position,
            location: application.location ?? '',
            jobUrl: application.jobUrl ?? '',
            status: application.status,
            appliedAt: application.appliedAt
              ? application.appliedAt.slice(0, 10)
              : '',
            notes: application.notes ?? ''
          });
        },
        error: () => {
          this.errorMessage = 'Impossible de charger la candidature.';
        }
      });
  }

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

    const operation =
      this.isEditMode && this.applicationId
        ? this.jobApplicationsService.update(this.applicationId, request)
        : this.jobApplicationsService.create(request);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = this.isEditMode
          ? 'Impossible de modifier la candidature.'
          : 'Impossible de créer la candidature.';
      }
    });
  }
}