import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Filter } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/types/Task';

// Sample data to demonstrate all functionality
const getSampleTasks = (): Task[] => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return [
    {
      id: '1',
      employeeName: 'Sarah Johnson',
      taskName: 'User Authentication System',
      category: 'Product',
      description: 'Implement secure login and registration functionality with JWT tokens and password reset capabilities.',
      startDate: today,
      estimatedEndDate: tomorrow,
      toolLinks: [
        { id: '1', name: 'GitHub Repo', url: 'https://github.com/company/auth-system' },
        { id: '2', name: 'Design Mockups', url: 'https://figma.com/auth-designs' }
      ]
    },
    {
      id: '2',
      employeeName: 'Mike Chen',
      taskName: 'API Performance Optimization',
      category: 'R&D',
      description: 'Research and implement database query optimizations to reduce API response times by 50%.',
      startDate: yesterday,
      estimatedEndDate: today,
      actualEndDate: today,
      toolLinks: [
        { id: '3', name: 'Performance Docs', url: 'https://docs.company.com/performance' },
        { id: '4', name: 'Monitoring Dashboard', url: 'https://grafana.company.com' }
      ]
    },
    {
      id: '3',
      employeeName: 'Emily Rodriguez',
      taskName: 'Mobile App Responsive Design',
      category: 'Product',
      description: 'Create responsive layouts for mobile devices and ensure cross-browser compatibility.',
      startDate: yesterday,
      estimatedEndDate: tomorrow,
      toolLinks: [
        { id: '5', name: 'Mobile Specs', url: 'https://confluence.company.com/mobile' }
      ]
    },
    {
      id: '4',
      employeeName: 'David Park',
      taskName: 'Machine Learning Model Training',
      category: 'R&D',
      description: 'Train and validate new recommendation algorithm using customer behavior data.',
      startDate: tomorrow,
      estimatedEndDate: nextWeek,
      toolLinks: [
        { id: '6', name: 'ML Pipeline', url: 'https://jupyter.company.com/notebooks' },
        { id: '7', name: 'Dataset Repository', url: 'https://data.company.com/recommendations' }
      ]
    },
    {
      id: '5',
      employeeName: 'Lisa Wang',
      taskName: 'Customer Dashboard Analytics',
      category: 'Product',
      description: 'Build comprehensive analytics dashboard with real-time metrics and data visualization.',
      startDate: yesterday,
      estimatedEndDate: yesterday,
      actualEndDate: yesterday,
      toolLinks: [
        { id: '8', name: 'Analytics Requirements', url: 'https://docs.company.com/analytics' }
      ]
    },
    {
      id: '6',
      employeeName: 'Alex Thompson',
      taskName: 'Security Audit Implementation',
      category: 'R&D',
      description: 'Conduct comprehensive security review and implement recommended security measures.',
      startDate: today,
      estimatedEndDate: nextWeek,
      toolLinks: []
    }
  ];
};

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(getSampleTasks());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<'all' | 'Product' | 'R&D'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks([...tasks, task]);
    setIsFormOpen(false);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const today = new Date().toISOString().split('T')[0];

  const getFilteredTasks = (tabFilter: string) => {
    let filteredByTab = tasks;

    switch (tabFilter) {
      case 'today':
        filteredByTab = tasks.filter(task => task.startDate === today);
        break;
      case 'pending':
        filteredByTab = tasks.filter(task => !task.actualEndDate);
        break;
      case 'completed':
        filteredByTab = tasks.filter(task => !!task.actualEndDate);
        break;
      case 'future':
        filteredByTab = tasks.filter(task => task.startDate > today);
        break;
      case 'all':
      default:
        filteredByTab = tasks;
        break;
    }

    return filteredByTab.filter(task => {
      const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
      const matchesSearch = task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const completedTasks = tasks.filter(task => task.actualEndDate).length;
  const inProgressTasks = tasks.filter(task => !task.actualEndDate).length;
  const todayTasks = tasks.filter(task => task.startDate === today).length;
  const futureTasks = tasks.filter(task => task.startDate > today).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Task Management</h1>
              <p className="text-slate-600 mt-1">Organize and track your team's progress</p>
            </div>
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              New Task
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold">Total Tasks</h3>
              <p className="text-3xl font-bold mt-2">{tasks.length}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold">Today's Tasks</h3>
              <p className="text-3xl font-bold mt-2">{todayTasks}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold">Completed</h3>
              <p className="text-3xl font-bold mt-2">{completedTasks}</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold">Future Tasks</h3>
              <p className="text-3xl font-bold mt-2">{futureTasks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as 'all' | 'Product' | 'R&D')}
              className="border border-slate-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Product">Product</option>
              <option value="R&D">R&D</option>
            </select>
          </div>
          <Input
            placeholder="Search tasks or employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      {/* Tabbed Task Views */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="future">Future</TabsTrigger>
          </TabsList>

          {['today', 'all', 'pending', 'completed', 'future'].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue}>
              {(() => {
                const filteredTasks = getFilteredTasks(tabValue);
                
                if (filteredTasks.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          No {tabValue === 'all' ? '' : tabValue} tasks found
                        </h3>
                        <p className="text-slate-600 mb-6">
                          {tasks.length === 0 
                            ? "Get started by creating your first task!" 
                            : `Try adjusting your filters or search terms to find ${tabValue} tasks.`}
                        </p>
                        {tasks.length === 0 && (
                          <Button 
                            onClick={() => setIsFormOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create First Task
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onUpdate={updateTask}
                        onDelete={deleteTask}
                      />
                    ))}
                  </div>
                );
              })()}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Task Form Modal */}
      {isFormOpen && (
        <TaskForm
          onSubmit={addTask}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
