
import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');

  const settingsSections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data & Storage', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">General Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
          <Input placeholder="Your Company Name" defaultValue="TaskFlow Inc." />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Time Zone</label>
          <select className="w-full border border-slate-300 rounded-md px-3 py-2">
            <option>UTC-8 (Pacific Time)</option>
            <option>UTC-5 (Eastern Time)</option>
            <option>UTC+0 (Greenwich Mean Time)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
          <select className="w-full border border-slate-300 rounded-md px-3 py-2">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">Profile Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <Button variant="outline">Change Avatar</Button>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
          <Input placeholder="John Doe" defaultValue="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <Input type="email" placeholder="john@company.com" defaultValue="john@company.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Position</label>
          <Input placeholder="Project Manager" defaultValue="Project Manager" />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">Notification Settings</h3>
      <div className="space-y-4">
        {[
          'Task assignments',
          'Task completions',
          'Deadline reminders',
          'Team updates',
          'System maintenance'
        ].map((notification) => (
          <div key={notification} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
            <span className="text-slate-700">{notification}</span>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm text-slate-600">Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-slate-600">Push</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      default:
        return (
          <div className="text-center py-12">
            <p className="text-slate-500">Settings section coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Configure your application preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <nav className="space-y-2">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            {renderContent()}
            
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex justify-end space-x-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
