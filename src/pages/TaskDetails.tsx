
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, ExternalLink } from 'lucide-react';

// Mock data - in a real app this would come from props or a data store
const mockTasks = [
  {
    id: '1',
    taskName: 'Implement user authentication',
    employeeName: 'Alice Johnson',
    category: 'Product' as const,
    description: 'Build secure login and registration system with JWT tokens',
    startDate: '2024-01-15',
    estimatedEndDate: '2024-01-25',
    actualEndDate: '2024-01-24',
    toolLinks: [
      { id: '1', name: 'GitHub Repository', url: 'https://github.com/example/auth' },
      { id: '2', name: 'Design Mockups', url: 'https://figma.com/auth-designs' }
    ]
  }
];

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  
  const task = mockTasks.find(t => t.id === taskId);
  
  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Task Not Found</h2>
            <p className="text-gray-600 mb-4">The requested task could not be found.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-4 hover:bg-blue-50 text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Task Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl text-slate-900 mb-2">{task.taskName}</CardTitle>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{task.category}</Badge>
                  <Badge variant={task.actualEndDate ? "default" : "outline"}>
                    {task.actualEndDate ? "Completed" : "In Progress"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-lg leading-relaxed">{task.description}</p>
          </CardContent>
        </Card>

        {/* Task Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                  <p className="text-slate-900">{new Date(task.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Estimated End Date</p>
                  <p className="text-slate-900">{new Date(task.estimatedEndDate).toLocaleDateString()}</p>
                </div>
                {task.actualEndDate && (
                  <div>
                    <p className="text-sm font-medium text-slate-500">Actual End Date</p>
                    <p className="text-slate-900">{new Date(task.actualEndDate).toLocaleDateString()}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-slate-500">Duration</p>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-slate-400" />
                    <p className="text-slate-900">
                      {Math.ceil((new Date(task.estimatedEndDate).getTime() - new Date(task.startDate).getTime()) / (1000 * 60 * 60 * 24))} days estimated
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
                Assignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Assigned To</p>
                  <p className="text-slate-900 font-medium">{task.employeeName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Category</p>
                  <Badge variant="outline">{task.category}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Status</p>
                  <Badge variant={task.actualEndDate ? "default" : "secondary"}>
                    {task.actualEndDate ? "Completed" : "In Progress"}
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
    </div>
  );
};

export default TaskDetails;
