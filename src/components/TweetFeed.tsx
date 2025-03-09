
import React, { useState } from 'react';
import { RedditCard, RedditPost } from './RedditCard';
import { DetailsModal } from './DetailsModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface RedditFeedProps {
  tweets: RedditPost[];
}

export const TweetFeed: React.FC<RedditFeedProps> = ({ tweets }) => {
  const [selectedPost, setSelectedPost] = useState<RedditPost | null>(null);
  
  const handleViewDetails = (post: RedditPost) => {
    setSelectedPost(post);
  };
  
  const handleCloseModal = () => {
    setSelectedPost(null);
  };
  
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-orange-500" />
          <span>Analyzed Content</span>
        </CardTitle>
        <CardDescription>
          Review analyzed content with AI safety classification
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {tweets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No content analyzed yet</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Use the input panel to analyze content URLs or paste text directly for classification
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tweets.map((post) => (
              <RedditCard 
                key={post.id} 
                tweet={post} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </CardContent>
      
      {selectedPost && (
        <DetailsModal 
          tweet={selectedPost} 
          isOpen={!!selectedPost} 
          onClose={handleCloseModal}
        />
      )}
    </Card>
  );
};
