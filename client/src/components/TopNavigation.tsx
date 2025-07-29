import { useState } from "react";
import { Search, Bell, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TopNavigation() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
          
          {/* Messages */}
          <div className="relative">
            <Button variant="ghost" size="sm" className="p-2 text-slate-400 hover:text-slate-600 relative">
              <MessageCircle className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </Button>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
              A
            </div>
            <div className="text-sm">
              <div className="font-medium text-slate-800">Ashwini Bhardwaj</div>
              <div className="text-slate-500">@renewableenergy</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
