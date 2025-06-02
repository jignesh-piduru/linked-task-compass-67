
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Clock, ExternalLink, CheckCircle } from 'lucide-react';
import type { Task } from '@/types/Task';

interface TaskDetailsProps {
  task: Task;
}

const TaskDetails = ({ task }: TaskDetailsProps) => {
  const calculateDuration = () => {
    const start = new Date(task.startDate);
    const end = new Date(task.estimatedEndDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTaskStatus = () => {
    if (task.actualEndDate) {
      const estimated = new Date(task.estimatedEndDate);
      const actual = new Date(task.actualEndDate);
      if (actual <= estimated) {
        return { status: 'Completed On Time', variant: 'default' as const };
      } else {
        return { status: 'Completed Late', variant: 'destructive' as const };
      }
    }
    
    const today = new Date();
    const estimated = new Date(task.estimatedEndDate);
    if (today > estimated) {
      return { status: 'Overdue', variant: 'destructive' as const };
    } else {
      return { status: 'In Progress', variant: 'secondary' as const };
    }
  };

  const taskStatus = getTaskStatus();

  return (
    <div className="space-y-6">
      {/* Task Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{task.taskName}</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <Badge variant="secondary">{task.category}</Badge>
          <Badge variant={taskStatus.variant}>
            {taskStatus.status}
          </Badge>
          <span className="text-sm text-slate-500">Task ID: {task.id}</span>
        </div>
        <p className="text-slate-600 text-lg leading-relaxed mt-4">{task.description}</p>
      </div>

      {/* Task Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Start Date</p>
                <p className="text-slate-900">{new Date(task.startDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Estimated End Date</p>
                <p className="text-slate-900">{new Date(task.estimatedEndDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              {task.actualEndDate && (
                <div>
                  <p className="text-sm font-medium text-slate-500">Actual End Date</p>
                  <p className="text-slate-900">{new Date(task.actualEndDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-slate-500">Duration</p>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-slate-400" />
                  <p className="text-slate-900">
                    {calculateDuration()} days {task.actualEndDate ? 'completed' : 'estimated'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Assignment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Assigned To</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                    {task.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <p className="text-slate-900 font-medium">{task.employeeName}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Category</p>
                <Badge variant="outline" className="mt-1">{task.category}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Priority</p>
                <Badge variant="secondary" className="mt-1">
                  {task.category === 'R&D' ? 'High' : 'Medium'}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Status</p>
                <Badge variant={taskStatus.variant} className="mt-1">
                  {taskStatus.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tool Links */}
      <Card>
        <CardHeader>
          <CardTitle>Related Links & Tools</CardTitle>
        </CardHeader>
        <CardContent>
          {task.toolLinks.length === 0 ? (
            <p className="text-slate-500">No tool links available for this task.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {task.toolLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <span className="font-medium text-slate-900">{link.name}</span>
                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-500" />
                </a>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
