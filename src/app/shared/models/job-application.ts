export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location?: string;
  jobUrl?: string;
  status: number;
  appliedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}