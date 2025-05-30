
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  createdDate: string;
  status?: 'active' | 'inactive' | 'on-leave';
  role?: 'admin' | 'manager' | 'employee';
  premiumAccess?: boolean;
}
