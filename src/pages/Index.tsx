
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { FilterPanel } from '@/components/FilterPanel';
import { TweetFeed } from '@/components/TweetFeed';
import { Analytics } from '@/components/Analytics';
import { Tweet } from '@/components/TweetCard';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Mock data for demonstration
  const mockTweets: Tweet[] = [
    {
      id: 't1',
      text: 'This new product is absolutely terrible! I want my money back immediately. #angry #refund',
      username: '@user1',
      profileImage: '',
      timestamp: '2h ago',
      classifications: [
        { type: 'toxic', confidence: 0.87 },
        { type: 'neutral', confidence: 0.13 }
      ]
    },
    {
      id: 't2',
      text: 'I\'m going to find you and make you pay for what you did. You better watch your back.',
      username: '@user2',
      profileImage: '',
      timestamp: '5h ago',
      classifications: [
        { type: 'threat', confidence: 0.92 },
        { type: 'toxic', confidence: 0.74 }
      ]
    },
    {
      id: 't3',
      text: 'This new feature is amazing! I love how intuitive it is to use. Great job team! #innovation',
      username: '@user3',
      profileImage: '',
      timestamp: '6h ago',
      classifications: [
        { type: 'neutral', confidence: 0.95 }
      ]
    },
    {
      id: 't4',
      text: 'The explicit content in this tweet is inappropriate for all ages. Please delete this immediately.',
      username: '@user4',
      profileImage: '',
      timestamp: '1d ago',
      classifications: [
        { type: 'obscene', confidence: 0.81 },
        { type: 'toxic', confidence: 0.45 }
      ]
    },
  ];

  const analyticsData = {
    totalTweets: 1254,
    totalClassified: 1128,
    classifications: [
      { name: 'Toxic', value: 347, color: '#FF5A5A' },
      { name: 'Threat', value: 189, color: '#FF9A5A' },
      { name: 'Obscene', value: 251, color: '#A45AFF' },
      { name: 'Neutral', value: 341, color: '#5AC8FF' },
    ],
    timeline: [
      { date: 'Mon', toxic: 24, threat: 13, obscene: 18, neutral: 45 },
      { date: 'Tue', toxic: 30, threat: 16, obscene: 22, neutral: 52 },
      { date: 'Wed', toxic: 27, threat: 18, obscene: 25, neutral: 49 },
      { date: 'Thu', toxic: 32, threat: 21, obscene: 27, neutral: 55 },
      { date: 'Fri', toxic: 35, threat: 22, obscene: 29, neutral: 47 },
      { date: 'Sat', toxic: 20, threat: 15, obscene: 21, neutral: 38 },
      { date: 'Sun', toxic: 15, threat: 10, obscene: 16, neutral: 30 },
    ]
  };

  const [tweets, setTweets] = useState<Tweet[]>(mockTweets);
  const [filteredTweets, setFilteredTweets] = useState<Tweet[]>(mockTweets);
  const navigate = useNavigate();

  const handleFilter = (filters: any) => {
    const filtered = tweets.filter(tweet => {
      return tweet.classifications.some(c => filters[c.type]);
    });
    setFilteredTweets(filtered);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredTweets(tweets);
      return;
    }
    
    const filtered = tweets.filter(tweet => 
      tweet.text.toLowerCase().includes(query.toLowerCase()) ||
      tweet.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTweets(filtered);
    
    toast({
      title: `Search Results: ${filtered.length} posts found`,
      description: `Search query: "${query}"`,
    });
  };

  const handleScrape = () => {
    navigate('/dashboard');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 gradient-text text-right md:text-right">SocialScan Dashboard</h1>
            <p className="text-muted-foreground text-lg text-right md:text-right">Monitor and analyze social content in real-time</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              className="gradient-bg hover:opacity-90 transition-opacity" 
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="social-card">
            <FilterPanel 
              onFilter={handleFilter}
              onSearch={handleSearch}
              onScrape={handleScrape}
            />
          </div>

          <div className="social-card">
            <Analytics data={analyticsData} />
          </div>

          <div className="social-card">
            <TweetFeed tweets={filteredTweets} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
