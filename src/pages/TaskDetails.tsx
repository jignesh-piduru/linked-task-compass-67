import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock, ExternalLink, Edit, Trash2, CheckCircle } from 'lucide-react';

// Enhanced mock data matching the main application
const mockTasks = [
  {
    id: '1',
    taskName: 'Design System Implementation',
    employeeName: 'Sarah Chen',
    category: 'Product' as const,
    description: 'Create a comprehensive design system for the application including components, tokens, and documentation',
    startDate: '2024-01-15',
    estimatedEndDate: '2024-02-15',
    actualEndDate: '',
    toolLinks: [
      { id: '1', name: 'Figma Design System', url: 'https://figma.com/design-system' },
      { id: '2', name: 'Component Library', url: 'https://storybook.com/components' }
    ]
  },
  {
    id: '2',
    taskName: 'Payment API Integration',
    employeeName: 'Marcus Johnson',
    category: 'R&D' as const,
    description: 'Integrate Stripe payment gateway with error handling and webhook support',
    startDate: '2024-01-20',
    estimatedEndDate: '2024-02-20',
    actualEndDate: '',
    toolLinks: [
      { id: '2', name: 'Stripe API Docs', url: 'https://stripe.com/docs' },
      { id: '3', name: 'Testing Webhooks', url: 'https://stripe.com/docs/webhooks' }
    ]
  },
  {
    id: '3',
    taskName: 'Database Performance Optimization',
    employeeName: 'Elena Rodriguez',
    category: 'Product' as const,
    description: 'Optimize database queries and implement proper indexing for better performance',
    startDate: '2024-01-10',
    estimatedEndDate: '2024-02-10',
    actualEndDate: '2024-02-08',
    toolLinks: [
      { id: '4', name: 'Performance Monitor', url: 'https://datadog.com/dashboard' }
    ]
  },
  {
    id: '4',
    taskName: 'User Authentication System',
    employeeName: 'David Kim',
    category: 'Product' as const,
    description: 'Implement secure user authentication with JWT tokens and refresh mechanism',
    startDate: '2024-01-25',
    estimatedEndDate: '2024-02-25',
    actualEndDate: '',
    toolLinks: [
      { id: '5', name: 'Auth0 Setup', url: 'https://auth0.com/docs' }
    ]
  },
  {
    id: '5',
    taskName: 'Mobile App Research',
    employeeName: 'Lisa Wang',
    category: 'R&D' as const,
    description: 'Research and prototype mobile application architecture and user flows',
    startDate: '2024-01-12',
    estimatedEndDate: '2024-02-28',
    actualEndDate: '2024-02-26',
    toolLinks: [
      { id: '6', name: 'React Native Docs', url: 'https://reactnative.dev' },
      { id: '7', name: 'Prototype', url: 'https://figma.com/mobile-prototype' }
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
            <Button onClick={() => navigate(-1)} className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <div className="flex-1">
                <CardTitle className="text-2xl text-slate-900 mb-2">{task.taskName}</CardTitle>
                <div className="flex items-center gap-4 flex-wrap">
                  <Badge variant="secondary">{task.category}</Badge>
                  <Badge variant={taskStatus.variant}>
                    {taskStatus.status}
                  </Badge>
                  <span className="text-sm text-slate-500">Task ID: {task.id}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/edit-task/${task.id}`)}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // In a real app, this would show a confirmation dialog
                    if (confirm('Are you sure you want to delete this task?')) {
                      navigate('/');
                    }
                  }}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
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

        {/* Actions */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Edit className="mr-2 h-4 w-4" />
                Edit Task
              </Button>
              {!task.actualEndDate && (
                <Button variant="outline" className="text-green-600 hover:bg-green-50">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark Complete
                </Button>
              )}
              <Button variant="outline" className="text-slate-600 hover:bg-slate-50">
                Clone Task
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskDetails;
