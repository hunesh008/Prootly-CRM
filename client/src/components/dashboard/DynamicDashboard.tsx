import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, LayoutDashboard, Trash2, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  KPIComponent,
  DonutComponent,
  TrendLineComponent,
  TableComponent,
  MapComponent,
  ChoroplethMapComponent,
  BarComponent,
  ColumnComponent,
  CalendarListComponent,
  CalendarCardComponent,
  ProgressBarComponent,
  type DashboardComponentProps,
} from "./DashboardComponents";

export interface DashboardItem {
  id: string;
  type: ComponentType;
  title: string;
}

export type ComponentType =
  | "kpi"
  | "donut"
  | "trend-line"
  | "table"
  | "map"
  | "choropleth-map"
  | "bar"
  | "column"
  | "calendar-list"
  | "calendar-card"
  | "progress-bar";

const componentOptions: {
  type: ComponentType;
  label: string;
  description: string;
}[] = [
  { type: "kpi", label: "KPI", description: "Key Performance Indicators" },
  { type: "donut", label: "Donut", description: "Donut/Pie Chart" },
  {
    type: "trend-line",
    label: "Trend Line",
    description: "Line Chart for Trends",
  },
  { type: "table", label: "Table", description: "Data Table" },
  { type: "map", label: "Map", description: "Geographic Map" },
  {
    type: "choropleth-map",
    label: "Choropleth Map",
    description: "Regional Heat Map",
  },
  { type: "bar", label: "Bar", description: "Horizontal Bar Chart" },
  { type: "column", label: "Column", description: "Vertical Column Chart" },
  {
    type: "calendar-list",
    label: "Calendar List",
    description: "Event List View",
  },
  {
    type: "calendar-card",
    label: "Calendar Card",
    description: "Calendar Grid View",
  },
  {
    type: "progress-bar",
    label: "Progress Bar",
    description: "Progress Indicators",
  },
];

const componentMap: Record<ComponentType, React.FC<DashboardComponentProps>> = {
  kpi: KPIComponent,
  donut: DonutComponent,
  "trend-line": TrendLineComponent,
  table: TableComponent,
  map: MapComponent,
  "choropleth-map": ChoroplethMapComponent,
  bar: BarComponent,
  column: ColumnComponent,
  "calendar-list": CalendarListComponent,
  "calendar-card": CalendarCardComponent,
  "progress-bar": ProgressBarComponent,
};

// Draggable wrapper component for dashboard items
interface DraggableComponentProps {
  item: DashboardItem;
  onRemove: (id: string) => void;
  isDragging?: boolean;
}

function DraggableComponent({
  item,
  onRemove,
  isDragging,
}: DraggableComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: item.id });

  // Only apply transform and transition, preserve all original styling
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.8 : 1,
  };

  const Component = componentMap[item.type];
  if (!Component) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group"
      data-testid={`draggable-${item.id}`}
    >
      {/* Enhanced Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-3 right-3 z-20 p-2 bg-white/95 dark:bg-[#2a2a2a]/95 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-lg cursor-grab hover:bg-slate-50 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm hover:shadow-md"
        data-testid={`drag-handle-${item.id}`}
        title="Drag to reorder"
      >
        <GripVertical className="w-4 h-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" />
      </div>

      {/* Component renders with original dimensions and styling */}
      <Component id={item.id} onRemove={onRemove} />
    </div>
  );
}

// Drop zone for removing components
interface TrashDropZoneProps {
  isOver: boolean;
}

function TrashDropZone({ isOver }: TrashDropZoneProps) {
  return (
    <div
      id="trash-zone"
      className={`fixed bottom-8 right-8 w-16 h-16 rounded-xl border-2 border-dashed transition-all duration-300 flex items-center justify-center z-50 backdrop-blur-sm ${
        isOver
          ? "border-red-500 bg-red-500/20 scale-110 shadow-lg shadow-red-500/30"
          : "border-slate-300 dark:border-slate-600 bg-white/90 dark:bg-[#2a2a2a]/90 hover:border-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/50"
      }`}
      data-testid="trash-drop-zone"
      title="Drop here to remove component"
    >
      <Trash2
        className={`w-6 h-6 transition-all duration-300 ${
          isOver 
            ? "text-red-500 scale-110" 
            : "text-slate-400 dark:text-slate-500 hover:text-red-400 dark:hover:text-red-400"
        }`}
      />
    </div>
  );
}

const STORAGE_KEY = "solaroot-dashboard-layout";

export default function DynamicDashboard() {
  const [dashboardItems, setDashboardItems] = useState<DashboardItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);

  // Load dashboard layout from localStorage on mount
  useEffect(() => {
    const savedLayout = localStorage.getItem(STORAGE_KEY);
    if (savedLayout) {
      try {
        const parsedLayout = JSON.parse(savedLayout);
        setDashboardItems(parsedLayout);
      } catch (error) {
        console.error("Failed to parse saved dashboard layout:", error);
        // Fall back to default layout
        setDashboardItems([
          { id: "kpi-1", type: "kpi", title: "KPI Overview" },
          { id: "trend-1", type: "trend-line", title: "Revenue Trend" },
          { id: "donut-1", type: "donut", title: "Project Status" },
          { id: "table-1", type: "table", title: "Projects Table" },
        ]);
      }
    } else {
      // Default layout for first-time users
      setDashboardItems([
        { id: "kpi-1", type: "kpi", title: "KPI Overview" },
        { id: "trend-1", type: "trend-line", title: "Revenue Trend" },
        { id: "donut-1", type: "donut", title: "Project Status" },
        { id: "table-1", type: "table", title: "Projects Table" },
      ]);
    }
  }, []);

  // Save dashboard layout to localStorage whenever items change
  useEffect(() => {
    if (dashboardItems.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dashboardItems));
    }
  }, [dashboardItems]);

  // Drag and drop sensors with constraints to preserve layout
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Slightly higher threshold to prevent accidental drags
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const addComponent = (type: ComponentType) => {
    const newId = `${type}-${Date.now()}`;
    const option = componentOptions.find((opt) => opt.type === type);
    const newItem: DashboardItem = {
      id: newId,
      type,
      title: option?.label || type,
    };
    setDashboardItems((prev) => [...prev, newItem]);
  };

  const removeComponent = (id: string) => {
    setDashboardItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Drag event handlers
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { over } = event;
    setIsOverTrash(over?.id === "trash-zone");
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);
    setIsOverTrash(false);

    if (!over) return;

    // Handle dropping in trash zone
    if (over.id === "trash-zone") {
      removeComponent(active.id as string);
      return;
    }

    // Handle reordering
    if (active.id !== over.id) {
      setDashboardItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const renderComponent = (item: DashboardItem) => {
    return (
      <DraggableComponent
        key={item.id}
        item={item}
        onRemove={removeComponent}
        isDragging={activeId === item.id}
      />
    );
  };

  // Get the active item for drag overlay
  const activeItem = dashboardItems.find((item) => item.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#1a1a1a] p-6 space-y-8 transition-colors duration-300">
        {/* Enhanced Dashboard Header */}
        <Card className="bg-white dark:bg-[#2a2a2a] border-0 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-[#00a15d] to-[#008a4f] rounded-xl shadow-sm">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    Solaroot Analytics
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Professional renewable energy management dashboard
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="gap-2 bg-gradient-to-r from-[#00a15d] to-[#008a4f] hover:from-[#008a4f] hover:to-[#00752f] text-white font-semibold px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      data-testid="button-add-component"
                    >
                      <Plus className="w-4 h-4" />
                      Add Component
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 bg-white dark:bg-[#2a2a2a] border border-slate-200 dark:border-slate-700 shadow-lg rounded-xl p-2"
                  >
                    {componentOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.type}
                        onClick={() => addComponent(option.type)}
                        className="flex flex-col items-start gap-1 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 focus:bg-slate-50 dark:focus:bg-slate-800 cursor-pointer transition-colors"
                        data-testid={`menu-item-${option.type}`}
                      >
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {option.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {option.description}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-700/30 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  Active: {dashboardItems.length}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/30 rounded-lg">
                <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Available: {componentOptions.length - dashboardItems.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Grid with Sortable Context */}
        {dashboardItems.length > 0 ? (
          <SortableContext
            items={dashboardItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
              {dashboardItems.map(renderComponent)}
            </div>
          </SortableContext>
        ) : (
          <Card className="bg-white dark:bg-[#2a2a2a] border-0 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="text-center py-16">
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <LayoutDashboard className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                Build Your Dashboard
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Add components to create your personalized renewable energy analytics view.
                Drag and drop to customize the layout.
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="gap-2 bg-gradient-to-r from-[#00a15d] to-[#008a4f] hover:from-[#008a4f] hover:to-[#00752f] text-white font-semibold px-8 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    data-testid="button-add-first-component"
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Component
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-56 bg-white dark:bg-[#2a2a2a] border-slate-200 dark:border-[#333333] text-slate-900 dark:text-[#f0f0f0]"
                >
                  {componentOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.type}
                      onClick={() => addComponent(option.type)}
                      className="flex flex-col items-start gap-1 p-3 hover:bg-slate-100 dark:hover:bg-[#333333] focus:bg-slate-100 dark:focus:bg-[#333333]"
                    >
                      <div className="font-medium text-slate-900 dark:text-[#f0f0f0]">
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-[#808080]">
                        {option.description}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Trash Drop Zone */}
      {activeId && (
        <div
          id="trash-zone"
          style={{ position: "fixed", bottom: 32, right: 32, zIndex: 1000 }}
        >
          <TrashDropZone isOver={isOverTrash} />
        </div>
      )}

      {/* Drag Overlay - preserves exact component dimensions */}
      <DragOverlay>
        {activeId && activeItem ? (
          <div className="shadow-2xl shadow-black/30 dark:shadow-black/50 rotate-1">
            {/* Render component without drag handle in overlay */}
            {(() => {
              const Component = componentMap[activeItem.type];
              return Component ? (
                <Component id={activeItem.id} onRemove={() => {}} />
              ) : null;
            })()}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
