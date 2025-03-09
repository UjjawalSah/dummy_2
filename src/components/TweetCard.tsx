
import React from 'react';
import { MoreHorizontal, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Tweet {
  id: string;
  text: string;
  username: string;
  profileImage: string;
  timestamp: string;
  classifications: {
    type: 'toxic' | 'threat' | 'obscene' | 'neutral';
    confidence: number;
  }[];
}

interface TweetCardProps {
  tweet: Tweet;
  onViewDetails: (tweet: Tweet) => void;
}

export const TweetCard: React.FC<TweetCardProps> = ({ tweet, onViewDetails }) => {
  const handleViewDetails = () => {
    onViewDetails(tweet);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'toxic': return 'bg-classification-toxic';
      case 'threat': return 'bg-classification-threat';
      case 'obscene': return 'bg-classification-obscene';
      default: return 'bg-classification-neutral';
    }
  };

  return (
    <div className="twitter-card hover:shadow-md p-4 mb-4 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          {tweet.profileImage ? (
            <img 
              src={tweet.profileImage} 
              alt={tweet.username} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <User size={20} className="text-muted-foreground" />
            </div>
          )}
          <div>
            <p className="font-medium text-foreground twitter-header">{tweet.username}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock size={12} className="mr-1" />
              <span>{tweet.timestamp}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal size={18} />
        </Button>
      </div>
      
      <p className="text-sm mb-3 text-balance twitter-content">{tweet.text}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {tweet.classifications.map((classification, index) => (
          <div 
            key={index} 
            className={`${getBadgeColor(classification.type)} text-white text-xs px-2 py-1 rounded-full flex items-center`}
          >
            <span className="capitalize">{classification.type}</span>
            <span className="ml-1 opacity-80">{Math.round(classification.confidence * 100)}%</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end twitter-footer">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleViewDetails}
          className="text-xs text-muted-foreground hover:text-foreground button-transition"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
