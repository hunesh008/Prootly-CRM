import { useState, useRef, useEffect } from "react";
import {
  Bell,
  MessageCircle,
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation } from "wouter";
import GlobalSearch from "@/components/GlobalSearch";
import ProfileModal from "@/components/ProfileModal";

interface ProfileData {
  name: string;
  email: string;
  role: string;
  profileImage?: string;
}

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/employees": "Employees",
  "/clients": "Clients",
  "/design": "Design",
  "/teams": "Teams",
  "/garage": "Garage",
  "/members": "Members",
  "/profile": "Profile",
  "/settings": "Settings",
};

export default function TopNavigation() {
  const [location, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Ashwini Bhardwaj",
    email: "ashwini@prootly.com",
    role: "Renewable Energy Specialist",
    profileImage: undefined,
  });

  const currentPageName = pageNames[location] || "Dashboard";

  const handleProfileSave = (newProfile: ProfileData) => {
    setProfileData(newProfile);
    // Here you would typically save to backend/localStorage
    localStorage.setItem("prootly-profile", JSON.stringify(newProfile));
  };

  const handleLogout = () => {
    // Handle logout logic here
    localStorage.removeItem("prootly-profile");
    navigate("/login");
    setDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setProfileModalOpen(true);
    setDropdownOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white dark:bg-[#202020] border-b border-gray-200 dark:border-gray-800 px-6 py-4 transition-colors duration-300">
        <div className="flex items-center justify-between">
          {/* Left side - Page title */}
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentPageName}
            </h1>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-2xl">
              <GlobalSearch />
            </div>
          </div>

          {/* Right side - Icons and Profile */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 relative"
              >
                <Bell
                  className="!w-6 !h-6"
                  data-testid="button-notifications"
                />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>

            {/* Messages */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 relative"
              >
                <MessageCircle
                  className="!w-6 !h-6"
                  data-testid="button-messages"
                />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  5
                </span>
              </Button>
            </div>

            {/* User Profile with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                data-testid="button-profile"
              >
                {profileData.profileImage ? (
                  <img
                    src={profileData.profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                )}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {/* Theme Toggle */}
                  <button
                    onClick={handleThemeToggle}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3"
                    data-testid="button-theme-toggle"
                  >
                    {theme === "light" ? (
                      <>
                        <Moon className="w-4 h-4" />
                        <span>Dark Theme</span>
                      </>
                    ) : (
                      <>
                        <Sun className="w-4 h-4" />
                        <span>Light Theme</span>
                      </>
                    )}
                  </button>

                  {/* Profile */}
                  <button
                    onClick={handleProfileClick}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3"
                    data-testid="button-profile-page"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3"
                    data-testid="button-logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
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
