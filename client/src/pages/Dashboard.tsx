import { useQuery } from "@tanstack/react-query";
import { Users, Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProjectCard from "@/components/ProjectCard";
import CommentCard from "@/components/CommentCard";
import { Comment } from "@shared/schema";

interface ProjectStats {
  total: number;
  completed: { count: number; percentage: string };
  hold: { count: number; percentage: string };
  new: { count: number; percentage: string };
  revision: { count: number; percentage: string };
}

export default function Dashboard() {
  const { data: projectStats, isLoading: statsLoading } = useQuery<ProjectStats>({
    queryKey: ["/api/projects/stats"],
  });

  const { data: comments, isLoading: commentsLoading } = useQuery<Comment[]>({
    queryKey: ["/api/comments"],
  });

  if (statsLoading || commentsLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="gradient-green-yellow rounded-xl p-8 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Good Afternoon,</h2>
              <p className="text-2xl font-bold">Ashwini</p>
              <p className="text-white/80 text-sm mt-1">Welcome back to your renewable energy dashboard</p>
            </div>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 lg:flex-shrink-0">
            <Users className="w-4 h-4" />
            Invite Team
          </Button>
        </div>
      </div>

      {/* Project Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProjectCard
          title="Total Projects"
          count={projectStats?.total || 0}
          showAll
        />
        <ProjectCard
          title="Completed Projects"
          count={projectStats?.completed.count || 0}
          percentage={projectStats?.completed.percentage}
          variant="completed"
          trend="up"
          trendPercentage="+8%"
        />
        <ProjectCard
          title="Hold Projects"
          count={projectStats?.hold.count || 0}
          percentage={projectStats?.hold.percentage}
          variant="hold"
          trend="down"
          trendPercentage="-2%"
        />
        <ProjectCard
          title="New Projects"
          count={projectStats?.new.count || 0}
          percentage={projectStats?.new.percentage}
          variant="new"
          trend="up"
          trendPercentage="+15%"
        />
      </div>

      {/* Additional Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCard
          title="Revision Projects"
          count={projectStats?.revision.count || 0}
          percentage={projectStats?.revision.percentage}
          variant="revision"
          trend="neutral"
        />

        {/* Monthly Growth Chart */}
        <Card className="bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Monthly Growth</h3>
              <span className="text-sm text-green-600 dark:text-green-400">+28% this month</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Revenue Growth</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">$89.2K</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{width: "75%"}}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Project Completion</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">18 projects</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{width: "62%"}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Offers Banner */}
      <Card className="bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-400 h-80">
            <div className="absolute inset-0 flex flex-col lg:flex-row">
              {/* Left side content */}
              <div className="flex-1 p-8 flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">Services We Offer:</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-medium">Proposal Design (Array)</span>
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">Customer Support</span>
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-medium">PV Permit Design</span>
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="bg-green-700 text-white px-3 py-1.5 rounded-full text-sm font-medium">Lead Generation</span>
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">Engineering Stamps</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="bg-green-800 text-white px-3 py-1.5 rounded-full text-sm font-medium">Site Survey</span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-700 mb-4">Residential, commercial, industrial, and utility-scale renewable energy projects.</p>
                
                <Button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold w-fit">
                  Learn More About Our Services
                  <Plus className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              {/* Right side content - hidden on mobile */}
              <div className="hidden lg:block flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-r-xl">
                  <div className="absolute top-6 right-6 bg-black/70 text-white px-4 py-3 rounded-lg">
                    <p className="text-sm font-medium">🌞 Expert Solar Panel</p>
                    <p className="text-sm">Installation Services</p>
                    <p className="text-xs text-yellow-300">Your Solar Future</p>
                  </div>
                  
                  <div className="absolute bottom-6 right-6">
                    <div className="gradient-green-yellow text-white px-6 py-3 rounded-lg font-bold text-xl">
                      PROO<span className="text-yellow-200">TLY</span>
                    </div>
                  </div>
                  
                  {/* Solar panel pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-4 gap-2 h-full p-6">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="bg-slate-800 rounded-lg"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Recent Comments
            </h3>
            <Button variant="ghost" size="sm" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {comments && comments.length > 0 ? (
              comments.slice(0, 5).map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))
            ) : (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg font-medium mb-2">No comments yet</p>
                <p className="text-sm">Start a conversation with your team</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
