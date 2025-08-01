import { useState, useEffect } from 'react';
import { Search, Edit, Activity, MoreHorizontal, Filter, Download, ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';

// Theme styles EXACTLY matching screenshots
const themeStyles = {
  dark: {
    background: '#1a1a1a',           // Main background from screenshot
    cardBackground: '#1f1f1f',       // Table rows from screenshot
    headerBackground: '#2a2a2a',     // Header from screenshot
    textPrimary: '#ffffff',          // White text from screenshot
    textSecondary: '#9ca3af',        // Gray text from screenshot
    border: '#333333',               // Border color from screenshot
    hoverBackground: '#2a2a2a',      // Row hover from screenshot
    plansetButton: '#ffd700',        // Yellow button from screenshot
    filterButton: '#10b981',         // Green filter from screenshot
    searchBackground: '#2a2a2a',     // Search input from screenshot
    searchBorder: '#404040'          // Search border from screenshot
  },
  light: {
    background: '#ffffff',           // Light main background
    cardBackground: '#ffffff',       // Light table rows
    headerBackground: '#f8f9fa',     // Light header
    textPrimary: '#1a1a1a',         // Dark text
    textSecondary: '#6b7280',       // Gray text
    border: '#e5e7eb',              // Light border
    hoverBackground: '#f9fafb',     // Light row hover
    plansetButton: '#ffd700',        // Same yellow button
    filterButton: '#10b981',         // Same green filter
    searchBackground: '#ffffff',     // White search input
    searchBorder: '#d1d5db'         // Light search border
  }
};

// Status badge colors EXACTLY from screenshot
const statusColors = {
  'IN PROGRESS': '#3b82f6',         // Exact blue from screenshot
  'READY FOR DESIGN': '#06b6d4'     // Exact teal from screenshot
};

// Priority badge colors EXACTLY from screenshot
const priorityColors = {
  'HIGH': '#ef4444'                 // Exact red from screenshot
};

// Avatar colors EXACTLY from screenshot
const avatarColors = [
  '#4ecdc4', '#ff6b6b', '#45b7d1', '#f9ca24', 
  '#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e'
];

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

// Advanced table types
type SortDirection = 'asc' | 'desc' | null;
type FilterType = 'all' | 'IN PROGRESS' | 'READY FOR DESIGN';

interface TableFilters {
  status: FilterType;
  search: string;
  dateRange: {
    start: string;
    end: string;
  };
}

// Enhanced Header Component
function Header({ 
  filters, 
  onFiltersChange, 
  onExport, 
  isDarkMode, 
  onThemeToggle 
}: {
  filters: TableFilters;
  onFiltersChange: (filters: TableFilters) => void;
  onExport: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}) {
  const theme = isDarkMode ? themeStyles.dark : themeStyles.light;

  return (
    <div 
      className="flex items-center justify-between p-4 border-b"
      style={{ 
        backgroundColor: theme.headerBackground, 
        borderColor: theme.border 
      }}
    >
      <div className="flex items-center space-x-4">
        <button 
          className="px-4 py-2 rounded-md font-medium flex items-center space-x-2 text-black"
          style={{ backgroundColor: theme.plansetButton }}
        >
          <span>📍</span>
          <span>Planset</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {/* Status Filter */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({
              ...filters,
              status: e.target.value as FilterType
            })}
            className="px-3 py-2 rounded-md text-white font-medium border-none outline-none appearance-none cursor-pointer"
            style={{ backgroundColor: theme.filterButton }}
          >
            <option value="all" style={{ backgroundColor: '#2a2a2a', color: 'white' }}>All Status</option>
            <option value="IN PROGRESS" style={{ backgroundColor: '#2a2a2a', color: 'white' }}>In Progress</option>
            <option value="READY FOR DESIGN" style={{ backgroundColor: '#2a2a2a', color: 'white' }}>Ready for Design</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="px-3 py-2 rounded-md border flex items-center space-x-2"
          style={{ 
            borderColor: theme.border,
            backgroundColor: theme.cardBackground,
            color: theme.textPrimary
          }}
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Advanced Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
                 style={{ color: theme.textSecondary }} />
          <input
            type="text"
            placeholder="Search here..."
            value={filters.search}
            onChange={(e) => onFiltersChange({
              ...filters,
              search: e.target.value
            })}
            className="pl-10 pr-4 py-2 rounded-md border focus:outline-none w-64"
            style={{ 
              backgroundColor: theme.searchBackground,
              color: theme.textPrimary,
              borderColor: theme.searchBorder
            }}
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          className="px-3 py-2 rounded-md border"
          style={{ 
            borderColor: theme.border,
            backgroundColor: theme.cardBackground,
            color: theme.textPrimary
          }}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
}

// Enhanced Table Header Component
function TableHeader({ 
  sortField, 
  sortDirection, 
  onSort, 
  isDarkMode 
}: {
  sortField: string | null;
  sortDirection: SortDirection;
  onSort: (field: string) => void;
  isDarkMode: boolean;
}) {
  const theme = isDarkMode ? themeStyles.dark : themeStyles.light;

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  const headerClass = "flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity";

  return (
    <div 
      className="grid grid-cols-7 gap-4 p-4 border-b text-sm font-medium uppercase tracking-wide"
      style={{ 
        backgroundColor: theme.headerBackground,
        borderColor: theme.border,
        color: theme.textSecondary
      }}
    >
      <div className={headerClass} onClick={() => onSort('customer')}>
        <span>Customer Details</span>
        {getSortIcon('customer')}
      </div>
      <div className={headerClass} onClick={() => onSort('project')}>
        <span>Project Details</span>
        {getSortIcon('project')}
      </div>
      <div className={headerClass} onClick={() => onSort('created')}>
        <span>Key Dates</span>
        {getSortIcon('created')}
      </div>
      <div className={headerClass} onClick={() => onSort('status')}>
        <span>Status</span>
        {getSortIcon('status')}
      </div>
      <div className={headerClass} onClick={() => onSort('assigned')}>
        <span>Assigned To</span>
        {getSortIcon('assigned')}
      </div>
      <div className={headerClass} onClick={() => onSort('countdown')}>
        <span>Countdown</span>
        {getSortIcon('countdown')}
      </div>
      <div>Actions</div>
    </div>
  );
}

// Enhanced Individual Row Component
function ProjectRow({ project, isDarkMode }: { project: Project; isDarkMode: boolean }) {
  const theme = isDarkMode ? themeStyles.dark : themeStyles.light;

  return (
    <div 
      className="grid grid-cols-7 gap-4 p-4 border-b transition-colors hover:cursor-pointer"
      style={{ 
        borderColor: theme.border,
        backgroundColor: theme.cardBackground
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.hoverBackground;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.cardBackground;
      }}
    >
      {/* Customer Details */}
      <div className="flex items-center space-x-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: project.customer.color }}
        >
          {project.customer.initials}
        </div>
        <div>
          <div className="font-medium" style={{ color: theme.textPrimary }}>
            {project.customer.name}
          </div>
          <div className="text-sm" style={{ color: theme.textSecondary }}>
            {project.customer.address}
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div style={{ color: theme.textPrimary }}>{project.projectDetails}</div>

      {/* Key Dates */}
      <div className="text-sm" style={{ color: theme.textSecondary }}>
        <div><span className="font-medium">Created:</span> {project.keyDates.created}</div>
        <div><span className="font-medium">Received:</span> {project.keyDates.received}</div>
      </div>

      {/* Status */}
      <div className="flex flex-col space-y-1">
        <span 
          className="px-2 py-1 rounded text-xs font-medium w-fit text-white"
          style={{ 
            backgroundColor: statusColors[project.status as keyof typeof statusColors] || '#6b7280'
          }}
        >
          {project.status}
        </span>
        {project.priority && (
          <span 
            className="px-2 py-1 rounded text-xs font-medium w-fit text-white"
            style={{ 
              backgroundColor: priorityColors[project.priority as keyof typeof priorityColors]
            }}
          >
            {project.priority}
          </span>
        )}
      </div>

      {/* Assigned To */}
      <div className="italic" style={{ color: theme.textSecondary }}>
        {project.assignedTo || 'Not assigned'}
      </div>

      {/* Countdown */}
      <div className="text-sm">
        <div style={{ color: theme.textPrimary }}>{project.countdown}</div>
        <div style={{ color: theme.textSecondary }}>{project.autoComplete}</div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
          Edit
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
          Activity
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-sm transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Enhanced Table Component
function Table({ 
  projects, 
  loading, 
  error, 
  sortField, 
  sortDirection, 
  onSort, 
  isDarkMode,
  pagination,
  onPageChange
}: { 
  projects: Project[]; 
  loading: boolean; 
  error: string | null;
  sortField: string | null;
  sortDirection: SortDirection;
  onSort: (field: string) => void;
  isDarkMode: boolean;
  pagination: {
    current: number;
    total: number;
    size: number;
  };
  onPageChange: (page: number) => void;
}) {
  const theme = isDarkMode ? themeStyles.dark : themeStyles.light;

  if (loading) {
    return (
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: theme.cardBackground }}>
        <TableHeader 
          sortField={sortField} 
          sortDirection={sortDirection} 
          onSort={onSort} 
          isDarkMode={isDarkMode} 
        />
        <div className="p-8 text-center">
          <div style={{ color: theme.textSecondary }}>Loading projects...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: theme.cardBackground }}>
        <TableHeader 
          sortField={sortField} 
          sortDirection={sortDirection} 
          onSort={onSort} 
          isDarkMode={isDarkMode} 
        />
        <div className="p-8 text-center">
          <div className="text-red-400">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 rounded-md border"
            style={{ 
              borderColor: theme.border,
              backgroundColor: theme.headerBackground,
              color: theme.textPrimary
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden" style={{ backgroundColor: theme.cardBackground }}>
      <TableHeader 
        sortField={sortField} 
        sortDirection={sortDirection} 
        onSort={onSort} 
        isDarkMode={isDarkMode} 
      />
      <div>
        {projects.length === 0 ? (
          <div className="p-8 text-center" style={{ color: theme.textSecondary }}>
            No projects found
          </div>
        ) : (
          projects.map((project) => (
            <ProjectRow key={project.id} project={project} isDarkMode={isDarkMode} />
          ))
        )}
      </div>
      
      {/* Pagination */}
      {pagination.total > 1 && (
        <div 
          className="flex items-center justify-between p-4 border-t"
          style={{ 
            borderColor: theme.border,
            backgroundColor: theme.headerBackground
          }}
        >
          <div style={{ color: theme.textSecondary }}>
            Showing {((pagination.current - 1) * pagination.size) + 1} to{' '}
            {Math.min(pagination.current * pagination.size, projects.length)} of{' '}
            {projects.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(pagination.current - 1)}
              disabled={pagination.current === 1}
              className="px-3 py-1 rounded border disabled:opacity-50"
              style={{ 
                borderColor: theme.border,
                backgroundColor: theme.cardBackground,
                color: theme.textPrimary
              }}
            >
              Previous
            </button>
            <span style={{ color: theme.textPrimary }}>
              {pagination.current} / {pagination.total}
            </span>
            <button
              onClick={() => onPageChange(pagination.current + 1)}
              disabled={pagination.current === pagination.total}
              className="px-3 py-1 rounded border disabled:opacity-50"
              style={{ 
                borderColor: theme.border,
                backgroundColor: theme.cardBackground,
                color: theme.textPrimary
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Main Enhanced New Projects Component
export default function NewProjects() {
  // State management
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Table controls
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  
  // Filters
  const [filters, setFilters] = useState<TableFilters>({
    status: 'all',
    search: '',
    dateRange: {
      start: '',
      end: ''
    }
  });

  const theme = isDarkMode ? themeStyles.dark : themeStyles.light;

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
        setAllProjects(data.projects);
        setFilteredProjects(data.projects);
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

  // Sorting function
  const handleSort = (field: string) => {
    let newDirection: SortDirection = 'asc';
    
    if (sortField === field) {
      if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else if (sortDirection === 'desc') {
        newDirection = null;
      }
    }
    
    setSortField(newDirection ? field : null);
    setSortDirection(newDirection);
  };

  // Filtering and sorting logic
  useEffect(() => {
    let filtered = [...allProjects];

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(project => project.status === filters.status);
    }

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(project => 
        project.customer.name.toLowerCase().includes(searchTerm) ||
        project.customer.address.toLowerCase().includes(searchTerm) ||
        project.projectDetails.toLowerCase().includes(searchTerm) ||
        project.status.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortField) {
          case 'customer':
            aValue = a.customer.name;
            bValue = b.customer.name;
            break;
          case 'project':
            aValue = a.projectDetails;
            bValue = b.projectDetails;
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
            break;
          case 'created':
            aValue = new Date(a.keyDates.created);
            bValue = new Date(b.keyDates.created);
            break;
          case 'assigned':
            aValue = a.assignedTo || '';
            bValue = b.assignedTo || '';
            break;
          case 'countdown':
            aValue = a.countdown;
            bValue = b.countdown;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allProjects, filters, sortField, sortDirection]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

  // Export function
  const handleExport = () => {
    const csvData = filteredProjects.map(project => ({
      'Customer Name': project.customer.name,
      'Customer Address': project.customer.address,
      'Project Details': project.projectDetails,
      'Created Date': project.keyDates.created,
      'Received Date': project.keyDates.received,
      'Status': project.status,
      'Assigned To': project.assignedTo || 'Not assigned',
      'Countdown': project.countdown,
      'Priority': project.priority || 'Normal'
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `projects-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Effect for data fetching
  useEffect(() => {
    fetchProjectsData();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        filters={filters}
        onFiltersChange={setFilters}
        onExport={handleExport}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />
      <div className="p-6">
        <Table 
          projects={paginatedProjects}
          loading={loading}
          error={error}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          isDarkMode={isDarkMode}
          pagination={{
            current: currentPage,
            total: totalPages,
            size: pageSize
          }}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}