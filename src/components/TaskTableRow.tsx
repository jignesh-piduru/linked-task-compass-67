
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Edit, ExternalLink, Eye, Trash2 } from 'lucide-react';
import { Task } from '@/types/Task';
import { useNavigate } from 'react-router-dom';

interface TaskTableRowProps {
  task: Task;
  index: number;
  onView: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
}

const TaskTableRow: React.FC<TaskTableRowProps> = ({ task, index, onView, onDelete, onEdit }) => {
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

  const getCategorySubtext = () => {
    return task.category === 'Product' ? 'Multiple Products' : 'AI Research';
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
    <TableRow 
      className={`
        hover:bg-blue-50 border-b border-gray-100 transition-colors duration-200
        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
      `}
    >
      <TableCell className="px-6 py-4">
        <button
          onClick={handleEmployeeClick}
          className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer text-left"
        >
          {task.employeeName}
        </button>
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="max-w-xs">
          <div className="font-bold text-gray-900 mb-1">
            {task.taskName}
          </div>
          <div className="text-sm text-gray-600 line-clamp-2">
            {task.description}
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="space-y-1">
          {getCategoryBadge()}
          <div className="text-xs text-gray-500 font-medium">
            {getCategorySubtext()}
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4">
        {getStatusBadge()}
      </TableCell>
      <TableCell className="px-6 py-4 text-gray-700 font-medium">
        {formatDate(task.startDate)}
      </TableCell>
      <TableCell className="px-6 py-4 text-gray-700 font-medium">
        {formatDate(task.estimatedEndDate)}
      </TableCell>
      <TableCell className="px-6 py-4 text-gray-700 font-medium">
        {formatDate(task.actualEndDate)}
      </TableCell>
      <TableCell className="px-6 py-4">
        {task.toolLinks && task.toolLinks.length > 0 ? (
          <div className="space-y-1 max-w-40">
            {task.toolLinks.slice(0, 2).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
              >
                <ExternalLink className="mr-1 h-3 w-3 flex-shrink-0" />
                <span className="truncate">{link.name}</span>
              </a>
            ))}
            {task.toolLinks.length > 2 && (
              <div className="text-xs text-gray-500 font-medium">
                +{task.toolLinks.length - 2} more
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-400 text-sm font-medium">No links</span>
        )}
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(task)}
            className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-full"
            title="View Task"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-100 hover:text-gray-700 rounded-full"
            title="Edit Task"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-full"
            title="Delete Task"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TaskTableRow;
