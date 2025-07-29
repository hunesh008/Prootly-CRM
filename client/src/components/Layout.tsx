import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import TopNavigation from "./TopNavigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-200">
      <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation />
        <main className="flex-1 overflow-auto p-6 bg-slate-50 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
}
