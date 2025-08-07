import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Download, Printer, X } from "lucide-react";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileTabs from "@/components/profile/ProfileTabs";
import EditProfileModal from "@/components/profile/EditProfileModal";
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
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Employee Profile</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Comprehensive employee information and performance dashboard</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadPDF}
                className="gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                data-testid="download-pdf-button"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrint}
                className="gap-2 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200"
                data-testid="print-button"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Profile Card - Left Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="sticky top-6">
                <ProfileCard
                  profile={profileData}
                  onEditClick={handleEditProfile}
                  onImageClick={() => setIsImageModalOpen(true)}
                  animatedScore={animatedScore}
                />
              </div>
            </div>

            {/* Main Content - Profile Tabs */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
                <ProfileTabs
                  profile={profileData}
                  attendanceData={mockAttendanceData}
                  leaveRecords={mockLeaveRecords}
                  documents={mockDocuments}
                  performanceData={mockPerformanceData}
                />
              </div>
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