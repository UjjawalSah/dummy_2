
import React from 'react';
import { Mail, Github, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const PageFooter: React.FC = () => {
  return (
    <footer className="py-10 px-4 border-t bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">ContentSafety.AI</h3>
            </div>
            <p className="text-muted-foreground">
              Monitor and analyze digital content for safety with our advanced AI classification models
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Shield size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Dashboard', 'Documentation', 'API', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-lg font-semibold">Classification Models</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Fine-tuned BERT</li>
              <li className="text-muted-foreground">Logistic Regression</li>
              <li className="text-muted-foreground">Custom API Integration</li>
              <li className="text-muted-foreground">Enterprise Solutions</li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t text-center text-muted-foreground"
        >
          <p className="flex items-center justify-center gap-1">
            © {new Date().getFullYear()} ContentSafety.AI - AI-Powered Content Safety Classification. Made with <Heart size={14} className="text-red-500" /> by AI Experts
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
