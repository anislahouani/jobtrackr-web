import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../../shared/models/job-application';

@Injectable({
  providedIn: 'root'
})
export class JobApplications {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5159/api/job-applications';

  getAll(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.apiUrl);
  }
}
