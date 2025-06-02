import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreVertical, Edit, Trash, Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Employee } from '@/types/Employee';
import Sidebar from '@/components/Sidebar';
import EmployeeForm from '@/components/EmployeeForm';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('employees');
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "728ed52f",
      name: "John Smith",
      email: "john.123@example.com",
      department: "Engineering",
      position: "Software Engineer",
      createdDate: "2022-01-15",
      status: "active",
      role: "employee",
      premiumAccess: false,
      employeeId: "EMP001",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      profilePicture: "https://github.com/shadcn.png",
      joiningDate: "2022-01-15",
      manager: "Jane Doe",
      employmentType: "Full-time",
      skills: ["JavaScript", "React", "Node.js"],
      certifications: ["AWS Certified Developer"],
      yearsOfExperience: 3,
      previousEmployers: ["ABC Corp"]
    },
    {
      id: "345tg96h",
      name: "Alice Johnson",
      email: "alice.j@example.com",
      department: "Marketing",
      position: "Marketing Manager",
      createdDate: "2021-08-20",
      status: "active",
      role: "manager",
      premiumAccess: true,
      employeeId: "EMP002",
      phoneNumber: "987-654-3210",
      address: "456 Oak Ave",
      profilePicture: "https://avatars.githubusercontent.com/u/876163?v=4",
      joiningDate: "2021-08-20",
      manager: "Bob Williams",
      employmentType: "Full-time",
      skills: ["Digital Marketing", "SEO", "Social Media"],
      certifications: ["Google Analytics Certified"],
      yearsOfExperience: 5,
      previousEmployers: ["XYZ Ltd"]
    },
    {
      id: "987bnm32",
      name: "Bob Williams",
      email: "bob.w@example.com",
      department: "Sales",
      position: "Sales Representative",
      createdDate: "2023-03-01",
      status: "inactive",
      role: "employee",
      premiumAccess: false,
      employeeId: "EMP003",
      phoneNumber: "555-123-4567",
      address: "789 Pine Ln",
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      joiningDate: "2023-03-01",
      manager: "Alice Johnson",
      employmentType: "Part-time",
      skills: ["Sales", "Customer Service", "Communication"],
      certifications: [],
      yearsOfExperience: 2,
      previousEmployers: ["PQR Inc"]
    },
    {
      id: "654hj890",
      name: "Jane Doe",
      email: "jane.d@example.com",
      department: "HR",
      position: "HR Coordinator",
      createdDate: "2022-11-10",
      status: "on-leave",
      role: "admin",
      premiumAccess: true,
      employeeId: "EMP004",
      phoneNumber: "111-222-3333",
      address: "321 Elm Rd",
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      joiningDate: "2022-11-10",
      manager: "N/A",
      employmentType: "Full-time",
      skills: ["HR Management", "Recruiting", "Employee Relations"],
      certifications: ["SHRM-CP"],
      yearsOfExperience: 4,
      previousEmployers: ["LMN Corp"]
    },
    {
      id: "234lkj56",
      name: "Charlie Brown",
      email: "charlie.b@example.com",
      department: "Finance",
      position: "Accountant",
      createdDate: "2023-06-05",
      status: "active",
      role: "employee",
      premiumAccess: false,
      employeeId: "EMP005",
      phoneNumber: "444-555-6666",
      address: "654 Maple Dr",
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      joiningDate: "2023-06-05",
      manager: "N/A",
      employmentType: "Contract",
      skills: ["Accounting", "Financial Analysis", "Tax Preparation"],
      certifications: ["CPA"],
      yearsOfExperience: 6,
      previousEmployers: ["UVW Co"]
    }
  ]);
  const [tasks, setTasks] = useState([
    {
      id: "task-1",
      title: "Design new dashboard",
      status: "todo",
      label: "Design",
      priority: "high",
    },
    {
      id: "task-2",
      title: "Implement login feature",
      status: "inprogress",
      label: "Development",
      priority: "high",
    },
    {
      id: "task-3",
      title: "Conduct user testing",
      status: "done",
      label: "Research",
      priority: "medium",
    },
  ]);

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

  const statuses = [
    {
      value: "todo",
      label: "Todo",
    },
    {
      value: "inprogress",
      label: "In Progress",
    },
    {
      value: "done",
      label: "Done",
    },
  ];

  const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ];

  const priorities = [
    {
      value: "high",
      label: "High",
    },
    {
      value: "medium",
      label: "Medium",
    },
    {
      value: "low",
      label: "Low",
    },
  ];

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(statuses[0].value);
  const [label, setLabel] = useState(labels[0].value);
  const [priority, setPriority] = useState(priorities[0].value);

  const handleTaskSubmit = (e: any) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        id: `task-${tasks.length + 1}`,
        title,
        status,
        label,
        priority,
      },
    ]);
    setOpen(false);
    toast({
      title: "Task created",
      description: "Your task has been successfully created.",
    })
  };

  const handleEmployeeInputChange = (field: string, value: string | boolean | string[]) => {
    setEmployeeFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock employee creation - in real app this would call an API or update context
    console.log('Creating employee:', employeeFormData);

    toast({
      title: "Employee added",
      description: "New employee has been successfully added.",
    });

    setEmployeeDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="space-x-2">
              <Button onClick={() => navigate('/add-employee')}>Add Employee</Button>
              <Button variant="outline">Add Task</Button>
            </div>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Task Board</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statuses.map((s) => (
                  <div key={s.value} className="space-y-4">
                    <h2 className="text-xl font-semibold">{s.label}</h2>
                    {tasks
                      .filter((task) => task.status === s.value)
                      .map((task) => (
                        <Card key={task.id} className="shadow-md">
                          <CardHeader>
                            <CardTitle className="text-lg">{task.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Badge variant="secondary">{task.label}</Badge>
                            <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Employee List</h2>
            <Card>
              <CardHeader>
                <CardTitle>Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of your employees.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <AvatarImage src={employee.profilePicture} alt={employee.name} />
                              <AvatarFallback>{employee.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span>{employee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={6}>No employees found.</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
            </Card>

            <div className="mt-6">
              <EmployeeForm 
                onSubmit={(employeeData) => {
                  setEmployees([...employees, { id: Math.random().toString(), ...employeeData }]);
                  toast({
                    title: "Employee added",
                    description: "New employee has been successfully added.",
                  });
                }}
                onClose={() => setEmployeeDialogOpen(false)}
              />
            </div>

            <Dialog open={employeeDialogOpen} onOpenChange={setEmployeeDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-16 hover:bg-blue-50">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">Add New Employee</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleEmployeeSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="emp-name">Full Name</Label>
                    <Input
                      id="emp-name"
                      value={employeeFormData.name}
                      onChange={(e) => handleEmployeeInputChange('name', e.target.value)}
                      required
                      placeholder="Enter employee name"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emp-email">Email</Label>
                    <Input
                      id="emp-email"
                      type="email"
                      value={employeeFormData.email}
                      onChange={(e) => handleEmployeeInputChange('email', e.target.value)}
                      required
                      placeholder="Enter email address"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emp-department">Department</Label>
                    <Input
                      id="emp-department"
                      value={employeeFormData.department}
                      onChange={(e) => handleEmployeeInputChange('department', e.target.value)}
                      required
                      placeholder="Enter department"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emp-position">Position</Label>
                    <Input
                      id="emp-position"
                      value={employeeFormData.position}
                      onChange={(e) => handleEmployeeInputChange('position', e.target.value)}
                      required
                      placeholder="Enter job position"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emp-status">Status</Label>
                    <Select value={employeeFormData.status} onValueChange={(value) => handleEmployeeInputChange('status', value as 'active' | 'inactive' | 'on-leave')}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="on-leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emp-role">Role</Label>
                    <Select value={employeeFormData.role} onValueChange={(value) => handleEmployeeInputChange('role', value as 'admin' | 'manager' | 'employee')}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emp-premium">Premium Access</Label>
                    <Select
                      value={employeeFormData.premiumAccess.toString()}
                      onValueChange={(value) => handleEmployeeInputChange('premiumAccess', value === 'true')}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select premium access" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emp-created-date">Created Date</Label>
                    <Input
                      id="emp-created-date"
                      type="date"
                      value={employeeFormData.createdDate}
                      onChange={(e) => handleEmployeeInputChange('createdDate', e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12"
                    >
                      Add Employee
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEmployeeDialogOpen(false)}
                      className="flex-1 h-12"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
