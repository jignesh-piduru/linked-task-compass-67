
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Edit, 
  X, 
  Save, 
  Calendar, 
  User, 
  Link,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Task } from '@/types/Task';

interface TaskDetailsProps {
  tasks?: Task[];
  onTaskUpdate?: (task: Task) => void;
}

const TaskDetails = ({ tasks = [], onTaskUpdate }: TaskDetailsProps) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  
  const task = tasks.find(t => t.id === taskId);

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  if (!task || !editedTask) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Task Not Found</h2>
            <p className="text-gray-600 mb-4">The requested task could not be found.</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    if (onTaskUpdate && editedTask) {
      onTaskUpdate(editedTask);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const isCompleted = !!task.actualEndDate;
  const isOverdue = !task.actualEndDate && new Date(task.estimatedEndDate) < new Date();

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="hover:bg-slate-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Task
              </Button>
            )}
          </div>
        </div>

        {/* Task Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {isEditing ? (
                      <Input
                        value={editedTask.taskName}
                        onChange={(e) => setEditedTask({...editedTask, taskName: e.target.value})}
                        className="text-2xl font-bold border-0 px-0 focus-visible:ring-0"
                      />
                    ) : (
                      <CardTitle className="text-2xl text-slate-900">{task.taskName}</CardTitle>
                    )}
                  </div>
                  {getStatusBadge()}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Description</h3>
                  {isEditing ? (
                    <Textarea
                      value={editedTask.description}
                      onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                      className="min-h-[120px]"
                      placeholder="Task description..."
                    />
                  ) : (
                    <p className="text-slate-600 leading-relaxed">{task.description}</p>
                  )}
                </div>

                {/* Tool Links */}
                {task.toolLinks.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                      <Link className="mr-2 h-5 w-5" />
                      Tool Links
                    </h3>
                    <div className="space-y-2">
                      {task.toolLinks.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="font-medium text-blue-600">{link.name}</div>
                          <div className="text-sm text-slate-500 truncate">{link.url}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Info */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Task Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-500">Assigned to</p>
                    <p className="font-medium text-slate-900">{task.employeeName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-500">Start Date</p>
                    <p className="font-medium text-slate-900">{formatDate(task.startDate)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-500">Due Date</p>
                    <p className="font-medium text-slate-900">{formatDate(task.estimatedEndDate)}</p>
                  </div>
                </div>

                {task.actualEndDate && (
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-slate-500">Completed Date</p>
                      <p className="font-medium text-green-700">{formatDate(task.actualEndDate)}</p>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <p className="text-sm text-slate-500 mb-2">Category</p>
                  <Badge 
                    variant={task.category === 'Product' ? 'default' : 'secondary'}
                    className="text-sm"
                  >
                    {task.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {!isCompleted && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      const completedTask = {
                        ...task,
                        actualEndDate: new Date().toISOString().split('T')[0]
                      };
                      if (onTaskUpdate) {
                        onTaskUpdate(completedTask);
                      }
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Completed
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
