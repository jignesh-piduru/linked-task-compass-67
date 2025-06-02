
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-slate-200"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      
      days.push(
        <div key={day} className={`h-24 border border-slate-200 p-2 hover:bg-blue-50 transition-colors ${isToday ? 'bg-blue-100' : 'bg-white'}`}>
          <div className={`text-sm font-medium ${isToday ? 'text-blue-700' : 'text-slate-900'}`}>
            {day}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Calendar</h1>
            <p className="text-slate-600 mt-1">Manage your schedule and deadlines</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0 rounded-lg overflow-hidden border border-slate-200">
            {/* Days of week header */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-slate-100 p-3 text-center text-sm font-medium text-slate-700 border-b border-slate-200">
                {day}
              </div>
            ))}
            {/* Calendar days */}
            {renderCalendarGrid()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
