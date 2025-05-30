import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Plus, Filter, Edit, Trash2, ExternalLink, Users } from 'lucide-react';
import TaskForm from '@/components/TaskForm';
import EmployeeForm from '@/components/EmployeeForm';
import { Task } from '@/types/Task';
import { Employee } from '@/types/Employee';

// Sample employees data
const getSampleEmployees = (): Employee[] => {
  return [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      department: 'Engineering',
      position: 'Backend Developer',
      createdDate: '2024-02-01'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      department: 'Design',
      position: 'UI/UX Designer',
      createdDate: '2024-01-20'
    },
    {
      id: '4',
      name: 'David Park',
      email: 'david.park@company.com',
      department: 'Engineering',
      position: 'Data Scientist',
      createdDate: '2024-03-01'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa.wang@company.com',
      department: 'Engineering',
      position: 'Frontend Developer',
      createdDate: '2024-02-15'
    },
    {
      id: '6',
      name: 'Alex Thompson',
      email: 'alex.thompson@company.com',
      department: 'Engineering',
      position: 'Security Engineer',
      createdDate: '2024-03-10'
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

  const getFilteredEmployees = () => {
    return employees.filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

  const getStatusBadge = (task: Task) => {
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
            <div className="flex gap-3">
              <Button 
                onClick={() => setIsEmployeeFormOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <Users className="mr-2 h-5 w-5" />
                Add Employee
              </Button>
              <Button 
                onClick={() => setIsTaskFormOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                New Task
              </Button>
            </div>
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
              <h3 className="text-lg font-semibold">Total Employees</h3>
              <p className="text-3xl font-bold mt-2">{employees.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
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

            {/* Task Tabs */}
            <Tabs defaultValue="today" className="w-full" onValueChange={() => setCurrentPage(1)}>
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
                    const paginatedTasks = getPaginatedTasks(filteredTasks);
                    const totalPages = getTotalPages(filteredTasks.length);
                    
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
                                onClick={() => setIsTaskFormOpen(true)}
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
                      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                        {/* Records Count */}
                        <div className="px-6 py-4 border-b border-slate-200">
                          <p className="text-sm text-slate-600">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTasks.length)} of {filteredTasks.length} records
                          </p>
                        </div>

                        {/* Table */}
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Employee</TableHead>
                              <TableHead>Task Name</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Start Date</TableHead>
                              <TableHead>Est. End Date</TableHead>
                              <TableHead>Actual End Date</TableHead>
                              <TableHead>Tool Links</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {paginatedTasks.map((task) => (
                              <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.employeeName}</TableCell>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{task.taskName}</div>
                                    <div className="text-sm text-slate-500 truncate max-w-xs">{task.description}</div>
                                  </div>
                                </TableCell>
                                <TableCell>{getCategoryBadge(task.category)}</TableCell>
                                <TableCell>{getStatusBadge(task)}</TableCell>
                                <TableCell>{formatDate(task.startDate)}</TableCell>
                                <TableCell>{formatDate(task.estimatedEndDate)}</TableCell>
                                <TableCell>{task.actualEndDate ? formatDate(task.actualEndDate) : '-'}</TableCell>
                                <TableCell>
                                  <div className="flex gap-1">
                                    {task.toolLinks.slice(0, 2).map((link) => (
                                      <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded"
                                      >
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        {link.name}
                                      </a>
                                    ))}
                                    {task.toolLinks.length > 2 && (
                                      <span className="text-xs text-slate-500">+{task.toolLinks.length - 2} more</span>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setEditingTask(task)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => deleteTask(task.id)}
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

                        {/* Pagination */}
                        {totalPages > 1 && (
                          <div className="px-6 py-4 border-t border-slate-200">
                            <Pagination>
                              <PaginationContent>
                                <PaginationItem>
                                  <PaginationPrevious 
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                  />
                                </PaginationItem>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                  />
                                </PaginationItem>
                              </PaginationContent>
                            </Pagination>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees">
            <div className="flex justify-between items-center mb-6">
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {(() => {
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
                        <TableHead>Created Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-medium">{employee.name}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {employee.department}
                            </span>
                          </TableCell>
                          <TableCell>{employee.position}</TableCell>
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
            })()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Forms */}
      {(isTaskFormOpen || editingTask) && (
        <TaskForm
          task={editingTask}
          employees={employees}
          onSubmit={editingTask ? updateTask : addTask}
          onClose={() => {
            setIsTaskFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}

      {(isEmployeeFormOpen || editingEmployee) && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={editingEmployee ? updateEmployee : addEmployee}
          onClose={() => {
            setIsEmployeeFormOpen(false);
            setEditingEmployee(null);
          }}
        />
      )}
    </div>
  );
};

export default Index;
