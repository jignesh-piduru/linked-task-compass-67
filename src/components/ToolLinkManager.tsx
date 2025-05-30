import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import { ToolLink } from '@/types/Task';

interface ToolLinkManagerProps {
  toolLinks: ToolLink[];
  onChange: (toolLinks: ToolLink[]) => void;
}

const ToolLinkManager = ({ toolLinks, onChange }: ToolLinkManagerProps) => {
  const [newLink, setNewLink] = useState({ name: '', url: '' });

  const addLink = () => {
    if (newLink.name.trim() && newLink.url.trim()) {
      const link: ToolLink = {
        id: Date.now().toString(),
        name: newLink.name.trim(),
        url: newLink.url.trim()
      };
      onChange([...toolLinks, link]);
      setNewLink({ name: '', url: '' });
    }
  };

  const removeLink = (id: string) => {
    onChange(toolLinks.filter(link => link.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLink();
    }
  };

  return (
    <div className="space-y-3">
      {/* Existing Links */}
      {toolLinks.length > 0 && (
        <div className="space-y-2">
          {toolLinks.map((link) => (
            <Card key={link.id} className="bg-slate-50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <LinkIcon className="h-4 w-4 text-slate-500 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-slate-900 truncate">{link.name}</p>
                      <p className="text-xs text-slate-600 truncate">{link.url}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(link.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Link */}
      <Card className="border-dashed border-2 border-slate-300">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Link name (e.g., GitHub Repo)"
                value={newLink.name}
                onChange={(e) => setNewLink(prev => ({ ...prev, name: e.target.value }))}
                onKeyPress={handleKeyPress}
              />
              <Input
                placeholder="URL (e.g., https://github.com/...)"
                value={newLink.url}
                onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button
              type="button"
              onClick={addLink}
              disabled={!newLink.name.trim() || !newLink.url.trim()}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Tool Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolLinkManager;
