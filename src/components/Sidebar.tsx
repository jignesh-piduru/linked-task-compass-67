
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  BarChart3, 
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
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
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
      "bg-gradient-to-b from-white to-slate-50 border-r border-slate-200/60 shadow-xl transition-all duration-300 ease-in-out flex flex-col backdrop-blur-sm",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
              TaskFlow
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-blue-100 transition-all duration-200 rounded-full p-2"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id || 
              (item.hasSubmenu && activeTab.startsWith('tasks-'));
            
            return (
              <div key={item.id}>
                <Button
                  variant="ghost"
                  onClick={item.hasSubmenu ? handleTasksClick : () => onTabChange(item.id)}
                  className={cn(
                    "w-full justify-start transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-md rounded-xl",
                    isActive && "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-lg border border-blue-200/50",
                    isCollapsed ? "px-2" : "px-4 py-3"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors duration-200", 
                    isActive ? "text-blue-600" : "",
                    isCollapsed ? "mr-0" : "mr-3"
                  )} />
                  {!isCollapsed && (
                    <span className="animate-fade-in flex-1 text-left font-medium">{item.label}</span>
                  )}
                  {!isCollapsed && item.hasSubmenu && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      tasksExpanded ? "rotate-180" : ""
                    )} />
                  )}
                </Button>
                
                {/* Submenu */}
                {item.hasSubmenu && !isCollapsed && tasksExpanded && (
                  <div className="ml-4 mt-2 space-y-1 animate-fade-in">
                    {item.submenu?.map((subItem) => (
                      <Button
                        key={subItem.id}
                        variant="ghost"
                        onClick={() => onTabChange(subItem.id)}
                        className={cn(
                          "w-full justify-start text-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-sm rounded-lg py-2",
                          activeTab === subItem.id && "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-100"
                        )}
                      >
                        <subItem.icon className="h-4 w-4 mr-3 text-blue-500" />
                        <span className="font-medium">{subItem.label}</span>
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
      <div className="p-4 border-t border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
        {!isCollapsed && (
          <div className="text-xs text-slate-500 animate-fade-in text-center">
            <div className="font-semibold text-blue-600">TaskFlow Premium</div>
            <div className="mt-1">© 2024 All Rights Reserved</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
