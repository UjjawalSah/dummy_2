
import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  Settings, 
  User,
  X,
  Moon,
  Sun,
  Search,
  LogIn,
  UserPlus,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/hooks/use-theme';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { AuthModal } from '@/components/AuthModal';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const openLoginModal = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };
  
  const openSignupModal = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="w-full border-b border-border bg-card py-2 px-4 md:px-6 flex items-center justify-between h-16 z-10">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-foreground hover:bg-secondary transition-all duration-200"
          >
            {sidebarOpen && !isMobile ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold text-foreground hidden md:block text-right">Reddit Content Classifier</h1>
            <h1 className="text-lg font-semibold text-foreground md:hidden">Reddit Classifier</h1>
          </div>
        </div>
        
        {isSearchOpen && !isMobile ? (
          <div className="flex-1 max-w-md mx-4 relative animate-fade-in">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search Reddit posts..." 
              className="pl-9 pr-9"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1"
              onClick={() => setIsSearchOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>
        ) : null}
        
        <div className="flex items-center gap-2">
          {!isSearchOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground hover:bg-secondary transition-all duration-200"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground hover:bg-secondary transition-all duration-200"
            onClick={toggleDarkMode}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary transition-all duration-200 relative">
                <Bell size={20} />
                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]">3</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Scraping Complete</span>
                  <span className="text-xs text-muted-foreground">Scraped 15 new Reddit posts</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">New Toxic Content</span>
                  <span className="text-xs text-muted-foreground">2 posts classified as toxic</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">System Update</span>
                  <span className="text-xs text-muted-foreground">Model updated to v2.1</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary transition-all duration-200">
            <Settings size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={openLoginModal}
            className="text-foreground hover:bg-secondary transition-all duration-200 md:hidden"
          >
            <LogIn size={20} />
          </Button>
          
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={openLoginModal}
              className="text-foreground hover:bg-secondary"
            >
              <LogIn size={18} className="mr-1" />
              Login
            </Button>
            
            <Button
              size="sm"
              onClick={openSignupModal}
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            >
              <UserPlus size={18} className="mr-1" />
              Sign Up
            </Button>
          </div>
        </div>
      </header>
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialMode={authMode}
      />
    </>
  );
};
