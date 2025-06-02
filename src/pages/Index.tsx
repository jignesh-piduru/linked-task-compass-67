
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Users,
  BarChart3,
  Calendar,
  FileText,
  Star,
  Target,
  TrendingUp,
  Filter,
  Download,
  Search,
  Zap,
  Edit,
  Trash2
} from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import EmployeeForm from '@/components/EmployeeForm';
import Sidebar from '@/components/Sidebar';
import type { Task } from '@/types/Task';
import type { Employee } from '@/types/Employee';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      taskName: 'Design System Implementation',
      description: 'Create a comprehensive design system for the application including components, tokens, and documentation',
      category: 'Product',
      employeeName: 'Sarah Chen',
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
      description: 'Integrate Stripe payment gateway with error handling and webhook support',
      category: 'R&D',
      employeeName: 'Marcus Johnson',
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
      description: 'Optimize database queries and implement proper indexing for better performance',
      category: 'Product',
      employeeName: 'Elena Rodriguez',
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
      description: 'Implement secure user authentication with JWT tokens and refresh mechanism',
      category: 'Product',
      employeeName: 'David Kim',
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
      description: 'Research and prototype mobile application architecture and user flows',
      category: 'R&D',
      employeeName: 'Lisa Wang',
      startDate: '2024-01-12',
      estimatedEndDate: '2024-02-28',
      actualEndDate: '2024-02-26',
      toolLinks: [
        { id: '6', name: 'React Native Docs', url: 'https://reactnative.dev' },
        { id: '7', name: 'Prototype', url: 'https://figma.com/mobile-prototype' }
      ]
    }
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      department: 'Engineering',
      position: 'Senior Frontend Developer',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      createdDate: '2023-03-15',
      status: 'active',
      role: 'employee',
      premiumAccess: false,
      phoneNumber: '+1-555-0123',
      yearsOfExperience: 5,
      employmentType: 'Full-time'
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus.johnson@company.com',
      department: 'Engineering',
      position: 'Backend Developer',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
      createdDate: '2023-06-20',
      status: 'active',
      role: 'employee',
      premiumAccess: false,
      phoneNumber: '+1-555-0124',
      yearsOfExperience: 4,
      employmentType: 'Full-time'
    },
    {
      id: '3',
      name: 'Elena Rodriguez',
      email: 'elena.rodriguez@company.com',
      department: 'Engineering',
      position: 'Database Administrator',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Performance Tuning', 'Data Analytics'],
      createdDate: '2023-01-10',
      status: 'active',
      role: 'manager',
      premiumAccess: true,
      phoneNumber: '+1-555-0125',
      yearsOfExperience: 7,
      employmentType: 'Full-time'
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@company.com',
      department: 'Security',
      position: 'Security Engineer',
      skills: ['Cybersecurity', 'Penetration Testing', 'OAuth', 'JWT', 'Encryption'],
      createdDate: '2023-08-05',
      status: 'active',
      role: 'employee',
      premiumAccess: false,
      phoneNumber: '+1-555-0126',
      yearsOfExperience: 6,
      employmentType: 'Full-time'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa.wang@company.com',
      department: 'Research & Development',
      position: 'Mobile Developer',
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'UI/UX Design'],
      createdDate: '2023-11-12',
      status: 'active',
      role: 'employee',
      premiumAccess: false,
      phoneNumber: '+1-555-0127',
      yearsOfExperience: 3,
      employmentType: 'Full-time'
    },
    {
      id: '6',
      name: 'James Wilson',
      email: 'james.wilson@company.com',
      department: 'Design',
      position: 'UX Designer',
      skills: ['Figma', 'Sketch', 'User Research', 'Prototyping', 'Accessibility'],
      createdDate: '2023-04-18',
      status: 'on-leave',
      role: 'employee',
      premiumAccess: false,
      phoneNumber: '+1-555-0128',
      yearsOfExperience: 4,
      employmentType: 'Full-time'
    }
  ]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Task created",
      description: "Your task has been successfully created.",
    });
  };

  const handleAddEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString(),
    };
    setEmployees([...employees, newEmployee]);
    toast({
      title: "Employee added",
      description: "New employee has been successfully added.",
    });
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    toast({
      title: "Task updated",
      description: "Task has been successfully updated.",
    });
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Task has been successfully deleted.",
    });
  };

  const handleEmployeeDelete = (employeeId: string) => {
    setEmployees(employees.filter(employee => employee.id !== employeeId));
    toast({
      title: "Employee removed",
      description: "Employee has been successfully removed.",
    });
  };

  const handleEmployeeUpdate = (updatedEmployee: Employee) => {
    setEmployees(employees.map(employee => 
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    ));
    toast({
      title: "Employee updated",
      description: "Employee has been successfully updated.",
    });
  };

  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (activeTab) {
      case 'tasks-today':
        return tasks.filter(task => task.estimatedEndDate === today);
      case 'tasks-completed':
        return tasks.filter(task => !!task.actualEndDate);
      case 'tasks-future':
        return tasks.filter(task => task.estimatedEndDate > today);
      case 'tasks-all':
      case 'tasks':
        return tasks;
      default:
        return tasks;
    }
  };

  // Navigate to Analytics page when analytics tab is selected
  if (activeTab === 'analytics') {
    navigate('/analytics');
    return null;
  }

  const renderContent = () => {
    if (activeTab === 'employees') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Employee Management</h2>
            <Button 
              onClick={() => navigate('/add-employee')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>

          <div className="grid gap-4">
            {employees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => navigate(`/user/${employee.id}`)}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-lg"
                          >
                            {employee.name}
                          </button>
                          <Badge variant="secondary">{employee.department}</Badge>
                          <Badge variant={employee.status === 'active' ? 'default' : 'outline'}>
                            {employee.status}
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm font-medium">{employee.position}</p>
                        <p className="text-slate-500 text-xs">{employee.email}</p>
                        {employee.phoneNumber && (
                          <p className="text-slate-500 text-xs">{employee.phoneNumber}</p>
                        )}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {employee.skills?.slice(0, 5).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {employee.skills && employee.skills.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{employee.skills.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/user/${employee.id}`)}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEmployeeDelete(employee.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab.startsWith('tasks-') || activeTab === 'tasks') {
      const filteredTasks = getFilteredTasks();
      const tabTitles = {
        'tasks-today': "Today's Tasks",
        'tasks-all': 'All Tasks',
        'tasks-completed': 'Completed Tasks',
        'tasks-future': 'Future Tasks',
        'tasks': 'All Tasks'
      };

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">
              {tabTitles[activeTab as keyof typeof tabTitles]}
            </h2>
            <Button 
              onClick={() => navigate('/add-task')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                employees={employees}
                onUpdate={handleTaskUpdate}
                onDelete={handleTaskDelete}
              />
            ))}
            {filteredTasks.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-slate-500">No tasks found for this category.</p>
                <Button 
                  onClick={() => navigate('/add-task')}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Task
                </Button>
              </Card>
            )}
          </div>
        </div>
      );
    }

    // Dashboard content
    return (
      <div className="space-y-8">
        {/* Enhanced Dashboard Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskFlow Dashboard
            </h1>
            <p className="text-slate-600 mt-1">Welcome back! Here's what's happening with your projects today.</p>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Tasks</p>
                  <p className="text-3xl font-bold">{tasks.length}</p>
                  <p className="text-blue-100 text-xs mt-1">Active projects</p>
                </div>
                <BarChart3 className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Completed</p>
                  <p className="text-3xl font-bold">{tasks.filter(t => !!t.actualEndDate).length}</p>
                  <p className="text-green-100 text-xs mt-1">{Math.round((tasks.filter(t => !!t.actualEndDate).length / tasks.length) * 100)}% completion rate</p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">In Progress</p>
                  <p className="text-3xl font-bold">{tasks.filter(t => !t.actualEndDate).length}</p>
                  <p className="text-orange-100 text-xs mt-1">Active workload</p>
                </div>
                <Clock className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Team Members</p>
                  <p className="text-3xl font-bold">{employees.filter(e => e.status === 'active').length}</p>
                  <p className="text-purple-100 text-xs mt-1">Active workforce</p>
                </div>
                <Users className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={() => navigate('/add-task')}
                className="h-16 hover:bg-blue-50 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Task
              </Button>

              <Button 
                onClick={() => navigate('/add-employee')}
                className="h-16 hover:bg-blue-50 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Employee
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Tasks Preview */}
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Recent Tasks
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('tasks-all')}
                className="text-blue-600 hover:bg-blue-50"
              >
                View All Tasks
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      task.actualEndDate ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <button 
                        onClick={() => navigate(`/task/${task.id}`)}
                        className="font-medium text-slate-800 hover:text-blue-600 hover:underline text-left"
                      >
                        {task.taskName}
                      </button>
                      <p className="text-sm text-slate-500">Assigned to {task.employeeName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {task.category}
                    </Badge>
                    <span className="text-sm text-slate-500">{task.estimatedEndDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex w-full">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
