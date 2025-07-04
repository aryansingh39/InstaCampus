export interface AuthenticatedRequest extends Express.Request {
  user?: {
    id: number;
    role: 'ADMIN' | 'STUDENT';
    email: string;
    hostel?: string;
    department?: string;
    batch?: string;
  }
}
