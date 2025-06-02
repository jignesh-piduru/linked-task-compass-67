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
  isCompletedTasks?: boolean;
}

const TasksTable: React.FC<TasksTableProps> = ({ 
  tasks, 
  employees, 
  onUpdate, 
  onDelete,
  isCompletedTasks = false
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
        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-sm font-medium">
          Completed
        </Badge>
      );
    }
    
    const isOverdue = new Date(task.estimatedEndDate) < new Date();
    if (isOverdue) {
      return (
        <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-sm font-medium">
          Overdue
        </Badge>
      );
    }
    
    return (
      <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-sm font-medium">
        In Progress
      </Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    return (
      <Badge 
        className={`
          ${category === 'Product' 
            ? 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border-purple-200 shadow-sm' 
            : 'bg-gradient-to-r from-teal-100 to-teal-50 text-teal-800 border-teal-200 shadow-sm'
          } font-medium backdrop-blur-sm
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
    const containerClass = isCompletedTasks 
      ? "space-y-4 max-h-[500px] overflow-y-auto scroll-smooth"
      : "space-y-4";

    return (
      <>
        <div className={containerClass}>
          {tasks.map((task) => (
            <Card key={task.id} className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm mb-2">
                        {task.taskName}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTask(task)}
                        className="h-9 w-9 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-full transition-all duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
                        className="h-9 w-9 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full transition-all duration-200"
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

  // Desktop table view with premium styling
  const tableContainerClass = isCompletedTasks 
    ? "bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-xl border-0 max-h-[500px] backdrop-blur-sm"
    : "bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-xl border-0 backdrop-blur-sm";

  const headerClass = isCompletedTasks
    ? "bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200 sticky top-0 z-20 backdrop-blur-sm"
    : "bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200 backdrop-blur-sm";

  return (
    <>
      <div className={tableContainerClass}>
        <ScrollArea className="h-full w-full">
          <div className="min-w-[1200px]">
            <Table>
              <TableHeader>
                <TableRow className={headerClass}>
                  <TableHead className="font-bold text-slate-800 px-6 py-5 text-left w-32">Employee</TableHead>
                  <TableHead className="font-bold text-slate-800 px-6 py-5 text-left min-w-80">Task Name</TableHead>
                  <TableHead className="font-bold text-slate-800 px-6 py-5 text-left w-32">Category</TableHead>
                  <TableHead className="font-bold text-slate-800 px-6 py-5 text-left w-32">Status</TableHead>
                  <TableHead className="font-bold text-slate-800 px-6 py-5 text-left w-28">Start Date</TableHead>
                  <TableHead className="font-bold text-slate-800 px-6 py-5 text-left w-28">Est. End Date</TableHead>
                  <TableHead className="font-bold text-slate-800 px-6 py-5 text-left w-32">Actual End Date</TableHead>
                  <TableHead className="font-bold text-slate-800 px-6 py-5 text-left w-40">Tool Links</TableHead>
                  <TableHead className="font-bold text-slate-800 px-6 py-5 text-left w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow 
                    key={task.id} 
                    className={`
                      hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                      border-b border-slate-100 transition-all duration-200
                      ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                    `}
                  >
                    <TableCell className="px-6 py-5">
                      <div className="font-semibold text-slate-900">
                        {task.employeeName}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      <div className="max-w-xs">
                        <div className="font-bold text-slate-900 mb-2">
                          {task.taskName}
                        </div>
                        <div className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {task.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      <div className="space-y-2">
                        {getCategoryBadge(task.category)}
                        <div className="text-xs text-slate-500 font-medium">
                          {getCategorySubtext(task.category)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      {getStatusBadge(task)}
                    </TableCell>
                    <TableCell className="px-6 py-5 text-slate-700 font-medium">
                      {formatDate(task.startDate)}
                    </TableCell>
                    <TableCell className="px-6 py-5 text-slate-700 font-medium">
                      {formatDate(task.estimatedEndDate)}
                    </TableCell>
                    <TableCell className="px-6 py-5 text-slate-700 font-medium">
                      {formatDate(task.actualEndDate)}
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      {task.toolLinks && task.toolLinks.length > 0 ? (
                        <div className="space-y-2 max-w-40">
                          {task.toolLinks.slice(0, 2).map((link) => (
                            <a
                              key={link.id}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 font-medium"
                            >
                              <ExternalLink className="mr-2 h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{link.name}</span>
                            </a>
                          ))}
                          {task.toolLinks.length > 2 && (
                            <div className="text-xs text-slate-500 font-medium">
                              +{task.toolLinks.length - 2} more
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm font-medium">No links</span>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTask(task)}
                          className="h-9 w-9 p-0 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-full transition-all duration-200"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0 text-slate-600 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-all duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(task.id)}
                          className="h-9 w-9 p-0 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-full transition-all duration-200"
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
          <ScrollBar orientation="horizontal" className="bg-slate-200" />
          {isCompletedTasks && <ScrollBar orientation="vertical" className="bg-slate-200" />}
        </ScrollArea>
        
        {tasks.length > 0 && !isCompletedTasks && (
          <div className="px-6 py-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
            <p className="text-sm text-slate-600 font-medium">
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
