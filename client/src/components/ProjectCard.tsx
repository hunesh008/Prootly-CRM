import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  count: number;
  percentage?: string;
  variant?: "default" | "green";
  showAll?: boolean;
}

export default function ProjectCard({ 
  title, 
  count, 
  percentage, 
  variant = "default",
  showAll = false 
}: ProjectCardProps) {
  if (variant === "green") {
    return (
      <Card className="gradient-green-600 text-white hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-white/90 font-medium">{title}</h3>
          </div>
          <div className="text-2xl font-bold mb-2">{count.toLocaleString()}</div>
          {percentage && (
            <div className="text-white/80 text-sm">{percentage}</div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm border border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          {showAll && (
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          )}
        </div>
        <div className="text-3xl font-bold text-slate-800 mb-2">{count.toLocaleString()}</div>
        {showAll && (
          <div className="text-sm text-slate-500">(All)</div>
        )}
      </CardContent>
    </Card>
  );
}
