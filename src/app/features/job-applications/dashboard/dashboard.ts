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
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private jobApplicationsService = inject(JobApplications);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);

  router = inject(Router);

  applications: JobApplication[] = [];
  isLoading = true;
  errorMessage = '';
  firstName = localStorage.getItem('firstName') ?? '';
  searchTerm = '';
  selectedStatus: number | null = null;

  get filteredApplications(): JobApplication[] {
  const term = this.searchTerm.trim().toLowerCase();

  return this.applications.filter(application => {
    const matchesSearch =
      !term ||
      application.company.toLowerCase().includes(term) ||
      application.position.toLowerCase().includes(term) ||
      application.location?.toLowerCase().includes(term);

    const matchesStatus =
      this.selectedStatus === null ||
      application.status === this.selectedStatus;

    return matchesSearch && matchesStatus;
  });
}

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

  this.toastService.show('Candidature supprimée avec succès.');
  this.changeDetectorRef.markForCheck();
},
    error: () => {
      this.errorMessage = 'Impossible de supprimer la candidature.';
      this.changeDetectorRef.markForCheck();
    }
  });
}

get totalApplications(): number {
  return this.applications.length;
}

get interviewCount(): number {
  return this.applications.filter(
    application => application.status === 2
  ).length;
}

get offerCount(): number {
  return this.applications.filter(
    application => application.status === 3
  ).length;
}

logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('firstName');
  this.router.navigate(['/login']);
}
}
