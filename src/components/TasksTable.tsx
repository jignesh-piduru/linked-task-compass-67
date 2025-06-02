
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, ExternalLink, Eye, Trash2 } from 'lucide-react';
import { Task } from '@/types/Task';
import { Employee } from '@/types/Employee';
import { useIsMobile } from '@/hooks/use-mobile';
import TaskDetailModal from './TaskDetailModal';

interface TasksTableProps {
  tasks: Task[];
  employees: Employee[];
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TasksTable: React.FC<TasksTableProps> = ({ 
  tasks, 
  employees, 
  onUpdate, 
  onDelete 
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const isMobile = useIsMobile();

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (task: Task) => {
    if (task.actualEndDate) {
      return (
        <Badge className="bg-green-500 text-white border-green-500 hover:bg-green-600">
          Completed
        </Badge>
      );
    }
    
    const isOverdue = new Date(task.estimatedEndDate) < new Date();
    if (isOverdue) {
      return (
        <Badge className="bg-red-500 text-white border-red-500 hover:bg-red-600">
          In Progress
        </Badge>
      );
    }
    
    return (
      <Badge className="bg-red-500 text-white border-red-500 hover:bg-red-600">
        In Progress
      </Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    return (
      <Badge 
        className={`
          ${category === 'Product' 
            ? 'bg-purple-100 text-purple-700 border-purple-200' 
            : 'bg-teal-100 text-teal-700 border-teal-200'
          } font-medium
        `}
      >
        {category}
      </Badge>
    );
  };

  const getCategorySubtext = (category: string) => {
    return category === 'Product' ? 'Multiple Products' : 'AI Research';
  };

  const handleDelete = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(taskId);
    }
  };

  // Mobile card view
  if (isMobile) {
    return (
      <>
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="shadow-sm border border-gray-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {task.taskName}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTask(task)}
                        className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    {getCategoryBadge(task.category)}
                    {getStatusBadge(task)}
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Employee:</span>
                      <span>{task.employeeName}</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Start:</span>
                      <span>{formatDate(task.startDate)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Due:</span>
                      <span>{formatDate(task.estimatedEndDate)}</span>
                    </div>
                    {task.actualEndDate && (
                      <div className="flex justify-between items-center">
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
          ))}
        </div>

        <TaskDetailModal
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          employees={employees}
          onUpdate={onUpdate}
        />
      </>
    );
  }

  // Desktop table view
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <ScrollArea className="w-full">
          <div className="min-w-[1200px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 px-6 py-4 text-left w-32">Employee</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-6 py-4 text-left min-w-80">Task Name</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-6 py-4 text-left w-32">Category</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-6 py-4 text-left w-32">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-6 py-4 text-left w-28">Start Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-6 py-4 text-left w-28">Est. End Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-6 py-4 text-left w-32">Actual End Date</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-6 py-4 text-left w-40">Tool Links</TableHead>
                  <TableHead className="font-semibold text-gray-700 px-6 py-4 text-left w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <TableCell className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {task.employeeName}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="font-semibold text-gray-900 mb-1">
                          {task.taskName}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {task.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="space-y-1">
                        {getCategoryBadge(task.category)}
                        <div className="text-xs text-gray-500">
                          {getCategorySubtext(task.category)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {getStatusBadge(task)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-700">
                      {formatDate(task.startDate)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-700">
                      {formatDate(task.estimatedEndDate)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-700">
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
                              className="flex items-center text-xs text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              <ExternalLink className="mr-1 h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{link.name}</span>
                            </a>
                          ))}
                          {task.toolLinks.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{task.toolLinks.length - 2} more
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">No links</span>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTask(task)}
                          className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(task.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        
        {tasks.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing 1 to {tasks.length} of {tasks.length} records
            </p>
          </div>
        )}
      </div>

      <TaskDetailModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        employees={employees}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default TasksTable;
