
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, ExternalLink, Eye } from 'lucide-react';
import { Task } from '@/types/Task';
import { Employee } from '@/types/Employee';
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
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    }
    
    const isOverdue = new Date(task.estimatedEndDate) < new Date();
    if (isOverdue) {
      return <Badge variant="destructive">In Progress</Badge>;
    }
    
    return <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors = {
      'Product': 'bg-purple-100 text-purple-800',
      'R&D': 'bg-teal-100 text-teal-800'
    };
    
    return (
      <Badge className={categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}>
        {category}
      </Badge>
    );
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Showing 1 to {tasks.length} of {tasks.length} records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Employee</TableHead>
                <TableHead className="font-semibold text-gray-700">Task Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Category</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Start Date</TableHead>
                <TableHead className="font-semibold text-gray-700">Est. End Date</TableHead>
                <TableHead className="font-semibold text-gray-700">Actual End Date</TableHead>
                <TableHead className="font-semibold text-gray-700">Tool Links</TableHead>
                <TableHead className="font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{task.employeeName}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{task.taskName}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {task.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {getCategoryBadge(task.category)}
                      <div className="text-xs text-gray-500 mt-1">
                        {task.category === 'Product' ? 'Multiple Products' : 'AI Research'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(task)}</TableCell>
                  <TableCell>{formatDate(task.startDate)}</TableCell>
                  <TableCell>{formatDate(task.estimatedEndDate)}</TableCell>
                  <TableCell>{formatDate(task.actualEndDate)}</TableCell>
                  <TableCell>
                    {task.toolLinks && task.toolLinks.length > 0 ? (
                      <div className="space-y-1">
                        {task.toolLinks.slice(0, 2).map((link) => (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="mr-1 h-3 w-3" />
                            {link.name}
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
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTask(task)}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
