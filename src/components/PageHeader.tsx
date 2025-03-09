
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Shield, LogIn, UserPlus } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  transparent?: boolean;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  transparent = false,
  onLoginClick,
  onSignupClick
}) => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className={`w-full py-4 px-6 md:px-10 ${transparent ? 'absolute top-0 left-0 z-20' : 'border-b border-border'}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">ContentSafety.AI</h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="text-foreground hover:bg-secondary transition-all duration-200"
            >
              {theme === 'dark' ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </Button>
            
            <Button 
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={onLoginClick}
            >
              <LogIn size={18} />
              Login
            </Button>
            
            <Button 
              size="sm"
              className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              onClick={onSignupClick}
            >
              <UserPlus size={18} />
              Sign Up
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
