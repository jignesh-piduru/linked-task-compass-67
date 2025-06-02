
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, UserPlus } from 'lucide-react';
import { Employee } from '@/types/Employee';
import { useNavigate } from 'react-router-dom';

interface EmployeeActionsProps {
  employee: Employee;
  onEdit?: (employee: Employee) => void;
  onDelete?: (employeeId: string) => void;
  onView?: (employee: Employee) => void;
  showActions?: boolean;
}

const EmployeeActions: React.FC<EmployeeActionsProps> = ({ 
  employee, 
  onEdit, 
  onDelete, 
  onView, 
  showActions = true 
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (onEdit) {
      onEdit(employee);
    } else {
      console.log('Edit employee functionality:', employee.id);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      if (onDelete) {
        onDelete(employee.id);
      } else {
        console.log('Delete employee functionality:', employee.id);
      }
    }
  };

  const handleView = () => {
    if (onView) {
      onView(employee);
    } else {
      const employeeUrlName = employee.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/user/${employeeUrlName}`);
    }
  };

  const getStatusBadge = () => {
    const status = employee.status || 'active';
    const statusColors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-red-100 text-red-800 border-red-200',
      'on-leave': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    
    return (
      <Badge className={`${statusColors[status]} font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={handleView}
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {employee.name}
          </button>
          {getStatusBadge()}
        </div>
        <p className="text-sm text-gray-600">{employee.position}</p>
        <p className="text-sm text-gray-500">{employee.department}</p>
        <p className="text-xs text-gray-400">{employee.email}</p>
      </div>
      
      {showActions && (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleView}
            className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-full"
            title="View Profile"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-100 hover:text-gray-700 rounded-full"
            title="Edit Employee"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-full"
            title="Delete Employee"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmployeeActions;
