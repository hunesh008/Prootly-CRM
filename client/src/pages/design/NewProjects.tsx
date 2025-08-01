import { useState, useEffect } from 'react';
import { Search, Edit, Activity, MoreHorizontal } from 'lucide-react';

// Types for project data
interface Project {
  id: string;
  customer: {
    name: string;
    address: string;
    initials: string;
    color: string;
  };
  projectDetails: string;
  keyDates: {
    created: string;
    received: string;
  };
  status: string;
  assignedTo?: string;
  countdown: string;
  autoComplete: string;
  priority?: string;
}

// Header Component
function Header() {
  return (
    <div className="flex items-center justify-between p-4 bg-[#1a1a1a] border-b border-gray-700">
      <div className="flex items-center space-x-4">
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium flex items-center space-x-2">
          <span>📍</span>
          <span>Planset</span>
          <span>▼</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search here..."
            className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md border border-gray-600 focus:border-green-500 focus:outline-none w-64"
          />
        </div>
      </div>
    </div>
  );
}

// Table Header Component
function TableHeader() {
  return (
    <div className="grid grid-cols-7 gap-4 p-4 bg-[#1a1a1a] border-b border-gray-700 text-sm font-medium text-gray-300 uppercase tracking-wide">
      <div>Customer Details</div>
      <div>Project Details</div>
      <div>Key Dates</div>
      <div>Status</div>
      <div>Assigned To</div>
      <div>Countdown</div>
      <div>Actions</div>
    </div>
  );
}

// Individual Row Component
function ProjectRow({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-7 gap-4 p-4 border-b border-gray-700 hover:bg-gray-800 transition-colors">
      {/* Customer Details */}
      <div className="flex items-center space-x-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: project.customer.color }}
        >
          {project.customer.initials}
        </div>
        <div>
          <div className="text-white font-medium">{project.customer.name}</div>
          <div className="text-gray-400 text-sm">{project.customer.address}</div>
        </div>
      </div>

      {/* Project Details */}
      <div className="text-white">{project.projectDetails}</div>

      {/* Key Dates */}
      <div className="text-gray-300 text-sm">
        <div><span className="font-medium">Created:</span> {project.keyDates.created}</div>
        <div><span className="font-medium">Received:</span> {project.keyDates.received}</div>
      </div>

      {/* Status */}
      <div className="flex flex-col space-y-1">
        <span className={`px-2 py-1 rounded text-xs font-medium w-fit ${
          project.status === 'IN PROGRESS' 
            ? 'bg-blue-600 text-white' 
            : project.status === 'READY FOR DESIGN'
            ? 'bg-teal-600 text-white'
            : 'bg-gray-600 text-white'
        }`}>
          {project.status}
        </span>
        {project.priority && (
          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium w-fit">
            {project.priority}
          </span>
        )}
      </div>

      {/* Assigned To */}
      <div className="text-gray-400 italic">
        {project.assignedTo || 'Not assigned'}
      </div>

      {/* Countdown */}
      <div className="text-gray-300 text-sm">
        <div>{project.countdown}</div>
        <div className="text-gray-400">{project.autoComplete}</div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium">
          Edit
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium">
          Activity
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-sm">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Table Component
function Table({ projects, loading, error }: { 
  projects: Project[]; 
  loading: boolean; 
  error: string | null; 
}) {
  if (loading) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg">
        <TableHeader />
        <div className="p-8 text-center">
          <div className="text-gray-400">Loading projects...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg">
        <TableHeader />
        <div className="p-8 text-center">
          <div className="text-red-400">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
      <TableHeader />
      <div>
        {projects.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No projects found
          </div>
        ) : (
          projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}

// Main New Projects Component
export default function NewProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch function
  const fetchProjectsData = async () => {
    try {
      setLoading(true);
      // Try the external API first, fallback to local mock data
      let response;
      try {
        response = await fetch('http://localhost:8000/api/new-projects-data/');
      } catch (externalError) {
        // If external API fails, use local mock endpoint
        response = await fetch('/api/new-projects-data');
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setProjects(data.projects);
      } else {
        setError('Failed to fetch projects data');
      }
    } catch (err) {
      setError((err as Error).message);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Effect for data fetching
  useEffect(() => {
    fetchProjectsData();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header />
      <div className="p-6">
        <Table projects={projects} loading={loading} error={error} />
      </div>
    </div>
  );
}