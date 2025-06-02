
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
  isCompletedTasks?: boolean;
}

const TasksTable: React.FC<TasksTableProps> = ({ 
  tasks, 
  employees, 
  onUpdate, 
  onDelete,
  isCompletedTasks = false
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const isMobile = useIsMobile();

  // Mobile view
  if (isMobile) {
    return (
      <>
        <div className="h-[calc(100vh-280px)] overflow-y-auto pr-2">
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskMobileCard
                key={task.id}
                task={task}
                onView={setSelectedTask}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>

        <TaskDetailModal
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          employees={employees}
          onUpdate={onUpdate}
        />
      </>
    );
  }

  // Desktop view
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 h-[calc(100vh-280px)] flex flex-col">
        {/* Fixed Header */}
        <div className="flex-shrink-0 border-b border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-200">
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
          </Table>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="min-w-[1200px]">
              <Table>
                <TableBody>
                  {tasks.map((task, index) => (
                    <TaskTableRow
                      key={task.id}
                      task={task}
                      index={index}
                      onView={setSelectedTask}
                      onDelete={onDelete}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" className="bg-gray-200" />
            <ScrollBar orientation="vertical" className="bg-gray-200" />
          </ScrollArea>
        </div>
        
        {/* Fixed Footer */}
        {tasks.length > 0 && (
          <div className="flex-shrink-0 px-6 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600 font-medium">
              Showing 1 to {tasks.length} of {tasks.length} records
            </p>
          </div>
        )}
      </div>

      <TaskDetailModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        employees={employees}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default TasksTable;
