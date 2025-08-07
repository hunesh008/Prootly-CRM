export interface EmployeeProfile {
  id: string;
  employeeId: string;
  fullName: string;
  department: string;
  designation: string;
  email: string;
  contactNumber: string;
  joiningDate: Date;
  profilePicture: string | null;
  performanceScore: number;
  location: string;
  workSchedule: string;
  reportingManager: string;
  teamSize: number;
  projectsCompleted: number;
  gender?: string;
  dateOfBirth?: Date;
  skills?: string[];
  bio?: string;
}

export interface AttendanceData {
  date: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  checkIn?: string;
  checkOut?: string;
}

export interface LeaveRecord {
  id: string;
  type: 'sick' | 'vacation' | 'personal' | 'emergency';
  startDate: Date;
  endDate: Date;
  days: number;
  status: 'approved' | 'pending' | 'rejected';
  reason: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  url: string;
}

export interface PerformanceData {
  month: string;
  score: number;
  goals: number;
  feedback?: string;
}