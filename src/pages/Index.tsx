import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Plus, Filter, Edit, Trash2, Users, Download, Upload, BarChart3, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import TaskForm from '@/components/TaskForm';
import EmployeeForm from '@/components/EmployeeForm';
import TaskCardPremium from '@/components/TaskCardPremium';
import Sidebar from '@/components/Sidebar';
import { Employee } from '@/types/Employee';
import { Task } from '@/types/Task';
import { csvUtils } from '@/utils/csvUtils';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const itemsPerPage = 10;

  // Sample data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Implement user authentication",
      description: "Set up login and registration functionality",
      status: "in-progress",
      priority: "high",
      assignee: "John Doe",
      assigneeId: 1,
      dueDate: "2024-01-15",
      createdDate: "2024-01-01",
      estimatedHours: 16,
      actualHours: 8,
      completionPercentage: 60,
      subtasks: [
        { id: 101, title: "Create login form", completed: true },
        { id: 102, title: "Implement password validation", completed: true },
        { id: 103, title: "Add forgot password feature", completed: false },
      ]
    },
    {
      id: 2,
      title: "Design database schema",
      description: "Create ERD and define relationships between entities",
      status: "completed",
      priority: "medium",
      assignee: "Jane Smith",
      assigneeId: 2,
      dueDate: "2024-01-10",
      createdDate: "2024-01-02",
      estimatedHours: 8,
      actualHours: 6,
      completionPercentage: 100,
      subtasks: [
        { id: 201, title: "Define user table", completed: true },
        { id: 202, title: "Define product table", completed: true },
        { id: 203, title: "Define order table", completed: true },
      ]
    },
    {
      id: 3,
      title: "Implement API endpoints",
      description: "Create RESTful API endpoints for the application",
      status: "not-started",
      priority: "high",
      assignee: "Mike Johnson",
      assigneeId: 3,
      dueDate: "2024-01-20",
      createdDate: "2024-01-03",
      estimatedHours: 24,
      actualHours: 0,
      completionPercentage: 0,
      subtasks: [
        { id: 301, title: "User endpoints", completed: false },
        { id: 302, title: "Product endpoints", completed: false },
        { id: 303, title: "Order endpoints", completed: false },
      ]
    },
    {
      id: 4,
      title: "Write unit tests",
      description: "Create comprehensive test suite for all components",
      status: "in-progress",
      priority: "medium",
      assignee: "Sarah Williams",
      assigneeId: 4,
      dueDate: "2024-01-25",
      createdDate: "2024-01-04",
      estimatedHours: 16,
      actualHours: 4,
      completionPercentage: 25,
      subtasks: [
        { id: 401, title: "Auth tests", completed: true },
        { id: 402, title: "API tests", completed: false },
        { id: 403, title: "UI tests", completed: false },
      ]
    },
    {
      id: 5,
      title: "Deploy to staging",
      description: "Set up CI/CD pipeline and deploy to staging environment",
      status: "not-started",
      priority: "low",
      assignee: "John Doe",
      assigneeId: 1,
      dueDate: "2024-01-30",
      createdDate: "2024-01-05",
      estimatedHours: 8,
      actualHours: 0,
      completionPercentage: 0,
      subtasks: [
        { id: 501, title: "Configure CI/CD", completed: false },
        { id: 502, title: "Set up staging environment", completed: false },
        { id: 503, title: "Deploy application", completed: false },
      ]
    }
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      position: "Senior Developer",
      department: "Engineering",
      salary: 95000,
      hireDate: "2022-03-15",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@company.com",
      position: "UX Designer",
      department: "Design",
      salary: 85000,
      hireDate: "2022-05-10",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, City, State 12345"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@company.com",
      position: "Product Manager",
      department: "Product",
      salary: 105000,
      hireDate: "2021-11-20",
      phone: "+1 (555) 345-6789",
      address: "789 Pine St, City, State 12345"
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@company.com",
      position: "QA Engineer",
      department: "Engineering",
      salary: 80000,
      hireDate: "2023-01-05",
      phone: "+1 (555) 456-7890",
      address: "101 Elm St, City, State 12345"
    }
  ]);

  // Dashboard metrics
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalEmployees = employees.length;
  
  const todaysTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate === today;
  });

  const completedTasksData = tasks.filter(task => task.status === 'completed');
  const futureTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate > today;
  });

  // Utility functions
  const filterTasks = (tasks: Task[]) => {
    let filtered = [...tasks];
    
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }
    
    return filtered;
  };

  const paginateItems = <T,>(items: T[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  // Event handlers
  const handleTaskSubmit = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      toast({
        title: "Task updated",
        description: `Task "${task.title}" has been updated.`,
      });
    } else {
      const newTask = {
        ...task,
        id: tasks.length + 1,
        createdDate: new Date().toISOString().split('T')[0],
      };
      setTasks([...tasks, newTask]);
      toast({
        title: "Task created",
        description: `Task "${task.title}" has been created.`,
      });
    }
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleEmployeeSubmit = (employee: Employee) => {
    if (editingEmployee) {
      setEmployees(employees.map(e => e.id === employee.id ? employee : e));
      toast({
        title: "Employee updated",
        description: `Employee "${employee.name}" has been updated.`,
      });
    } else {
      const newEmployee = {
        ...employee,
        id: employees.length + 1,
      };
      setEmployees([...employees, newEmployee]);
      toast({
        title: "Employee added",
        description: `Employee "${employee.name}" has been added.`,
      });
    }
    setShowEmployeeForm(false);
    setEditingEmployee(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been deleted.",
    });
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowEmployeeForm(true);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(employee => employee.id !== id));
    toast({
      title: "Employee deleted",
      description: "The employee has been deleted.",
    });
  };

  const handleEmployeeClick = (id: number) => {
    navigate(`/user/${id}`);
  };

  const handleTaskClick = (id: number) => {
    navigate(`/task/${id}`);
  };

  const handleExport = (type: 'tasks' | 'employees') => {
    const data = type === 'tasks' ? tasks : employees;
    const filename = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
    csvUtils.exportToCSV(data, filename);
    toast({
      title: "Export successful",
      description: `${type} data has been exported to ${filename}.`,
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    csvUtils.importFromCSV(file, (data) => {
      if (data.length > 0 && 'title' in data[0]) {
        setTasks([...tasks, ...data as Task[]]);
        toast({
          title: "Import successful",
          description: `${data.length} tasks have been imported.`,
        });
      } else if (data.length > 0 && 'name' in data[0]) {
        setEmployees([...employees, ...data as Employee[]]);
        toast({
          title: "Import successful",
          description: `${data.length} employees have been imported.`,
        });
      } else {
        toast({
          title: "Import failed",
          description: "The file format is not supported.",
          variant: "destructive",
        });
      }
    });
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setShowTaskForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
          <Button 
            onClick={() => setShowEmployeeForm(true)}
            variant="outline"
            className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
          >
            <Users className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Premium Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg border border-blue-200/50 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 text-sm font-semibold uppercase tracking-wide">Total Tasks</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">{totalTasks}</p>
            </div>
            <div className="bg-blue-200 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-blue-700" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Active projects</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg border border-amber-200/50 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-700 text-sm font-semibold uppercase tracking-wide">In Progress</p>
              <p className="text-3xl font-bold text-amber-900 mt-1">{inProgressTasks}</p>
              <p className="text-sm text-amber-600 mt-1">{totalEmployees} employees working</p>
            </div>
            <div className="bg-amber-200 p-3 rounded-full">
              <Clock className="h-6 w-6 text-amber-700" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-amber-600">
            <span>Active development</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg border border-green-200/50 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 text-sm font-semibold uppercase tracking-wide">Completed</p>
              <p className="text-3xl font-bold text-green-900 mt-1">{completedTasks}</p>
            </div>
            <div className="bg-green-200 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-700" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <span>{Math.round((completedTasks / totalTasks) * 100)}% completion rate</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg border border-purple-200/50 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700 text-sm font-semibold uppercase tracking-wide">Team Members</p>
              <p className="text-3xl font-bold text-purple-900 mt-1">{totalEmployees}</p>
            </div>
            <div className="bg-purple-200 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-700" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-purple-600">
            <span>Active workforce</span>
          </div>
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Recent Tasks</h2>
          <Button 
            variant="outline" 
            onClick={() => setActiveTab('tasks-all')}
            className="hover:bg-blue-50 border-blue-200 text-blue-600 hover:border-blue-300"
          >
            View All Tasks
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tasks.slice(0, 4).map((task) => (
            <TaskCardPremium 
              key={task.id} 
              task={task} 
              onEdit={() => handleEditTask(task)}
              onDelete={() => handleDeleteTask(task.id)}
              onEmployeeClick={() => handleEmployeeClick(task.assigneeId)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderTasks = () => {
    const filteredTasks = filterTasks(tasks);
    const paginatedTasks = paginateItems(filteredTasks);
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">All Tasks</h1>
          <Button onClick={() => setShowTaskForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-auto">
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-slate-300 rounded-md px-3 py-2"
            >
              <option value="all">All Statuses</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <Button variant="outline" onClick={() => handleExport('tasks')}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTasks.map((task) => (
                <TableRow key={task.id} className="cursor-pointer hover:bg-slate-50" onClick={() => handleTaskClick(task.id)}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {task.status === 'not-started' ? 'Not Started' :
                       task.status === 'in-progress' ? 'In Progress' : 'Completed'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${task.completionPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-500">{task.completionPercentage}%</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" onClick={() => handleEditTask(task)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedTasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No tasks found. Create a new task to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    );
  };

  const renderTodaysTasks = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Today's Tasks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {todaysTasks.length > 0 ? (
            todaysTasks.map((task) => (
              <TaskCardPremium 
                key={task.id} 
                task={task} 
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
                onEmployeeClick={() => handleEmployeeClick(task.assigneeId)}
              />
            ))
          ) : (
            <div className="col-span-2 bg-white rounded-lg shadow p-8 text-center">
              <p className="text-slate-500">No tasks due today.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCompletedTasks = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Completed Tasks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedTasksData.length > 0 ? (
            completedTasksData.map((task) => (
              <TaskCardPremium 
                key={task.id} 
                task={task} 
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
                onEmployeeClick={() => handleEmployeeClick(task.assigneeId)}
              />
            ))
          ) : (
            <div className="col-span-2 bg-white rounded-lg shadow p-8 text-center">
              <p className="text-slate-500">No completed tasks yet.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFutureTasks = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Future Tasks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureTasks.length > 0 ? (
            futureTasks.map((task) => (
              <TaskCardPremium 
                key={task.id} 
                task={task} 
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
                onEmployeeClick={() => handleEmployeeClick(task.assigneeId)}
              />
            ))
          ) : (
            <div className="col-span-2 bg-white rounded-lg shadow p-8 text-center">
              <p className="text-slate-500">No future tasks scheduled.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEmployees = () => {
    const paginatedEmployees = paginateItems(employees);
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Employees</h1>
          <Button onClick={() => setShowEmployeeForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-auto">
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => handleExport('employees')}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmployees.map((employee) => (
                <TableRow key={employee.id} className="cursor-pointer hover:bg-slate-50" onClick={() => handleEmployeeClick(employee.id)}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.hireDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" onClick={() => handleEditEmployee(employee)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteEmployee(employee.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No employees found. Add an employee to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-slate-500">Analytics dashboard coming soon...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex w-full">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 p-8 overflow-auto">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'tasks-all' && renderTasks()}
        {activeTab === 'tasks-today' && renderTodaysTasks()}
        {activeTab === 'tasks-completed' && renderCompletedTasks()}
        {activeTab === 'tasks-future' && renderFutureTasks()}
        {activeTab === 'employees' && renderEmployees()}
        {activeTab === 'analytics' && renderAnalytics()}
        
        {/* Forms */}
        {showTaskForm && (
          <TaskForm 
            onClose={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
            onSubmit={handleTaskSubmit}
            employees={employees}
            editingTask={editingTask}
          />
        )}
        
        {showEmployeeForm && (
          <EmployeeForm 
            onClose={() => {
              setShowEmployeeForm(false);
              setEditingEmployee(null);
            }}
            onSubmit={handleEmployeeSubmit}
            editingEmployee={editingEmployee}
          />
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".csv"
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default Index;
