
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Eye, Trash2, Edit } from 'lucide-react';
import { Task } from '@/types/Task';
import { useNavigate } from 'react-router-dom';

interface TaskMobileCardProps {
  task: Task;
  onView: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
}

const TaskMobileCard: React.FC<TaskMobileCardProps> = ({ task, onView, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = () => {
    if (task.actualEndDate) {
      return (
        <Badge className="bg-green-500 text-white border-0 font-medium">
          Completed
        </Badge>
      );
    }
    
    const isOverdue = new Date(task.estimatedEndDate) < new Date();
    if (isOverdue) {
      return (
        <Badge className="bg-red-500 text-white border-0 font-medium">
          Overdue
        </Badge>
      );
    }
    
    return (
      <Badge className="bg-blue-500 text-white border-0 font-medium">
        In Progress
      </Badge>
    );
  };

  const getCategoryBadge = () => {
    return (
      <Badge 
        className={`
          ${task.category === 'Product' 
            ? 'bg-purple-100 text-purple-800 border-purple-200' 
            : 'bg-teal-100 text-teal-800 border-teal-200'
          } font-medium
        `}
      >
        {task.category}
      </Badge>
    );
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task);
    } else {
      console.log('Edit functionality not implemented yet');
    }
  };

  const handleEmployeeClick = () => {
    // Navigate to employee profile using employee name as URL parameter
    const employeeUrlName = task.employeeName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/user/${employeeUrlName}`);
  };

  return (
    <Card className="shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {task.taskName}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {task.description}
              </p>
            </div>
            <div className="flex gap-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(task)}
                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-full"
                title="View Task"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50 hover:text-gray-700 rounded-full"
                title="Edit Task"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full"
                title="Delete Task"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {getCategoryBadge()}
            {getStatusBadge()}
          </div>
          
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span className="font-medium">Employee:</span>
              <button
                onClick={handleEmployeeClick}
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer font-medium"
              >
                {task.employeeName}
              </button>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Start:</span>
              <span>{formatDate(task.startDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Due:</span>
              <span>{formatDate(task.estimatedEndDate)}</span>
            </div>
            {task.actualEndDate && (
              <div className="flex justify-between">
                <span className="font-medium">Completed:</span>
                <span>{formatDate(task.actualEndDate)}</span>
              </div>
            )}
          </div>
          
          {task.toolLinks && task.toolLinks.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs font-medium text-gray-600 mb-1">
                Tool Links ({task.toolLinks.length})
              </div>
              <div className="flex flex-wrap gap-1">
                {task.toolLinks.slice(0, 2).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    <span className="truncate max-w-20">{link.name}</span>
                  </a>
                ))}
                {task.toolLinks.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{task.toolLinks.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskMobileCard;
