import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Link, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
import { Task } from '@/types/Task';
import { Employee } from '@/types/Employee';
import TaskForm from './TaskForm';

interface TaskCardProps {
  task: Task;
  employees: Employee[];
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard = ({ task, employees, onUpdate, onDelete }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const isOverdue = !task.actualEndDate && new Date(task.estimatedEndDate) < new Date();
  const isCompleted = !!task.actualEndDate;

  const handleUpdate = (updatedTask: Omit<Task, 'id'>) => {
    onUpdate({ ...updatedTask, id: task.id });
    setIsEditing(false);
  };

  const markAsCompleted = () => {
    onUpdate({
      ...task,
      actualEndDate: new Date().toISOString().split('T')[0]
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <Card className={`hover:shadow-lg transition-all duration-200 ${
        isCompleted ? 'bg-green-50 border-green-200' :
        isOverdue ? 'bg-red-50 border-red-200' : 
        'bg-white hover:bg-slate-50'
      }`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-slate-900 mb-2">
                {task.taskName}
              </CardTitle>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">{task.employeeName}</span>
              </div>
              <Badge 
                variant={task.category === 'Product' ? 'default' : 'secondary'}
                className={task.category === 'Product' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}
              >
                {task.category}
              </Badge>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>

          {/* Dates */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600">Started: {formatDate(task.startDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600">Due: {formatDate(task.estimatedEndDate)}</span>
              {isOverdue && !isCompleted && (
                <Badge variant="destructive" className="text-xs">Overdue</Badge>
              )}
            </div>
            {task.actualEndDate && (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-600">Completed: {formatDate(task.actualEndDate)}</span>
              </div>
            )}
          </div>

          {/* Tool Links */}
          {task.toolLinks.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                <Link className="h-4 w-4" />
                Tool Links
              </h4>
              <div className="space-y-1">
                {task.toolLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          {!isCompleted && (
            <Button
              onClick={markAsCompleted}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          )}
        </CardContent>
      </Card>

      {isEditing && (
        <TaskForm
          task={task}
          employees={employees}
          onSubmit={handleUpdate}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
