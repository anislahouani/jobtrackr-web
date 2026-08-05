import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';

import { JobApplications } from '../../../core/services/job-applications';
import { JobApplication } from '../../../shared/models/job-application';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private jobApplicationsService = inject(JobApplications);
  private changeDetectorRef = inject(ChangeDetectorRef);

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
}
