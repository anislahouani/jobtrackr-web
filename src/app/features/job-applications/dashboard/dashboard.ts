import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';

import { JobApplications } from '../../../core/services/job-applications';
import { JobApplication } from '../../../shared/models/job-application';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private jobApplicationsService = inject(JobApplications);
  private changeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router);

  applications: JobApplication[] = [];
  isLoading = true;
  errorMessage = '';
  firstName = localStorage.getItem('firstName') ?? '';

  ngOnInit(): void {
    this.jobApplicationsService.getAll().subscribe({
      next: applications => {
        this.applications = applications;
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les candidatures.';
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  getStatusLabel(status: number): string {
  const labels: Record<number, string> = {
    0: 'Wishlist',
    1: 'Candidature envoyée',
    2: 'Entretien',
    3: 'Offre',
    4: 'Refus'
  };

  return labels[status] ?? 'Inconnu';
}

deleteApplication(id: string): void {
  const confirmed = window.confirm(
    'Tu veux vraiment supprimer cette candidature ?'
  );

  if (!confirmed) {
    return;
  }

  this.jobApplicationsService.delete(id).subscribe({
    next: () => {
      this.applications = this.applications.filter(
        application => application.id !== id
      );

      this.changeDetectorRef.markForCheck();
    },
    error: () => {
      this.errorMessage = 'Impossible de supprimer la candidature.';
      this.changeDetectorRef.markForCheck();
    }
  });
}
}
