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
      taskName: 'Design System Implementation',
      description: 'Create a comprehensive design system for the application',
      category: 'Product',
      employeeName: 'John Doe',
      startDate: '2024-01-15',
      estimatedEndDate: '2024-02-15',
      actualEndDate: '',
      toolLinks: [
        { id: '1', name: 'Figma Design', url: 'https://figma.com/design-system' }
      ]
    },
    {
      id: '2',
      taskName: 'API Integration',
      description: 'Integrate the new payment API endpoints',
      category: 'R&D',
      employeeName: 'Jane Smith',
      startDate: '2024-01-20',
      estimatedEndDate: '2024-02-20',
      actualEndDate: '',
      toolLinks: [
        { id: '2', name: 'API Documentation', url: 'https://api-docs.example.com' }
      ]
    },
    {
      id: '3',
      taskName: 'Database Optimization',
      description: 'Optimize database queries for better performance',
      category: 'Product',
      employeeName: 'Mike Johnson',
      startDate: '2024-01-10',
      estimatedEndDate: '2024-02-10',
      actualEndDate: '2024-02-08',
      toolLinks: []
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
      createdDate: '2024-01-01',
      status: 'active',
      role: 'employee',
      premiumAccess: false
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'Design',
      position: 'UX Designer',
      skills: ['Figma', 'Sketch', 'User Research'],
      createdDate: '2024-01-02',
      status: 'active',
      role: 'employee',
      premiumAccess: false
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      department: 'Engineering',
      position: 'Backend Developer',
      skills: ['Python', 'PostgreSQL', 'Docker'],
      createdDate: '2024-01-03',
      status: 'active',
      role: 'employee',
      premiumAccess: false
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

  const renderContent = () => {
    if (activeTab === 'employees') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Employee Management</h2>
            <EmployeeForm 
              onSubmit={handleAddEmployee}
              onClose={() => {}}
            />
          </div>

          <div className="grid gap-4">
            {employees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
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
                        {employee.skills?.map((skill) => (
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
            <TaskForm 
              onSubmit={handleAddTask} 
              employees={employees}
              onClose={() => {}}
            />
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
                  <p className="text-3xl font-bold">{tasks.filter(t => !!t.actualEndDate).length}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TaskForm 
                onSubmit={handleAddTask} 
                employees={employees}
                onClose={() => {}}
              />

              <EmployeeForm 
                onSubmit={handleAddEmployee}
                onClose={() => {}}
              />
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
                      <h4 className="font-medium text-slate-800">{task.taskName}</h4>
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
