
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar,
  User,
  FileText,
  Flag,
  Clock,
  CheckCircle,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { Task } from '@/types/Task';
import { Employee } from '@/types/Employee';

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  onUpdate: (task: Task) => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  employees,
  onUpdate
}) => {
  if (!task) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isCompleted = !!task.actualEndDate;
  const isOverdue = !isCompleted && new Date(task.estimatedEndDate) < new Date();
  
  const getPriorityLevel = () => {
    if (isOverdue) return 'High';
    const daysUntilDue = Math.ceil((new Date(task.estimatedEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilDue <= 7) return 'Medium';
    return 'Low';
  };

  const getStatusDisplay = () => {
    if (isCompleted) {
      return (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <Badge className="bg-green-100 text-green-800">Completed</Badge>
        </div>
      );
    }
    
    if (isOverdue) {
      return (
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <Badge variant="destructive">Overdue</Badge>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-orange-600" />
        <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>
      </div>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMarkCompleted = () => {
    const updatedTask = {
      ...task,
      actualEndDate: new Date().toISOString().split('T')[0]
    };
    onUpdate(updatedTask);
  };

  const handleMarkIncomplete = () => {
    const updatedTask = {
      ...task,
      actualEndDate: ''
    };
    onUpdate(updatedTask);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            {task.taskName}
            {getStatusDisplay()}
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            Task Details and Information
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{task.description}</p>
              </CardContent>
            </Card>

            {task.toolLinks && task.toolLinks.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Tool Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {task.toolLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-600 hover:text-blue-800">
                          {link.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Task Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Assigned To</p>
                    <p className="font-medium">{task.employeeName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Flag className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <Badge className={getPriorityColor(getPriorityLevel())}>
                      {getPriorityLevel()}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <Badge variant={task.category === 'Product' ? 'default' : 'secondary'}>
                      {task.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{formatDate(task.startDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className="font-medium">{formatDate(task.estimatedEndDate)}</p>
                  </div>
                </div>

                {task.actualEndDate && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Completed Date</p>
                      <p className="font-medium text-green-700">{formatDate(task.actualEndDate)}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {!isCompleted ? (
                  <Button 
                    onClick={handleMarkCompleted}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={handleMarkIncomplete}
                    className="w-full"
                  >
                    Mark as Incomplete
                  </Button>
                )}
                
                <Button variant="outline" className="w-full">
                  Edit Task
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailModal;
