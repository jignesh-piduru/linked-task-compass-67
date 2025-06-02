
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
  
  // Personal Details
  employeeId?: string;
  phoneNumber?: string;
  address?: string;
  profilePicture?: string;
  
  // Professional Details
  joiningDate?: string;
  manager?: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Contract';
  
  // Skillset & Experience
  skills?: string[];
  certifications?: string[];
  yearsOfExperience?: number;
  previousEmployers?: string[];
}
