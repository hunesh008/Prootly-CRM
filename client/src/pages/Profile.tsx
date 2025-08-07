import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building,
  Briefcase,
  Award,
  Edit,
  MapPin,
  Clock,
} from "lucide-react";

// Mock data - in real app this would come from API/database
const profileData = {
  id: "EMP001",
  employeeId: "EMP001",
  fullName: "Ashwini Bhardwaj",
  department: "Renewable Energy",
  designation: "Senior Renewable Energy Specialist",
  email: "ashwini@prootly.com",
  contactNumber: "+91 9876543210",
  joiningDate: new Date("2022-03-15"),
  profilePicture: null,
  performanceScore: 87,
  location: "Mumbai, India",
  workSchedule: "Full-time",
  reportingManager: "Rajesh Kumar",
  teamSize: 8,
  projectsCompleted: 23,
};

const getGradeBadge = (score: number) => {
  if (score >= 90) return { grade: "A", color: "bg-green-500", textColor: "text-white" };
  if (score >= 75) return { grade: "B", color: "bg-blue-500", textColor: "text-white" };
  if (score >= 60) return { grade: "C", color: "bg-orange-500", textColor: "text-white" };
  return { grade: "D", color: "bg-red-500", textColor: "text-white" };
};

const getPerformanceColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-blue-600";
  if (score >= 60) return "text-orange-600";
  return "text-red-600";
};

const getProgressColor = (score: number) => {
  if (score >= 90) return "bg-green-500";
  if (score >= 75) return "bg-blue-500";
  if (score >= 60) return "bg-orange-500";
  return "bg-red-500";
};

export default function Profile() {
  const gradeBadge = getGradeBadge(profileData.performanceScore);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const calculateTenure = () => {
    const now = new Date();
    const joining = profileData.joiningDate;
    const diffTime = Math.abs(now.getTime() - joining.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`;
    }
    return `${months} month${months !== 1 ? "s" : ""}`;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employee Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive employee information and performance overview</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          data-testid="button-edit-profile"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 shadow-lg">
                  <AvatarImage src={profileData.profilePicture || ""} />
                  <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl text-gray-900 dark:text-white" data-testid="text-full-name">
                {profileData.fullName}
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 font-medium" data-testid="text-designation">
                {profileData.designation}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Performance Score */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Performance Score</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span 
                    className={`text-2xl font-bold ${getPerformanceColor(profileData.performanceScore)}`}
                    data-testid="text-performance-score"
                  >
                    {profileData.performanceScore}/100
                  </span>
                  <Badge 
                    className={`${gradeBadge.color} ${gradeBadge.textColor} text-sm font-bold px-3 py-1`}
                    data-testid="badge-grade"
                  >
                    Grade {gradeBadge.grade}
                  </Badge>
                </div>
                <Progress 
                  value={profileData.performanceScore} 
                  className="h-2"
                  data-testid="progress-performance"
                />
              </div>

              <Separator className="my-4" />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid="text-projects-completed">
                    {profileData.projectsCompleted}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Projects</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="text-team-size">
                    {profileData.teamSize}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Team Size</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                    <p className="text-gray-900 dark:text-white font-medium" data-testid="info-full-name">
                      {profileData.fullName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee ID</label>
                    <p className="text-gray-900 dark:text-white font-medium" data-testid="info-employee-id">
                      {profileData.employeeId}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-email">
                        {profileData.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Number</label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-contact">
                        {profileData.contactNumber}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-department">
                        {profileData.department}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Designation</label>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-designation">
                        {profileData.designation}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Joining Date</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-joining-date">
                        {formatDate(profileData.joiningDate)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-location">
                        {profileData.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Briefcase className="h-5 w-5" />
                Work Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Tenure</label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-tenure">
                        {calculateTenure()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Work Schedule</label>
                    <p className="text-gray-900 dark:text-white font-medium" data-testid="info-work-schedule">
                      {profileData.workSchedule}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Reporting Manager</label>
                    <p className="text-gray-900 dark:text-white font-medium" data-testid="info-manager">
                      {profileData.reportingManager}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Projects Completed</label>
                    <p className="text-gray-900 dark:text-white font-medium" data-testid="info-projects">
                      {profileData.projectsCompleted}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Size</label>
                    <p className="text-gray-900 dark:text-white font-medium" data-testid="info-team">
                      {profileData.teamSize} members
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}