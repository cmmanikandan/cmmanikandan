export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType?: string;
  budgetRange?: string;
  createdAt?: string;
  read?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  token?: string;
}
