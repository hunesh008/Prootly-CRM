import { useQuery } from "@tanstack/react-query";
import { Users, Plus } from "lucide-react";
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
      <div className="gradient-green-yellow rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Good Afternoon,</h2>
              <p className="text-xl font-bold">Ashwini</p>
            </div>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
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
          variant="green"
        />
        <ProjectCard
          title="Hold Projects"
          count={projectStats?.hold.count || 0}
          percentage={projectStats?.hold.percentage}
          variant="green"
        />
        <ProjectCard
          title="New Projects"
          count={projectStats?.new.count || 0}
          percentage={projectStats?.new.percentage}
          variant="green"
        />
      </div>

      {/* Additional Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectCard
          title="Revision Projects"
          count={projectStats?.revision.count || 0}
          percentage={projectStats?.revision.percentage}
          variant="green"
        />

        {/* Revision Statistics Chart */}
        <Card className="bg-white shadow-sm border border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Revision Statistics</h3>
              <span className="text-sm text-slate-500">(All)</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">As Built</span>
                <span className="text-slate-800 font-medium">280</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: "65%"}}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Unknown</span>
                <span className="text-slate-800 font-medium">218</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="gradient-green-600 h-2 rounded-full" style={{width: "50%"}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Offers Banner */}
      <Card className="bg-white shadow-sm border border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Latest Offers (Recommended Size • 900 x 300px)</h3>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-4-4m4 4l4-4m3-5a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Button>
          </div>
          
          {/* Services Banner */}
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-400 h-72">
            <div className="absolute inset-0 flex">
              {/* Left side content */}
              <div className="flex-1 p-8 flex flex-col justify-center">
                <h2 className="text-4xl font-bold text-slate-800 mb-4">Services We Offer:</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">Proposal Design (Array)</span>
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">Customer Support Services</span>
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">PV Permit Design</span>
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">Lead Generation</span>
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">Engineering Stamps (PE/SE)</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="bg-green-800 text-white px-3 py-1 rounded-full text-sm font-medium">Site Survey</span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-700 mt-4">We do various projects - residential, commercial & industrial, and utility-scale projects.</p>
              </div>
              
              {/* Right side content */}
              <div className="flex-1 relative">
                <img 
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&h=300" 
                  alt="Solar panel installation" 
                  className="absolute inset-0 w-full h-full object-cover rounded-r-xl" 
                />
                
                <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium">🌞 Expert Solar Panel</p>
                  <p className="text-sm">Installation Services</p>
                  <p className="text-xs text-yellow-300">Your Solar Future</p>
                </div>
                
                <div className="absolute bottom-4 right-4">
                  <div className="gradient-green-yellow text-white px-6 py-3 rounded-lg font-bold text-xl">
                    MEE<span className="text-yellow-200">T</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="bg-white shadow-sm border border-slate-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Comments</h3>
          
          <div className="space-y-4">
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>No comments yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
