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
  appliedAt: string | null;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobApplications {
  private http = inject(HttpClient);

  private apiUrl = 'https://jobtrackr-api-gwkx.onrender.com/api/job-applications';

  getAll(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.apiUrl);
  }

  getById(id: string): Observable<JobApplication> {
  return this.http.get<JobApplication>(`${this.apiUrl}/${id}`);
}

  create(
    request: CreateJobApplicationRequest
  ): Observable<JobApplication> {
    return this.http.post<JobApplication>(
      this.apiUrl,
      request
    );
  }

update(
  id: string,
  request: CreateJobApplicationRequest
): Observable<JobApplication> {
  return this.http.put<JobApplication>(
    `${this.apiUrl}/${id}`,
    request
  );
}

  delete(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}
