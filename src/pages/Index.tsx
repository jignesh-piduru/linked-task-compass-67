import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TaskGrid from '@/components/TaskGrid';
import TaskDetails from '@/components/TaskDetails';
import TaskForm from '@/components/TaskForm';
import EmployeeForm from '@/components/EmployeeForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import type { Task } from '@/types/Task';
import type { Employee } from '@/types/Employee';

const Index = () => {
  const [currentView, setCurrentView] = useState('today');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      employeeName: 'Sarah Chen',
      taskName: 'UI Design Review',
      category: 'Product',
      description: 'Review and finalize the new dashboard design components',
      startDate: new Date().toISOString().split('T')[0],
      estimatedEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      toolLinks: []
    },
    {
      id: '2',
      employeeName: 'Marcus Johnson',
      taskName: 'API Integration',
      category: 'R&D',
      description: 'Integrate third-party payment gateway API',
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      estimatedEndDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      actualEndDate: new Date().toISOString().split('T')[0],
      toolLinks: []
    }
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      department: 'Design',
      position: 'Senior UI Designer',
      createdDate: '2024-01-15',
      status: 'active',
      role: 'employee',
      premiumAccess: true,
      skills: ['UI Design', 'Figma', 'Prototyping']
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus.johnson@company.com',
      department: 'Engineering',
      position: 'Full Stack Developer',
      createdDate: '2024-02-01',
      status: 'active',
      role: 'employee',
      premiumAccess: false,
      skills: ['React', 'Node.js', 'TypeScript']
    },
    {
      id: '3',
      name: 'Elena Rodriguez',
      email: 'elena.rodriguez@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      createdDate: '2024-01-20',
      status: 'active',
      role: 'manager',
      premiumAccess: true,
      skills: ['Digital Marketing', 'Analytics', 'Content Strategy']
    }
  ]);

  const getTodaysTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.startDate === today);
  };

  const getAllTasks = () => tasks;

  const getCompletedTasks = () => {
    return tasks.filter(task => task.actualEndDate);
  };

  const getFutureTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.startDate > today);
  };

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString()
    };
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
  };

  const handleAddEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Date.now().toString()
    };
    setEmployees([...employees, newEmployee]);
    setShowEmployeeForm(false);
  };

  const renderTaskGrid = (taskList: Task[]) => {
    if (taskList.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No tasks found for this category.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taskList.map((task) => (
          <Card key={task.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{task.taskName}</CardTitle>
              <p className="text-sm text-gray-600">{task.employeeName}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.category === 'Product' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {task.category}
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{task.description}</p>
                <div className="text-xs text-gray-500">
                  <p>Start: {new Date(task.startDate).toLocaleDateString()}</p>
                  <p>Due: {new Date(task.estimatedEndDate).toLocaleDateString()}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedTask(task)}
                  className="w-full mt-3"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderMainContent = () => {
    if (selectedTask) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSelectedTask(null)}>
              ← Back to Tasks
            </Button>
          </div>
          <TaskDetails task={selectedTask} onClose={() => setSelectedTask(null)} />
        </div>
      );
    }

    let taskList: Task[] = [];
    let title = '';

    switch (currentView) {
      case 'today':
        taskList = getTodaysTasks();
        title = "Today's Tasks";
        break;
      case 'all':
        taskList = getAllTasks();
        title = 'All Tasks';
        break;
      case 'completed':
        taskList = getCompletedTasks();
        title = 'Completed Tasks';
        break;
      case 'future':
        taskList = getFutureTasks();
        title = 'Future Tasks';
        break;
    }

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {renderTaskGrid(taskList)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 ml-64">
          <div className="p-8">
            {!showTaskForm && !showEmployeeForm ? (
              <>
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Task Management Dashboard
                    </h1>
                    <p className="text-gray-600 mt-2">Manage your team's tasks and track progress</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => setShowTaskForm(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                    <Button 
                      onClick={() => setShowEmployeeForm(true)}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Employee
                    </Button>
                  </div>
                </div>

                {/* Task Filter Tabs */}
                <div className="flex gap-4 mb-8">
                  {[
                    { key: 'today', label: "Today's Tasks" },
                    { key: 'all', label: 'All Tasks' },
                    { key: 'completed', label: 'Completed Tasks' },
                    { key: 'future', label: 'Future Tasks' }
                  ].map((tab) => (
                    <Button
                      key={tab.key}
                      variant={currentView === tab.key ? 'default' : 'outline'}
                      onClick={() => setCurrentView(tab.key)}
                      className={currentView === tab.key ? 'bg-blue-600 text-white' : 'text-gray-600'}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </div>

                {renderMainContent()}
              </>
            ) : showTaskForm ? (
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Create New Task</CardTitle>
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowTaskForm(false)}
                    >
                      ← Back
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <TaskForm 
                    onSubmit={handleAddTask} 
                    employees={employees} 
                    onClose={() => setShowTaskForm(false)} 
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Add New Employee</CardTitle>
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowEmployeeForm(false)}
                    >
                      ← Back
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <EmployeeForm 
                    onSubmit={handleAddEmployee} 
                    onClose={() => setShowEmployeeForm(false)} 
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
