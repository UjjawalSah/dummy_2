
import React from 'react';
import { X, User, Clock, AlertTriangle, CheckCircle, InfoIcon } from 'lucide-react';
import { RedditPost } from './RedditCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DetailsModalProps {
  tweet: RedditPost;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ tweet, isOpen, onClose }) => {
  const getClassificationIcon = (type: string) => {
    switch (type) {
      case 'toxic': return <AlertTriangle size={16} className="text-classification-toxic" />;
      case 'threat': return <AlertTriangle size={16} className="text-classification-threat" />;
      case 'obscene': return <AlertTriangle size={16} className="text-classification-obscene" />;
      default: return <CheckCircle size={16} className="text-classification-neutral" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Reddit Post Details</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            {tweet.profileImage ? (
              <img 
                src={tweet.profileImage} 
                alt={tweet.username} 
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <User size={24} className="text-muted-foreground" />
              </div>
            )}
            <div>
              <p className="font-medium text-foreground">{tweet.username}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={14} className="mr-1" />
                <span>{tweet.timestamp}</span>
              </div>
            </div>
          </div>
          
          <div className="border border-border rounded-lg p-4 mb-4">
            <p className="text-foreground">{tweet.text}</p>
          </div>
          
          <div className="border border-border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-1">
              <InfoIcon size={16} className="text-primary" />
              <span>Classification Results</span>
            </h3>
            
            <div className="space-y-3">
              {tweet.classifications.map((classification, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getClassificationIcon(classification.type)}
                    <span className="capitalize">{classification.type}</span>
                  </div>
                  <div className="w-full max-w-[200px]">
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${classification.type === 'toxic' 
                          ? 'bg-classification-toxic' 
                          : classification.type === 'threat' 
                          ? 'bg-classification-threat' 
                          : classification.type === 'obscene' 
                          ? 'bg-classification-obscene' 
                          : 'bg-classification-neutral'}`}
                        style={{ width: `${classification.confidence * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                      <span>0%</span>
                      <span>{Math.round(classification.confidence * 100)}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="text-xs font-medium mb-2">Metadata</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Post ID:</span>
                  <span className="font-mono">{tweet.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Source:</span>
                  <span>Reddit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
