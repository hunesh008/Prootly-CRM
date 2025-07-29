import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Palette, 
  UsersRound, 
  Warehouse, 
  UserCheck, 
  Settings 
} from "lucide-react";

const navigationItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/employees", label: "Employees", icon: Users },
  { path: "/clients", label: "Clients", icon: Building2 },
  { path: "/design", label: "Design", icon: Palette },
  { path: "/teams", label: "Teams", icon: UsersRound },
  { path: "/garage", label: "Garage", icon: Warehouse },
  { path: "/members", label: "Members", icon: UserCheck },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-white shadow-sm border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b border-slate-200">
        <div className="w-8 h-8 gradient-green-yellow rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-xl font-bold text-slate-800">PROOTLY</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          
          return (
            <Link key={item.path} href={item.path}>
              <a className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isActive 
                  ? "text-green-700 bg-green-50" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}>
                <Icon className="w-5 h-5" />
                {item.label}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
