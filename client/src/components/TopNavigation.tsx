import { useState } from "react";
import { Bell, MessageCircle, Sun, Moon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useLocation } from "wouter";
import GlobalSearch from "@/components/GlobalSearch";
import ProfileModal from "@/components/ProfileModal";

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/employees": "Employees",
  "/clients": "Clients",
  "/design": "Design",
  "/teams": "Teams",
  "/garage": "Garage",
  "/members": "Members",
  "/settings": "Settings",
};

export default function TopNavigation() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Ashwini Bhardwaj",
    email: "ashwini@prootly.com",
    role: "Renewable Energy Specialist",
    profileImage: undefined as string | undefined,
  });

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const currentPageName = pageNames[location] || "Dashboard";

  const handleProfileSave = (newProfile: typeof profileData) => {
    setProfileData(newProfile);
    // Here you would typically save to backend/localStorage
    localStorage.setItem("prootly-profile", JSON.stringify(newProfile));
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 px-6 py-4 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{currentPageName}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Global Search */}
            <GlobalSearch />
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            
            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
            
            {/* Messages */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 relative">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  5
                </span>
              </Button>
            </div>
            
            {/* User Profile */}
            <div 
              className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-gray-800 rounded-lg px-3 py-2 cursor-pointer transition-colors duration-200"
              onClick={() => setProfileModalOpen(true)}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                {profileData.profileImage ? (
                  <img src={profileData.profileImage} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  profileData.name.split(' ').map(n => n[0]).join('').substring(0, 2)
                )}
              </div>
              <div className="text-sm hidden md:block">
                <div className="font-medium text-slate-800 dark:text-slate-200">{profileData.name}</div>
                <div className="text-slate-500 dark:text-slate-400">@renewableenergy</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profile={profileData}
        onSave={handleProfileSave}
      />
    </>
  );
}
