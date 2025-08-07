import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  X,
  Camera,
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
  if (score >= 90) return { 
    grade: "A", 
    color: "bg-green-500 hover:bg-green-600", 
    textColor: "text-white",
    description: "Excellent Performance",
    detail: "Outstanding work quality and exceptional results"
  };
  if (score >= 75) return { 
    grade: "B", 
    color: "bg-blue-500 hover:bg-blue-600", 
    textColor: "text-white",
    description: "Good Performance",
    detail: "Consistently meets expectations with quality work"
  };
  if (score >= 60) return { 
    grade: "C", 
    color: "bg-orange-500 hover:bg-orange-600", 
    textColor: "text-white",
    description: "Average Performance",
    detail: "Meets basic requirements, room for improvement"
  };
  return { 
    grade: "D", 
    color: "bg-red-500 hover:bg-red-600", 
    textColor: "text-white",
    description: "Needs Improvement",
    detail: "Below expectations, requires focused development"
  };
};

const getPerformanceColor = (score: number) => {
  if (score >= 90) return "text-green-600 dark:text-green-400";
  if (score >= 75) return "text-blue-600 dark:text-blue-400";
  if (score >= 60) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
};

export default function Profile() {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(profileData);
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const gradeBadge = getGradeBadge(profileData.performanceScore);
  
  // Fade-in animation on component mount
  useEffect(() => {
    setIsVisible(true);
    
    // Animate performance score
    const timer = setTimeout(() => {
      let current = 0;
      const increment = profileData.performanceScore / 50;
      const scoreAnimation = setInterval(() => {
        current += increment;
        if (current >= profileData.performanceScore) {
          setAnimatedScore(profileData.performanceScore);
          clearInterval(scoreAnimation);
        } else {
          setAnimatedScore(Math.round(current));
        }
      }, 20);
      
      return () => clearInterval(scoreAnimation);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
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

  const handleSaveProfile = () => {
    Object.assign(profileData, editForm);
    setIsEditModalOpen(false);
  };

  return (
    <TooltipProvider>
      <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Employee Profile</h1>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive employee information and performance overview</p>
          </div>
          
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 self-start sm:self-center"
                data-testid="button-edit-profile"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Edit Profile Information</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={editForm.fullName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                      data-testid="input-full-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      value={editForm.employeeId}
                      onChange={(e) => setEditForm(prev => ({ ...prev, employeeId: e.target.value }))}
                      data-testid="input-employee-id"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={editForm.department}
                      onChange={(e) => setEditForm(prev => ({ ...prev, department: e.target.value }))}
                      data-testid="input-department"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={editForm.designation}
                      onChange={(e) => setEditForm(prev => ({ ...prev, designation: e.target.value }))}
                      data-testid="input-designation"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      value={editForm.contactNumber}
                      onChange={(e) => setEditForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                      data-testid="input-contact"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4 relative">
                  <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                    <DialogTrigger asChild>
                      <div className="relative cursor-pointer group">
                        <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                          <AvatarImage src={profileData.profilePicture || ""} />
                          <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {profileData.fullName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all duration-300 flex items-center justify-center">
                          <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Profile Picture</DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-center p-6">
                        <Avatar className="w-64 h-64 border-4 border-gray-200 dark:border-gray-700">
                          <AvatarImage src={profileData.profilePicture || ""} />
                          <AvatarFallback className="text-6xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {profileData.fullName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500 animate-pulse" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">Performance Score</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span 
                      className={`text-2xl font-bold ${getPerformanceColor(profileData.performanceScore)} transition-all duration-300`}
                      data-testid="text-performance-score"
                    >
                      {animatedScore}/100
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge 
                          className={`${gradeBadge.color} ${gradeBadge.textColor} text-sm font-bold px-3 py-1 cursor-help transition-all duration-200 transform hover:scale-105`}
                          data-testid="badge-grade"
                        >
                          Grade {gradeBadge.grade}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-center">
                          <p className="font-semibold">{gradeBadge.description}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{gradeBadge.detail}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Progress 
                    value={animatedScore} 
                    className="h-3 bg-gray-200 dark:bg-gray-700"
                    data-testid="progress-performance"
                  />
                </div>

                <Separator className="my-4" />

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="hover:bg-blue-50 dark:hover:bg-blue-900/20 p-3 rounded-lg transition-colors duration-200">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid="text-projects-completed">
                      {profileData.projectsCompleted}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Projects</p>
                  </div>
                  <div className="hover:bg-green-50 dark:hover:bg-green-900/20 p-3 rounded-lg transition-colors duration-200">
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
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <User className="h-5 w-5 text-blue-500" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-full-name">
                        {profileData.fullName}
                      </p>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee ID</label>
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-employee-id">
                        {profileData.employeeId}
                      </p>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-500" />
                        <p className="text-gray-900 dark:text-white font-medium" data-testid="info-email">
                          {profileData.email}
                        </p>
                      </div>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Number</label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-500" />
                        <p className="text-gray-900 dark:text-white font-medium" data-testid="info-contact">
                          {profileData.contactNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-purple-500" />
                        <p className="text-gray-900 dark:text-white font-medium" data-testid="info-department">
                          {profileData.department}
                        </p>
                      </div>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Designation</label>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-orange-500" />
                        <p className="text-gray-900 dark:text-white font-medium" data-testid="info-designation">
                          {profileData.designation}
                        </p>
                      </div>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Joining Date</label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        <p className="text-gray-900 dark:text-white font-medium" data-testid="info-joining-date">
                          {formatDate(profileData.joiningDate)}
                        </p>
                      </div>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-teal-500" />
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
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Briefcase className="h-5 w-5 text-indigo-500" />
                  Work Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Tenure</label>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-indigo-500" />
                        <p className="text-gray-900 dark:text-white font-medium" data-testid="info-tenure">
                          {calculateTenure()}
                        </p>
                      </div>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Work Schedule</label>
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-work-schedule">
                        {profileData.workSchedule}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Reporting Manager</label>
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-manager">
                        {profileData.reportingManager}
                      </p>
                    </div>
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Projects Completed</label>
                      <p className="text-gray-900 dark:text-white font-medium" data-testid="info-projects">
                        {profileData.projectsCompleted}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-200">
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
    </TooltipProvider>
  );
}