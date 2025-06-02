
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  BarChart3, 
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
    setTasksExpanded(!tasksExpanded);
    onTabChange('tasks-all');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-white to-slate-50 border-r border-slate-200/60 shadow-xl flex flex-col backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
            TaskFlow
          </h2>
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
                    "w-full justify-start transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-md rounded-xl px-4 py-3",
                    isActive && "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-lg border border-blue-200/50"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors duration-200 mr-3", 
                    isActive ? "text-blue-600" : ""
                  )} />
                  <span className="animate-fade-in flex-1 text-left font-medium">{item.label}</span>
                  {item.hasSubmenu && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      tasksExpanded ? "rotate-180" : ""
                    )} />
                  )}
                </Button>
                
                {/* Submenu */}
                {item.hasSubmenu && tasksExpanded && (
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
        <div className="text-xs text-slate-500 animate-fade-in text-center">
          <div className="font-semibold text-blue-600">TaskFlow</div>
          <div className="mt-1">© 2024 All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
