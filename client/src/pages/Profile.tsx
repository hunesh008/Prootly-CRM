import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Download, Printer, X, MessageCircle, UserPlus, Camera, Edit, MapPin, Calendar, Users, TrendingUp, Settings, FileText, User } from "lucide-react";
import ProfileTabsSimple from "@/components/profile/ProfileTabsSimple";
import EditProfileModal from "@/components/profile/EditProfileModal";
import GradeBadge from "@/components/profile/GradeBadge";
import { EmployeeProfile, AttendanceData, LeaveRecord, Document, PerformanceData } from "../../../shared/types";

// Mock data - in real app this would come from API/database
const mockProfileData: EmployeeProfile = {
  id: "emp-001",
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
  gender: "Female",
  dateOfBirth: new Date("1992-08-15"),
  skills: ["Solar Energy", "Project Management", "AutoCAD", "Team Leadership", "Renewable Systems", "Sustainability"],
  bio: "Passionate renewable energy specialist with over 5 years of experience in solar energy systems design and implementation. Dedicated to sustainable energy solutions and leading high-performance teams to deliver innovative projects that contribute to a greener future."
};

const mockAttendanceData: AttendanceData[] = [
  { date: "2024-08-01", status: "present", checkIn: "09:15", checkOut: "18:30" },
  { date: "2024-08-02", status: "present", checkIn: "09:00", checkOut: "18:15" },
  { date: "2024-08-03", status: "absent" },
  { date: "2024-08-04", status: "present", checkIn: "09:10", checkOut: "18:20" },
  { date: "2024-08-05", status: "late", checkIn: "10:30", checkOut: "19:00" },
  { date: "2024-08-06", status: "present", checkIn: "08:45", checkOut: "17:45" },
  { date: "2024-08-07", status: "present", checkIn: "09:05", checkOut: "18:10" },
  { date: "2024-08-08", status: "half-day", checkIn: "09:00", checkOut: "13:00" },
  { date: "2024-08-09", status: "present", checkIn: "09:20", checkOut: "18:25" },
  { date: "2024-08-10", status: "present", checkIn: "08:55", checkOut: "18:05" },
];

const mockLeaveRecords: LeaveRecord[] = [
  {
    id: "leave-001",
    type: "vacation",
    startDate: new Date("2024-07-15"),
    endDate: new Date("2024-07-19"),
    days: 5,
    status: "approved",
    reason: "Family vacation to Goa"
  },
  {
    id: "leave-002", 
    type: "sick",
    startDate: new Date("2024-06-10"),
    endDate: new Date("2024-06-11"),
    days: 2,
    status: "approved",
    reason: "Fever and cold"
  },
  {
    id: "leave-003",
    type: "personal",
    startDate: new Date("2024-09-05"),
    endDate: new Date("2024-09-05"),
    days: 1,
    status: "pending",
    reason: "Personal work"
  }
];

const mockDocuments: Document[] = [
  {
    id: "doc-001",
    name: "Aadhaar Card",
    type: "PDF",
    size: 2048,
    uploadDate: new Date("2022-03-20"),
    url: "#"
  },
  {
    id: "doc-002",
    name: "PAN Card",
    type: "PDF", 
    size: 1536,
    uploadDate: new Date("2022-03-20"),
    url: "#"
  },
  {
    id: "doc-003",
    name: "Educational Certificate",
    type: "PDF",
    size: 3072,
    uploadDate: new Date("2022-03-22"),
    url: "#"
  },
  {
    id: "doc-004",
    name: "Experience Certificate",
    type: "PDF",
    size: 1024,
    uploadDate: new Date("2022-03-25"),
    url: "#"
  }
];

const mockPerformanceData: PerformanceData[] = [
  { month: "August 2024", score: 87, goals: 90, feedback: "Excellent work on the solar panel installation project" },
  { month: "July 2024", score: 92, goals: 85, feedback: "Outstanding leadership during the team restructuring" },
  { month: "June 2024", score: 85, goals: 80, feedback: "Good progress on renewable energy initiatives" },
  { month: "May 2024", score: 89, goals: 85, feedback: "Strong performance in client presentations" },
  { month: "April 2024", score: 81, goals: 80, feedback: "Met all project deadlines successfully" },
  { month: "March 2024", score: 88, goals: 85, feedback: "Excellent team collaboration and project delivery" }
];

export default function Profile() {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<EmployeeProfile>(mockProfileData);
  const [animatedScore, setAnimatedScore] = useState(0);

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
  }, [profileData.performanceScore]);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedProfile: EmployeeProfile) => {
    setProfileData(updatedProfile);
    // In real app, this would save to backend
    localStorage.setItem("employee-profile", JSON.stringify(updatedProfile));
  };

  const handleDownloadPDF = () => {
    // In real app, this would generate and download a PDF
    console.log("Downloading profile as PDF...");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <TooltipProvider>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Centered Container */}
        <div className="max-w-7xl mx-auto">
          {/* Cover Banner & Profile Header */}
          <div className="relative">
            {/* Cover Image */}
            <div className="h-64 md:h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden rounded-b-xl">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-30"></div>
              {/* Geometric pattern overlay */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </div>

            {/* Profile Picture - Overlapping the banner */}
            <div className="absolute -bottom-16 left-8 md:left-12">
              <div className="relative">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 border-6 border-white dark:border-gray-800 shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300" 
                      onClick={() => setIsImageModalOpen(true)}>
                  <AvatarImage src={profileData.profilePicture || ""} />
                  <AvatarFallback className="text-4xl md:text-5xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {profileData.fullName.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <button 
                  className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadPDF}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm gap-2 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 border-white/20"
                data-testid="download-pdf-button"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrint}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm gap-2 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 border-white/20"
                data-testid="print-button"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="px-8 md:px-12 pb-6 pt-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              {/* Name and Title */}
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{profileData.fullName}</h1>
                <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">{profileData.designation}</p>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {profileData.joiningDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 gap-2">
                  <UserPlus className="h-4 w-4" />
                  Follow
                </Button>
                <Button variant="outline" className="px-6 py-2 gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleEditProfile}
                  className="gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-6 grid grid-cols-3 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{profileData.teamSize}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{profileData.projectsCompleted}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{animatedScore}</div>
                  <GradeBadge score={profileData.performanceScore} />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Performance Score</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-8 md:px-12">
              <Tabs defaultValue="posts" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 bg-transparent h-12">
                  <TabsTrigger 
                    value="posts" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none py-3 px-4"
                  >
                    Posts
                  </TabsTrigger>
                  <TabsTrigger 
                    value="about" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none py-3 px-4"
                  >
                    About Me
                  </TabsTrigger>
                  <TabsTrigger 
                    value="attendance" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none py-3 px-4"
                  >
                    Attendance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="leave" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none py-3 px-4"
                  >
                    Leave History
                  </TabsTrigger>
                  <TabsTrigger 
                    value="documents" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none py-3 px-4"
                  >
                    Documents
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none py-3 px-4"
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>

                {/* Tab Content */}
                <div className="py-8">
                  <TabsContent value="posts" className="space-y-6">
                    <Card className="bg-white dark:bg-[#1e1e1e]">
                      <CardContent className="p-6">
                        <div className="text-center py-12">
                          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No posts yet</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">Share your thoughts, achievements, or updates with your team.</p>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">Create Post</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="about" className="space-y-6">
                    <Card className="bg-white dark:bg-[#1e1e1e]">
                      <CardContent className="p-6 space-y-6">
                        {/* Bio Section */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profileData.bio}</p>
                        </div>

                        {/* Skills Section */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {profileData.skills?.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Work Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Work Information</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Employee ID</p>
                                  <p className="font-medium text-gray-900 dark:text-white">{profileData.employeeId}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Users className="h-4 w-4 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Reporting Manager</p>
                                  <p className="font-medium text-gray-900 dark:text-white">{profileData.reportingManager}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Work Schedule</p>
                                  <p className="font-medium text-gray-900 dark:text-white">{profileData.workSchedule}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                                  <p className="font-medium text-gray-900 dark:text-white">{profileData.gender}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                                  <p className="font-medium text-gray-900 dark:text-white">{profileData.dateOfBirth?.toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <MessageCircle className="h-4 w-4 text-gray-500" />
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                                  <p className="font-medium text-gray-900 dark:text-white">{profileData.contactNumber}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="attendance" className="space-y-6">
                    <ProfileTabsSimple
                      profile={profileData}
                      attendanceData={mockAttendanceData}
                      leaveRecords={mockLeaveRecords}
                      documents={mockDocuments}
                      performanceData={mockPerformanceData}
                      activeTab="attendance"
                    />
                  </TabsContent>

                  <TabsContent value="leave" className="space-y-6">
                    <ProfileTabsSimple
                      profile={profileData}
                      attendanceData={mockAttendanceData}
                      leaveRecords={mockLeaveRecords}
                      documents={mockDocuments}
                      performanceData={mockPerformanceData}
                      activeTab="leave"
                    />
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-6">
                    <ProfileTabsSimple
                      profile={profileData}
                      attendanceData={mockAttendanceData}
                      leaveRecords={mockLeaveRecords}
                      documents={mockDocuments}
                      performanceData={mockPerformanceData}
                      activeTab="documents"
                    />
                  </TabsContent>

                  <TabsContent value="performance" className="space-y-6">
                    <ProfileTabsSimple
                      profile={profileData}
                      attendanceData={mockAttendanceData}
                      leaveRecords={mockLeaveRecords}
                      documents={mockDocuments}
                      performanceData={mockPerformanceData}
                      activeTab="performance"
                    />
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-6">
                    <Card className="bg-white dark:bg-[#1e1e1e]">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Profile Settings</h3>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Notifications</label>
                              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                <option>All notifications</option>
                                <option>Important only</option>
                                <option>None</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Privacy Level</label>
                              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                <option>Public</option>
                                <option>Team only</option>
                                <option>Private</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Show performance score publicly</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Allow team members to see your performance grade</p>
                            </div>
                            <Button variant="outline" size="sm">Enable</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Activity status</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Show when you're online or away</p>
                            </div>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={profileData}
          onSave={handleSaveProfile}
        />

        {/* Profile Image Modal */}
        <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                Profile Picture
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsImageModalOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center p-6">
              <Avatar className="w-80 h-80 border-4 border-gray-200 dark:border-gray-700 shadow-2xl">
                <AvatarImage src={profileData.profilePicture || ""} />
                <AvatarFallback className="text-8xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {profileData.fullName.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center space-y-2 pb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{profileData.fullName}</h3>
              <p className="text-gray-600 dark:text-gray-400">{profileData.designation}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}