import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../../shared/models/job-application';

export interface CreateJobApplicationRequest {
  company: string;
  position: string;
  location: string;
  jobUrl: string;
  status: number;
  appliedAt: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobApplications {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5159/api/job-applications';

  getAll(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.apiUrl);
  }

  create(
    request: CreateJobApplicationRequest
  ): Observable<JobApplication> {
    return this.http.post<JobApplication>(
      this.apiUrl,
      request
    );
  }
}
