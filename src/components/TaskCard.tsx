
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  User, 
  Edit, 
  Trash2, 
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Task } from '@/types/Task';
import { Employee } from '@/types/Employee';

interface TaskCardProps {
  task: Task;
  employees: Employee[];
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, employees, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

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

  const isCompleted = !!task.actualEndDate;
  const isOverdue = !isCompleted && new Date(task.estimatedEndDate) < new Date();

  return (
    <Card className={`hover:shadow-lg transition-shadow ${isCompleted ? 'bg-green-50 border-green-200' : isOverdue ? 'bg-red-50 border-red-200' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {task.taskName}
              {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
              {isOverdue && <Clock className="h-5 w-5 text-red-600" />}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{task.category}</Badge>
              {isCompleted && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
              {isOverdue && <Badge variant="destructive">Overdue</Badge>}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-slate-600 mb-4">{task.description}</p>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm text-slate-500">
            <User className="mr-2 h-4 w-4" />
            Assigned to: {task.employeeName}
          </div>
          
          <div className="flex items-center text-sm text-slate-500">
            <Calendar className="mr-2 h-4 w-4" />
            Start: {new Date(task.startDate).toLocaleDateString()}
          </div>
          
          <div className="flex items-center text-sm text-slate-500">
            <Calendar className="mr-2 h-4 w-4" />
            Due: {new Date(task.estimatedEndDate).toLocaleDateString()}
          </div>
          
          {task.actualEndDate && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed: {new Date(task.actualEndDate).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Tool Links Section */}
        {task.toolLinks && task.toolLinks.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Tool Links:</h4>
            <div className="space-y-2">
              {task.toolLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="mr-2 h-3 w-3" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-2 mt-4">
          {!isCompleted ? (
            <Button 
              onClick={handleMarkCompleted}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark Complete
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={handleMarkIncomplete}
            >
              Mark Incomplete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
