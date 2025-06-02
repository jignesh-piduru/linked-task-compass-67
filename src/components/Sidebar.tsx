
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  List,
  CheckCircle,
  CalendarDays
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tasksExpanded, setTasksExpanded] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'tasks', 
      label: 'Tasks', 
      icon: CheckSquare,
      hasSubmenu: true,
      submenu: [
        { id: 'tasks-today', label: "Today's Tasks", icon: Clock },
        { id: 'tasks-all', label: 'All Tasks', icon: List },
        { id: 'tasks-completed', label: 'Completed Tasks', icon: CheckCircle },
        { id: 'tasks-future', label: 'Future Tasks', icon: CalendarDays },
      ]
    },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTasksClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setTasksExpanded(true);
    } else {
      setTasksExpanded(!tasksExpanded);
    }
    onTabChange('tasks-all');
  };

  return (
    <div className={cn(
      "bg-white border-r border-slate-200 shadow-lg transition-all duration-300 ease-in-out flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-slate-900 animate-fade-in">
              TaskFlow
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-slate-100 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id || 
              (item.hasSubmenu && activeTab.startsWith('tasks-'));
            
            return (
              <div key={item.id}>
                <Button
                  variant="ghost"
                  onClick={item.hasSubmenu ? handleTasksClick : () => onTabChange(item.id)}
                  className={cn(
                    "w-full justify-start transition-all duration-200 hover:bg-blue-50 hover:text-blue-700",
                    isActive && "bg-blue-100 text-blue-700 border-r-2 border-blue-500",
                    isCollapsed ? "px-2" : "px-3"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
                  {!isCollapsed && (
                    <span className="animate-fade-in flex-1 text-left">{item.label}</span>
                  )}
                  {!isCollapsed && item.hasSubmenu && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      tasksExpanded ? "rotate-180" : ""
                    )} />
                  )}
                </Button>
                
                {/* Submenu */}
                {item.hasSubmenu && !isCollapsed && tasksExpanded && (
                  <div className="ml-6 mt-1 space-y-1 animate-fade-in">
                    {item.submenu?.map((subItem) => (
                      <Button
                        key={subItem.id}
                        variant="ghost"
                        onClick={() => onTabChange(subItem.id)}
                        className={cn(
                          "w-full justify-start text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-700",
                          activeTab === subItem.id && "bg-blue-100 text-blue-700"
                        )}
                      >
                        <subItem.icon className="h-4 w-4 mr-3" />
                        <span>{subItem.label}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        {!isCollapsed && (
          <div className="text-xs text-slate-500 animate-fade-in">
            © 2024 TaskFlow Premium
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
