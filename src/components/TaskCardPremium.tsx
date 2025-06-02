
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  Calendar, 
  User, 
  ChevronDown, 
  ChevronRight, 
  Plus,
  Edit,
  MoreHorizontal,
  CheckCircle
} from 'lucide-react';
import { Task } from '@/types/Task';
import { Employee } from '@/types/Employee';
import { cn } from '@/lib/utils';

interface TaskCardPremiumProps {
  task: Task & { subtasks?: Task[] };
  employees: Employee[];
  onTaskClick: (task: Task) => void;
  onEmployeeClick: (employeeName: string) => void;
  onTaskUpdate: (task: Task) => void;
  level?: number;
}

const TaskCardPremium = ({ 
  task, 
  employees, 
  onTaskClick, 
  onEmployeeClick, 
  onTaskUpdate,
  level = 0 
}: TaskCardPremiumProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  
  const isCompleted = !!task.actualEndDate;
  const isOverdue = !task.actualEndDate && new Date(task.estimatedEndDate) < new Date();

  const handleTaskComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTaskUpdate({
      ...task,
      actualEndDate: new Date().toISOString().split('T')[0]
    });
  };

  const getStatusBadge = () => {
    if (isCompleted) {
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    }
    if (isOverdue) {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    return <Badge variant="secondary">In Progress</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={cn("space-y-2", level > 0 && "ml-8 border-l-2 border-slate-200 pl-4")}>
      <Card 
        className={cn(
          "group cursor-pointer transition-all duration-200 hover:shadow-md border border-slate-200",
          isCompleted && "bg-green-50 border-green-200",
          isOverdue && "bg-red-50 border-red-200",
          level > 0 && "bg-slate-50"
        )}
        onClick={() => onTaskClick(task)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              {hasSubtasks && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className={cn(
                    "font-semibold text-slate-900 truncate",
                    isCompleted && "line-through text-slate-500"
                  )}>
                    {task.taskName}
                  </h3>
                  {getStatusBadge()}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <button
                      className="hover:text-blue-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEmployeeClick(task.employeeName);
                      }}
                    >
                      {task.employeeName}
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due {formatDate(task.estimatedEndDate)}</span>
                  </div>
                  
                  <Badge 
                    variant={task.category === 'Product' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {task.category}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {!isCompleted && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-green-600 hover:bg-green-100"
                  onClick={handleTaskComplete}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle edit
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle more options
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {task.description && (
          <CardContent className="pt-0 pb-3">
            <p className="text-sm text-slate-600 line-clamp-2">
              {task.description}
            </p>
          </CardContent>
        )}
      </Card>

      {/* Subtasks */}
      {hasSubtasks && isExpanded && (
        <div className="space-y-2 animate-fade-in">
          {task.subtasks!.map((subtask) => (
            <TaskCardPremium
              key={subtask.id}
              task={subtask}
              employees={employees}
              onTaskClick={onTaskClick}
              onEmployeeClick={onEmployeeClick}
              onTaskUpdate={onTaskUpdate}
              level={level + 1}
            />
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            className="ml-8 text-blue-600 hover:bg-blue-50"
            onClick={(e) => {
              e.stopPropagation();
              // Handle add subtask
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Subtask
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskCardPremium;
