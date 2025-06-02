
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Plus, Filter, Edit, Trash2, Users, Download, Upload, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import TaskForm from '@/components/TaskForm';
import EmployeeForm from '@/components/EmployeeForm';
import Sidebar from '@/components/Sidebar';
import TaskCardPremium from '@/components/TaskCardPremium';
import { Task } from '@/types/Task';
import { Employee } from '@/types/Employee';
import { exportToCSV, handleFileImport, validateEmployeeData, validateTaskData } from '@/utils/csvUtils';

// Sample employees data with new fields
const getSampleEmployees = (): Employee[] => {
  return [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      createdDate: '2024-01-15',
      status: 'active',
      role: 'manager',
      premiumAccess: true
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      department: 'Engineering',
      position: 'Backend Developer',
      createdDate: '2024-02-01',
      status: 'active',
      role: 'employee',
      premiumAccess: false
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      department: 'Design',
      position: 'UI/UX Designer',
      createdDate: '2024-01-20',
      status: 'active',
      role: 'employee',
      premiumAccess: true
    },
    {
      id: '4',
      name: 'David Park',
      email: 'david.park@company.com',
      department: 'Engineering',
      position: 'Data Scientist',
      createdDate: '2024-03-01',
      status: 'on-leave',
      role: 'employee',
      premiumAccess: false
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa.wang@company.com',
      department: 'Engineering',
      position: 'Frontend Developer',
      createdDate: '2024-02-15',
      status: 'active',
      role: 'employee',
      premiumAccess: true
    },
    {
      id: '6',
      name: 'Alex Thompson',
      email: 'alex.thompson@company.com',
      department: 'Engineering',
      position: 'Security Engineer',
      createdDate: '2024-03-10',
      status: 'inactive',
      role: 'admin',
      premiumAccess: true
    }
  ];
};

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const taskFileInputRef = useRef<HTMLInputElement>(null);
  const employeeFileInputRef = useRef<HTMLInputElement>(null);
  
  const [tasks, setTasks] = useState<Task[]>(getSampleTasks());
  const [employees, setEmployees] = useState<Employee[]>(getSampleEmployees());
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isEmployeeFormOpen, setIsEmployeeFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'Product' | 'R&D'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState('tasks');
  
  // Employee filters
  const [employeeStatusFilter, setEmployeeStatusFilter] = useState<'all' | 'active' | 'inactive' | 'on-leave'>('all');
  const [employeeRoleFilter, setEmployeeRoleFilter] = useState<'all' | 'admin' | 'manager' | 'employee'>('all');
  const [employeeDepartmentFilter, setEmployeeDepartmentFilter] = useState<'all' | 'Engineering' | 'Design' | 'Marketing' | 'Sales' | 'HR' | 'Finance'>('all');

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks([...tasks, task]);
    setIsTaskFormOpen(false);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addEmployee = (newEmployee: Omit<Employee, 'id'>) => {
    const employee: Employee = {
      ...newEmployee,
      id: Date.now().toString(),
    };
    setEmployees([...employees, employee]);
    setIsEmployeeFormOpen(false);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(employee => 
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    ));
    setEditingEmployee(null);
  };

  const deleteEmployee = (employeeId: string) => {
    setEmployees(employees.filter(employee => employee.id !== employeeId));
  };

  const today = new Date().toISOString().split('T')[0];

  const getFilteredTasks = (tabFilter: string) => {
    let filteredByTab = tasks;

    switch (tabFilter) {
      case 'tasks-today':
        filteredByTab = tasks.filter(task => task.startDate === today);
        break;
      case 'tasks-all':
        filteredByTab = tasks;
        break;
      case 'tasks-completed':
        filteredByTab = tasks.filter(task => !!task.actualEndDate);
        break;
      case 'tasks-future':
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

  const getFilteredEmployees = () => {
    return employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.position.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = employeeStatusFilter === 'all' || employee.status === employeeStatusFilter;
      const matchesRole = employeeRoleFilter === 'all' || employee.role === employeeRoleFilter;
      const matchesDepartment = employeeDepartmentFilter === 'all' || employee.department === employeeDepartmentFilter;
      
      return matchesSearch && matchesStatus && matchesRole && matchesDepartment;
    });
  };

  const getPaginatedTasks = (filteredTasks: Task[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTasks.slice(startIndex, endIndex);
  };

  const getPaginatedEmployees = (filteredEmployees: Employee[]) => {
    const startIndex = (employeeCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEmployees.slice(startIndex, endIndex);
  };

  const getTotalPages = (totalItems: number) => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getEmployeeStatusBadge = (status?: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800', 
      'on-leave': 'bg-yellow-100 text-yellow-800'
    };
    const colorClass = statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
    return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>{status || 'Unknown'}</span>;
  };

  const getRoleBadge = (role?: string) => {
    const roleColors = {
      admin: 'bg-purple-100 text-purple-800',
      manager: 'bg-blue-100 text-blue-800',
      employee: 'bg-gray-100 text-gray-800'
    };
    const colorClass = roleColors[role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800';
    return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>{role || 'Employee'}</span>;
  };

  const getTaskStatusBadge = (task: Task) => {
    if (task.actualEndDate) {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>;
    }
    if (task.startDate > today) {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Future</span>;
    }
    return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">In Progress</span>;
  };

  const getCategoryBadge = (category: string) => {
    const colorClass = category === 'Product' ? 'bg-purple-100 text-purple-800' : 'bg-teal-100 text-teal-800';
    return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>{category}</span>;
  };

  const completedTasks = tasks.filter(task => task.actualEndDate).length;
  const inProgressTasks = tasks.filter(task => !task.actualEndDate).length;
  const todayTasks = tasks.filter(task => task.startDate === today).length;
  const futureTasks = tasks.filter(task => task.startDate > today).length;
  const totalEmployees = employees.length;

  const handleUserNameClick = (employee: Employee) => {
    const userSlug = employee.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/user/${userSlug}`, { state: { employee, employees, tasks } });
  };

  const handleTaskExport = () => {
    const exportData = tasks.map(task => ({
      ...task,
      toolLinks: task.toolLinks.map(link => `${link.name}: ${link.url}`).join('; ')
    }));
    exportToCSV(exportData, 'tasks.csv');
    toast({
      title: "Export Successful",
      description: "Tasks have been exported to CSV file."
    });
  };

  const handleEmployeeExport = () => {
    exportToCSV(employees, 'employees.csv');
    toast({
      title: "Export Successful", 
      description: "Employees have been exported to CSV file."
    });
  };

  const handleTaskImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    handleFileImport(
      file,
      (data) => {
        const validatedTasks = validateTaskData(data);
        setTasks(prev => [...prev, ...validatedTasks]);
        toast({
          title: "Import Successful",
          description: `${validatedTasks.length} tasks have been imported.`
        });
      },
      (error) => {
        toast({
          title: "Import Failed",
          description: error,
          variant: "destructive"
        });
      }
    );
    
    // Reset file input
    if (taskFileInputRef.current) {
      taskFileInputRef.current.value = '';
    }
  };

  const handleEmployeeImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    handleFileImport(
      file,
      (data) => {
        const validatedEmployees = validateEmployeeData(data);
        setEmployees(prev => [...prev, ...validatedEmployees]);
        toast({
          title: "Import Successful",
          description: `${validatedEmployees.length} employees have been imported.`
        });
      },
      (error) => {
        toast({
          title: "Import Failed",
          description: error,
          variant: "destructive"
        });
      }
    );
    
    // Reset file input
    if (employeeFileInputRef.current) {
      employeeFileInputRef.current.value = '';
    }
  };

  const handleTaskClick = (task: Task) => {
    navigate(`/task/${task.id}`);
  };

  const handleEmployeeNameClick = (employeeName: string) => {
    const employee = employees.find(emp => emp.name === employeeName);
    if (employee) {
      const userSlug = employee.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/user/${userSlug}`);
    }
  };

  const getTaskTypeTitle = (activeTab: string) => {
    switch (activeTab) {
      case 'tasks-today':
        return "Today's Tasks";
      case 'tasks-all':
        return 'All Tasks';
      case 'tasks-completed':
        return 'Completed Tasks';
      case 'tasks-future':
        return 'Future Tasks';
      default:
        return 'Tasks';
    }
  };

  const renderTasksView = () => {
    const filteredTasks = getFilteredTasks(activeTab);
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{getTaskTypeTitle(activeTab)}</h2>
            <p className="text-slate-600">Manage your team's tasks and projects</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => taskFileInputRef.current?.click()}
              variant="outline"
              size="sm"
            >
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button 
              onClick={handleTaskExport}
              variant="outline"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button 
              onClick={() => setIsTaskFormOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search tasks or employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="border border-slate-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Categories</option>
            <option value="Product">Product</option>
            <option value="R&D">R&D</option>
          </select>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {getPaginatedTasks(filteredTasks).map((task) => (
            <TaskCardPremium
              key={task.id}
              task={task}
              employees={employees}
              onTaskClick={handleTaskClick}
              onEmployeeClick={handleEmployeeNameClick}
              onTaskUpdate={updateTask}
            />
          ))}
        </div>

        {/* Pagination */}
        {getTotalPages(filteredTasks.length) > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {Array.from({ length: getTotalPages(filteredTasks.length) }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(getTotalPages(filteredTasks.length), currentPage + 1))}
                  className={currentPage === getTotalPages(filteredTasks.length) ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    );
  };

  const renderEmployeesView = () => {
    const filteredEmployees = getFilteredEmployees();
    const paginatedEmployees = getPaginatedEmployees(filteredEmployees);
    const totalPages = getTotalPages(filteredEmployees.length);

    if (filteredEmployees.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No employees found
            </h3>
            <p className="text-slate-600 mb-6">
              {employees.length === 0 
                ? "Get started by adding your first employee!" 
                : "Try adjusting your search terms to find employees."}
            </p>
            {employees.length === 0 && (
              <Button 
                onClick={() => setIsEmployeeFormOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Users className="mr-2 h-4 w-4" />
                Add First Employee
              </Button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <p className="text-sm text-slate-600">
            Showing {((employeeCurrentPage - 1) * itemsPerPage) + 1} to {Math.min(employeeCurrentPage * itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} records
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">
                  <button
                    onClick={() => handleUserNameClick(employee)}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    {employee.name}
                  </button>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {employee.department}
                  </span>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{getEmployeeStatusBadge(employee.status)}</TableCell>
                <TableCell>{getRoleBadge(employee.role)}</TableCell>
                <TableCell>
                  {employee.premiumAccess ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Premium
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Standard
                    </span>
                  )}
                </TableCell>
                <TableCell>{formatDate(employee.createdDate)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingEmployee(employee)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteEmployee(employee.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setEmployeeCurrentPage(Math.max(1, employeeCurrentPage - 1))}
                    className={employeeCurrentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setEmployeeCurrentPage(page)}
                      isActive={employeeCurrentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setEmployeeCurrentPage(Math.min(totalPages, employeeCurrentPage + 1))}
                    className={employeeCurrentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    );
  };

  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-600">Overview of your team's progress</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold">Total Tasks</h3>
            <p className="text-3xl font-bold">{tasks.length}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold">Completed</h3>
            <p className="text-3xl font-bold">{completedTasks}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold">In Progress</h3>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{inProgressTasks}</p>
              <div className="text-right">
                <p className="text-sm opacity-90">Total Employees</p>
                <p className="text-xl font-semibold">{totalEmployees}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold">Future Tasks</h3>
            <p className="text-3xl font-bold">{futureTasks}</p>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Tasks</h3>
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <TaskCardPremium
                key={task.id}
                task={task}
                employees={employees}
                onTaskClick={handleTaskClick}
                onEmployeeClick={handleEmployeeNameClick}
                onTaskUpdate={updateTask}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Calendar</h2>
          <p className="text-slate-600">View tasks and deadlines in calendar format</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <div className="text-center py-12">
            <CalendarIcon className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Calendar View</h3>
            <p className="text-slate-600">Calendar functionality coming soon</p>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analytics</h2>
          <p className="text-slate-600">Track performance and productivity metrics</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Task Completion Rate</h3>
            <div className="text-center py-8">
              <div className="text-4xl font-bold text-green-600">
                {tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0}%
              </div>
              <p className="text-slate-600 mt-2">Tasks Completed</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Team Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Active Employees</span>
                <span className="font-semibold">{employees.filter(emp => emp.status === 'active').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Avg Tasks per Employee</span>
                <span className="font-semibold">{totalEmployees > 0 ? Math.round(tasks.length / totalEmployees) : 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
          <p className="text-slate-600">Configure your application preferences</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">General Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Email Notifications</span>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Theme Preferences</span>
                  <Button variant="outline" size="sm">Customize</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">Data Export</span>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab.startsWith('tasks-')) {
      return renderTasksView();
    }
    
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'employees':
        return renderEmployeesView();
      case 'calendar':
        return renderCalendar();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={taskFileInputRef}
        onChange={handleTaskImport}
        accept=".csv"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={employeeFileInputRef}
        onChange={handleEmployeeImport}
        accept=".csv"
        style={{ display: 'none' }}
      />

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>

      {/* Forms */}
      {isTaskFormOpen && (
        <TaskForm
          employees={employees}
          onSubmit={addTask}
          onClose={() => setIsTaskFormOpen(false)}
        />
      )}

      {isEmployeeFormOpen && (
        <EmployeeForm
          onSubmit={addEmployee}
          onClose={() => setIsEmployeeFormOpen(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          employees={employees}
          onSubmit={updateTask}
          onClose={() => setEditingTask(null)}
        />
      )}

      {editingEmployee && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={updateEmployee}
          onClose={() => setEditingEmployee(null)}
        />
      )}
    </div>
  );
};

export default Index;
