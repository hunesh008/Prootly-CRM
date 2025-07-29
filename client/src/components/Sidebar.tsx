import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Palette, 
  UsersRound, 
  Warehouse, 
  UserCheck, 
  Settings,
  Menu,
  X 
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  const [location] = useLocation();

  return (
    <div className={`${isExpanded ? 'w-64' : 'w-16'} bg-white dark:bg-gray-900 shadow-sm border-r border-slate-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out`}>
      {/* Header with Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-green-yellow rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
          </div>
          {isExpanded && (
            <span className="text-xl font-bold text-slate-800 dark:text-slate-200 transition-opacity duration-300">
              PROOTLY
            </span>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-1 h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          {isExpanded ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigationItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          
          const navItem = (
            <Link key={item.path} href={item.path}>
              <div className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                isActive 
                  ? "text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-900/20" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-gray-800"
              } ${!isExpanded ? 'justify-center' : ''}`}>
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isExpanded && (
                  <span className="transition-opacity duration-300 opacity-100">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          );

          // Only show tooltip when collapsed
          if (!isExpanded) {
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  {navItem}
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-gray-900 text-white">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return navItem;
        })}
      </nav>
    </div>
  );
}
