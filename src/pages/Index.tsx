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
  Trash2,
  UserX
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TaskCard from '@/components/TaskCard';
import TasksTable from '@/components/TasksTable';
import TaskForm from '@/components/TaskForm';
import EmployeeForm from '@/components/EmployeeForm';
import Sidebar from '@/components/Sidebar';
import ToolLinkManager from '@/components/ToolLinkManager';
import type { Task } from '@/types/Task';
import type { Employee } from '@/types/Employee';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  
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

  // Task form state
  const [taskFormData, setTaskFormData] = useState({
    employeeName: '',
    taskName: '',
    category: 'Product' as 'Product' | 'R&D',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    estimatedEndDate: '',
    actualEndDate: '',
    toolLinks: []
  });

  // Employee form state with proper typing
  const [employeeFormData, setEmployeeFormData] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    createdDate: new Date().toISOString().split('T')[0],
    status: 'active' as 'active' | 'inactive' | 'on-leave',
    role: 'employee' as 'admin' | 'manager' | 'employee',
    premiumAccess: false,
    skills: [] as string[]
  });

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

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskFormData.employeeName || !taskFormData.taskName || !taskFormData.description || !taskFormData.estimatedEndDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    handleAddTask(taskFormData);
    setShowTaskDialog(false);
    setTaskFormData({
      employeeName: '',
      taskName: '',
      category: 'Product',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      estimatedEndDate: '',
      actualEndDate: '',
      toolLinks: []
    });
  };

  const handleEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeFormData.name || !employeeFormData.email || !employeeFormData.position) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    handleAddEmployee(employeeFormData);
    setShowEmployeeDialog(false);
    setEmployeeFormData({
      name: '',
      email: '',
      department: '',
      position: '',
      createdDate: new Date().toISOString().split('T')[0],
      status: 'active',
      role: 'employee',
      premiumAccess: false,
      skills: []
    });
  };

  const handleTaskInputChange = (field: string, value: any) => {
    setTaskFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmployeeInputChange = (field: string, value: string | boolean | string[]) => {
    setEmployeeFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (activeTab) {
      case 'tasks-today':
        // Show tasks that start today OR are due today OR are currently active and not completed
        return tasks.filter(task => 
          task.startDate === today || 
          task.estimatedEndDate === today ||
          (task.startDate <= today && task.estimatedEndDate >= today && !task.actualEndDate)
        );
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

  const getTodaysTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => 
      task.startDate === today || 
      task.estimatedEndDate === today ||
      (task.startDate <= today && task.estimatedEndDate >= today && !task.actualEndDate)
    );
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-800">Employee Management</h2>
            <EmployeeForm onSubmit={handleAddEmployee} onClose={() => setShowEmployeeDialog(false)} />
          </div>

          <div className="grid gap-4">
            {employees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
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
                    <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-800">
              {tabTitles[activeTab as keyof typeof tabTitles]}
            </h2>
            <TaskForm task={undefined} employees={employees} onSubmit={handleAddTask} onClose={() => setShowTaskDialog(false)} />
          </div>

          {filteredTasks.length > 0 ? (
            <TasksTable 
              tasks={filteredTasks}
              employees={employees}
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
            />
          ) : (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Calendar className="h-12 w-12 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {activeTab === 'tasks-today' ? 'No tasks scheduled for today' : 'No tasks found'}
                  </h3>
                  <p className="text-gray-500 mb-4 text-sm sm:text-base px-4">
                    {activeTab === 'tasks-today' 
                      ? "You don't have any tasks starting, due, or active today. Great job staying on top of your work!"
                      : `No tasks found for this category.`
                    }
                  </p>
                </div>
                <Button 
                  onClick={() => setShowTaskDialog(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {activeTab === 'tasks-today' ? 'Schedule a Task for Today' : 'Create Your First Task'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      );
    }

    // Dashboard content
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskFlow Dashboard
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">Welcome back! Here's what's happening with your projects today.</p>
          </div>
          <div className="flex gap-3">
            <TaskForm task={undefined} employees={employees} onSubmit={handleAddTask} onClose={() => setShowTaskDialog(false)} />
            <EmployeeForm onSubmit={handleAddEmployee} onClose={() => setShowEmployeeDialog(false)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
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
                  <p className="text-purple-100 text-sm">Active Employees</p>
                  <p className="text-3xl font-bold">{employees.filter(e => e.status === 'active').length}</p>
                  <p className="text-purple-100 text-xs mt-1">Working team</p>
                </div>
                <Users className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">On Leave</p>
                  <p className="text-3xl font-bold">{employees.filter(e => e.status === 'on-leave').length}</p>
                  <p className="text-amber-100 text-xs mt-1">Away from work</p>
                </div>
                <UserX className="h-12 w-12 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Today's Tasks
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('tasks-today')}
                className="text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
              >
                View All Today's Tasks
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getTodaysTasks().length > 0 ? (
                getTodaysTasks().slice(0, 3).map((task) => (
                  <div key={task.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors gap-4">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        task.actualEndDate ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <div className="min-w-0 flex-1">
                        <button 
                          onClick={() => navigate(`/task/${task.id}`)}
                          className="font-medium text-slate-800 hover:text-blue-600 hover:underline text-left"
                        >
                          {task.taskName}
                        </button>
                        <p className="text-sm text-slate-500">Assigned to {task.employeeName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                      <Badge variant="secondary">
                        {task.category}
                      </Badge>
                      <span className="text-sm text-slate-500">{task.estimatedEndDate}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No tasks scheduled for today
                  </h3>
                  <p className="text-gray-500 mb-4 text-sm sm:text-base px-4">
                    You don't have any tasks starting, due, or active today. Great job staying on top of your work!
                  </p>
                  <Button 
                    onClick={() => setShowTaskDialog(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule a Task for Today
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex min-h-screen w-full">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 ml-0 lg:ml-64">
          <div className="max-w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
