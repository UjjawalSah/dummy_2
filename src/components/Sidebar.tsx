
import React from 'react';
import { 
  LayoutDashboard, 
  MessagesSquare, 
  BarChart3, 
  Settings,
  User,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <MessagesSquare size={20} />, label: 'Reddit', active: false },
    { icon: <MessageCircle size={20} />, label: 'Comments', active: false },
    { icon: <BarChart3 size={20} />, label: 'Analytics', active: false },
    { icon: <Settings size={20} />, label: 'Settings', active: false },
  ];

  if (!isOpen) return null;

  return (
    <aside className="w-64 border-r border-border bg-card h-[calc(100vh-4rem)] flex-shrink-0 fixed md:relative z-20 animate-fade-in">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="flex gap-1">
              <MessagesSquare className="h-5 w-5 text-orange-500" />
              <MessageCircle className="h-5 w-5 text-orange-500" />
            </div>
            <span className="font-medium text-sm">SocialScan</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 mb-1 font-normal ${
                item.active ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
        
        <div className="p-4 mt-auto">
          <div className="card-glass p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">User Name</p>
              <p className="text-xs text-muted-foreground truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
