
import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { 
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Task } from '@/types/Task';
import { Employee } from '@/types/Employee';
import { useIsMobile } from '@/hooks/use-mobile';
import TaskDetailModal from './TaskDetailModal';
import TaskTableRow from './TaskTableRow';
import TaskMobileCard from './TaskMobileCard';

interface TasksTableProps {
  tasks: Task[];
  employees: Employee[];
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onCreate?: () => void;
  isCompletedTasks?: boolean;
}

const TasksTable: React.FC<TasksTableProps> = ({ 
  tasks, 
  employees, 
  onUpdate, 
  onDelete,
  onCreate,
  isCompletedTasks = false
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const isMobile = useIsMobile();

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setEditingTask(null);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    onUpdate(updatedTask);
    handleCloseModal();
  };

  // Mobile view
  if (isMobile) {
    const containerClass = isCompletedTasks 
      ? "space-y-3 max-h-[500px] overflow-y-auto pr-2"
      : "space-y-3";

    return (
      <>
        <div className={containerClass}>
          {tasks.map((task) => (
            <TaskMobileCard
              key={task.id}
              task={task}
              onView={setSelectedTask}
              onDelete={onDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>

        <TaskDetailModal
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={handleCloseModal}
          employees={employees}
          onUpdate={handleTaskUpdate}
        />
      </>
    );
  }

  // Desktop view
  const tableContainerClass = isCompletedTasks 
    ? "bg-white rounded-lg shadow-lg border border-gray-200 max-h-[500px]"
    : "bg-white rounded-lg shadow-lg border border-gray-200";

  return (
    <>
      <div className={tableContainerClass}>
        <ScrollArea className="h-full w-full">
          <div className="min-w-[1200px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-200 sticky top-0 z-20">
                  <TableHead className="font-bold text-gray-800 px-6 py-4 text-left w-32">Employee</TableHead>
                  <TableHead className="font-bold text-gray-800 px-6 py-4 text-left min-w-80">Task Name</TableHead>
                  <TableHead className="font-bold text-gray-800 px-6 py-4 text-left w-32">Category</TableHead>
                  <TableHead className="font-bold text-gray-800 px-6 py-4 text-left w-32">Status</TableHead>
                  <TableHead className="font-bold text-gray-800 px-6 py-4 text-left w-28">Start Date</TableHead>
                  <TableHead className="font-bold text-gray-800 px-6 py-4 text-left w-28">Est. End Date</TableHead>
                  <TableHead className="font-bold text-gray-800 px-6 py-4 text-left w-32">Actual End Date</TableHead>
                  <TableHead className="font-bold text-gray-800 px-6 py-4 text-left w-40">Tool Links</TableHead>
                  <TableHead className="font-bold text-gray-800 px-6 py-4 text-left w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task, index) => (
                  <TaskTableRow
                    key={task.id}
                    task={task}
                    index={index}
                    onView={setSelectedTask}
                    onDelete={onDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" className="bg-gray-200" />
          {isCompletedTasks && <ScrollBar orientation="vertical" className="bg-gray-200" />}
        </ScrollArea>
        
        {tasks.length > 0 && !isCompletedTasks && (
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600 font-medium">
              Showing 1 to {tasks.length} of {tasks.length} records
            </p>
          </div>
        )}
      </div>

      <TaskDetailModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={handleCloseModal}
        employees={employees}
        onUpdate={handleTaskUpdate}
      />
    </>
  );
};

export default TasksTable;
