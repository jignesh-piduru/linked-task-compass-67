import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
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
  Zap
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
      title: 'Design System Implementation',
      description: 'Create a comprehensive design system for the application',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'John Doe',
      dueDate: '2024-02-15',
      tags: ['design', 'frontend'],
      estimatedHours: 40,
      actualHours: 15,
      completionPercentage: 60
    },
    {
      id: '2',
      title: 'API Integration',
      description: 'Integrate the new payment API endpoints',
      status: 'todo',
      priority: 'medium',
      assignedTo: 'Jane Smith',
      dueDate: '2024-02-20',
      tags: ['backend', 'api'],
      estimatedHours: 25,
      actualHours: 0,
      completionPercentage: 0
    },
    {
      id: '3',
      title: 'Database Optimization',
      description: 'Optimize database queries for better performance',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Mike Johnson',
      dueDate: '2024-02-10',
      tags: ['database', 'performance'],
      estimatedHours: 30,
      actualHours: 28,
      completionPercentage: 100
    }
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      skills: ['React', 'TypeScript', 'Node.js'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'Design',
      position: 'UX Designer',
      skills: ['Figma', 'Sketch', 'User Research'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b68b3c3a?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      department: 'Engineering',
      position: 'Backend Developer',
      skills: ['Python', 'PostgreSQL', 'Docker'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
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

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
    toast({
      title: "Task updated",
      description: "Task has been successfully updated.",
    });
  };

  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (activeTab) {
      case 'tasks-today':
        return tasks.filter(task => task.dueDate === today);
      case 'tasks-completed':
        return tasks.filter(task => task.status === 'completed');
      case 'tasks-future':
        return tasks.filter(task => task.dueDate > today);
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                <EmployeeForm onSubmit={handleAddEmployee} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {employees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={() => navigate(`/user/${employee.id}`)}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          {employee.name}
                        </button>
                        <Badge variant="secondary">{employee.department}</Badge>
                      </div>
                      <p className="text-slate-600 text-sm">{employee.position}</p>
                      <p className="text-slate-500 text-xs">{employee.email}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {employee.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <TaskForm onSubmit={handleAddTask} employees={employees} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onUpdate={(updates) => handleTaskUpdate(task.id, updates)}
              />
            ))}
            {filteredTasks.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-slate-500">No tasks found for this category.</p>
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
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="shadow-sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => navigate('/analytics')} className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Premium Status Banner */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-500" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">TaskFlow Premium</h3>
                  <p className="text-yellow-700 text-sm">You're using our premium analytics suite with advanced insights</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                🚀 PREMIUM
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Tasks</p>
                  <p className="text-3xl font-bold">{tasks.length}</p>
                  <p className="text-blue-100 text-xs mt-1">+12% from last month</p>
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
                  <p className="text-3xl font-bold">{tasks.filter(t => t.status === 'completed').length}</p>
                  <p className="text-green-100 text-xs mt-1">+8% completion rate</p>
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
                  <p className="text-3xl font-bold">{tasks.filter(t => t.status === 'in-progress').length}</p>
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
                  <p className="text-3xl font-bold">{employees.length}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Plus className="mr-2 h-5 w-5" />
                    Create New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                  </DialogHeader>
                  <TaskForm onSubmit={handleAddTask} employees={employees} />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-16 hover:bg-purple-50">
                    <Users className="mr-2 h-5 w-5" />
                    Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                  </DialogHeader>
                  <EmployeeForm onSubmit={handleAddEmployee} />
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                className="h-16 hover:bg-green-50"
                onClick={() => navigate('/analytics')}
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Analytics
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
                      task.status === 'completed' ? 'bg-green-500' :
                      task.status === 'in-progress' ? 'bg-blue-500' : 'bg-slate-400'
                    }`} />
                    <div>
                      <h4 className="font-medium text-slate-800">{task.title}</h4>
                      <p className="text-sm text-slate-500">Assigned to {task.assignedTo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      task.priority === 'high' ? 'destructive' :
                      task.priority === 'medium' ? 'default' : 'secondary'
                    }>
                      {task.priority}
                    </Badge>
                    <span className="text-sm text-slate-500">{task.dueDate}</span>
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
