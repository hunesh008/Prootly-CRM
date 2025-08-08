import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  BarChart3,
  PieChart,
  LineChart,
  X,
  Eye,
  Download,
  Filter,
  Search,
  ChevronRight
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart as RechartsBarChart,
  Bar,
  AreaChart,
  Area
} from "recharts"

// Sample data with realistic renewable energy context
const sampleKPIData = [
  { 
    title: "Active Projects", 
    value: "124", 
    change: "+12%", 
    isPositive: true, 
    icon: Activity,
    subtitle: "This month"
  },
  { 
    title: "Team Members", 
    value: "48", 
    change: "+3", 
    isPositive: true, 
    icon: Users,
    subtitle: "Active staff"
  },
  { 
    title: "Monthly Revenue", 
    value: "$892K", 
    change: "+18%", 
    isPositive: true, 
    icon: DollarSign,
    subtitle: "vs last month"
  },
  { 
    title: "System Efficiency", 
    value: "94.2%", 
    change: "-1.2%", 
    isPositive: false, 
    icon: Calendar,
    subtitle: "Performance score"
  }
]

const sampleLineData = [
  { month: "Jan", solar: 45, wind: 38, hydro: 22 },
  { month: "Feb", solar: 52, wind: 42, hydro: 28 },
  { month: "Mar", solar: 48, wind: 39, hydro: 25 },
  { month: "Apr", solar: 61, wind: 47, hydro: 31 },
  { month: "May", solar: 55, wind: 44, hydro: 29 },
  { month: "Jun", solar: 67, wind: 51, hydro: 35 }
]

const sampleBarData = [
  { category: "Solar", value: 67, target: 75 },
  { category: "Wind", value: 51, target: 60 },
  { category: "Hydro", value: 35, target: 40 },
  { category: "Geothermal", value: 28, target: 35 }
]

const sampleDonutData = [
  { name: "Solar", value: 40, color: "#00a15d" },
  { name: "Wind", value: 30, color: "#f5c518" },
  { name: "Hydro", value: 20, color: "#3b82f6" },
  { name: "Other", value: 10, color: "#8b5cf6" }
]

const sampleAreaData = [
  { month: "Jan", efficiency: 78, target: 80 },
  { month: "Feb", efficiency: 82, target: 80 },
  { month: "Mar", efficiency: 79, target: 80 },
  { month: "Apr", efficiency: 85, target: 80 },
  { month: "May", efficiency: 88, target: 80 },
  { month: "Jun", efficiency: 91, target: 80 }
]

const sampleTableData = [
  { 
    id: 1, 
    project: "Solar Farm Alpha", 
    client: "GreenTech Corp", 
    status: "Active", 
    budget: "$450K", 
    progress: 85,
    completion: "2024-03-15"
  },
  { 
    id: 2, 
    project: "Wind Installation Beta", 
    client: "EcoEnergy Ltd", 
    status: "Review", 
    budget: "$680K", 
    progress: 60,
    completion: "2024-04-20"
  },
  { 
    id: 3, 
    project: "Hydro Plant Gamma", 
    client: "CleanPower Inc", 
    status: "Completed", 
    budget: "$920K", 
    progress: 100,
    completion: "2024-02-10"
  },
  { 
    id: 4, 
    project: "Solar Rooftop Delta", 
    client: "SustainaCorp", 
    status: "Planning", 
    budget: "$320K", 
    progress: 25,
    completion: "2024-05-30"
  }
]

const sampleCalendarEvents = [
  { 
    date: "2025-01-08", 
    title: "Project Review Meeting", 
    type: "meeting", 
    time: "10:00 AM",
    attendees: 8
  },
  { 
    date: "2025-01-09", 
    title: "Client Presentation", 
    type: "presentation", 
    time: "2:00 PM",
    attendees: 12
  },
  { 
    date: "2025-01-10", 
    title: "Installation Deadline", 
    type: "deadline", 
    time: "All Day",
    attendees: 0
  },
  { 
    date: "2025-01-11", 
    title: "Team Workshop", 
    type: "workshop", 
    time: "9:00 AM",
    attendees: 25
  }
]

const mapData = [
  { city: "San Francisco", lat: 37.7749, lng: -122.4194, projects: 12, capacity: "45MW" },
  { city: "Los Angeles", lat: 34.0522, lng: -118.2437, projects: 18, capacity: "67MW" },
  { city: "Seattle", lat: 47.6062, lng: -122.3321, projects: 8, capacity: "32MW" },
  { city: "Phoenix", lat: 33.4484, lng: -112.0740, projects: 15, capacity: "58MW" },
]

interface DashboardComponentProps {
  id: string
  onRemove?: (id: string) => void
}

// Modern KPI Component with improved design
export const KPIComponent: React.FC<DashboardComponentProps> = ({ id, onRemove }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
    {sampleKPIData.map((item, index) => {
      const Icon = item.icon
      return (
        <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(id)}
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {item.value}
                    </h3>
                    <Badge 
                      variant={item.isPositive ? "default" : "destructive"}
                      className={`text-xs font-medium ${
                        item.isPositive 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                      } border-0`}
                    >
                      {item.isPositive ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {item.change}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    })}
  </div>
)

// Modern Donut Chart Component
export const DonutComponent: React.FC<DashboardComponentProps> = ({ id, onRemove }) => (
  <Card className="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
            <PieChart className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-lg font-semibold">Energy Distribution</CardTitle>
        </div>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={sampleDonutData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {sampleDonutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Share']}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {sampleDonutData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm text-muted-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Modern Line Chart Component
export const LineComponent: React.FC<DashboardComponentProps> = ({ id, onRemove }) => (
  <Card className="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
            <LineChart className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-lg font-semibold">Energy Trends</CardTitle>
        </div>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={sampleLineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="solar" 
              stroke="#00a15d" 
              strokeWidth={2}
              dot={{ fill: '#00a15d', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="wind" 
              stroke="#f5c518" 
              strokeWidth={2}
              dot={{ fill: '#f5c518', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="hydro" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00a15d]" />
          <span className="text-sm font-medium">Solar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f5c518]" />
          <span className="text-sm font-medium">Wind</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
          <span className="text-sm font-medium">Hydro</span>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Modern Table Component
export const TableComponent: React.FC<DashboardComponentProps> = ({ id, onRemove }) => (
  <Card className="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-lg font-semibold">Active Projects</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(id)}
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="rounded-lg border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Project</TableHead>
              <TableHead className="font-semibold">Client</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Budget</TableHead>
              <TableHead className="font-semibold">Progress</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleTableData.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">{item.project}</TableCell>
                <TableCell>{item.client}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      item.status === 'Completed' ? 'default' :
                      item.status === 'Active' ? 'secondary' :
                      item.status === 'Review' ? 'outline' : 'destructive'
                    }
                    className={
                      item.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                      item.status === 'Active' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                      item.status === 'Review' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{item.budget}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={item.progress} className="w-16 h-2" />
                    <span className="text-sm font-medium">{item.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
)

// Modern Bar Chart Component
export const BarComponent: React.FC<DashboardComponentProps> = ({ id, onRemove }) => (
  <Card className="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-lg font-semibold">Energy Capacity</CardTitle>
        </div>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={sampleBarData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis 
              type="category" 
              dataKey="category" 
              stroke="var(--muted-foreground)" 
              fontSize={12}
              width={80}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Bar dataKey="value" fill="#00a15d" radius={[0, 4, 4, 0]} />
            <Bar dataKey="target" fill="#e5e7eb" radius={[0, 4, 4, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
)

// Modern Progress Bar Component
export const ProgressBarComponent: React.FC<DashboardComponentProps> = ({ id, onRemove }) => (
  <Card className="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-lg font-semibold">Project Progress</CardTitle>
        </div>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {sampleTableData.map((project) => (
          <div key={project.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{project.project}</span>
              <span className="text-sm text-muted-foreground">{project.progress}%</span>
            </div>
            <Progress 
              value={project.progress} 
              className="h-2" 
              style={{
                backgroundColor: 'var(--muted)',
              }}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{project.client}</span>
              <span>Due: {project.completion}</span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Modern Map Component (Simplified version)
export const MapComponent: React.FC<DashboardComponentProps> = ({ id, onRemove }) => (
  <Card className="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-lg font-semibold">Project Locations</CardTitle>
        </div>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">Interactive Map</p>
            <p className="text-xs text-muted-foreground">Click to view project locations</p>
          </div>
        </div>
        {/* Map markers */}
        <div className="absolute top-4 left-4 space-y-2">
          {mapData.map((location, index) => (
            <div key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium">{location.city}</p>
                  <p className="text-xs text-muted-foreground">{location.projects} projects • {location.capacity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
)

// Modern Calendar Component
export const CalendarComponent: React.FC<DashboardComponentProps> = ({ id, onRemove }) => (
  <Card className="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
        </div>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {sampleCalendarEvents.map((event, index) => (
          <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {new Date(event.date).getDate()}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate">
                {event.title}
              </h4>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-muted-foreground">{event.time}</span>
                {event.attendees > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {event.attendees} attendees
                  </span>
                )}
              </div>
            </div>
            <Badge 
              variant="outline"
              className={`text-xs ${
                event.type === 'meeting' ? 'border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400' :
                event.type === 'presentation' ? 'border-green-200 text-green-700 dark:border-green-800 dark:text-green-400' :
                event.type === 'deadline' ? 'border-red-200 text-red-700 dark:border-red-800 dark:text-red-400' :
                'border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-400'
              }`}
            >
              {event.type}
            </Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Export all components with consistent naming
export {
  KPIComponent as KPI,
  DonutComponent as Donut,
  LineComponent as TrendLine,
  TableComponent as Table,
  BarComponent as Bar,
  BarComponent as Column, // Using same component for both
  MapComponent as Map,
  MapComponent as ChoroplethMap, // Using same component for both
  CalendarComponent as CalendarList,
  CalendarComponent as CalendarCard, // Using same component for both
  ProgressBarComponent as ProgressBar
}