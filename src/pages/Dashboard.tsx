import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { FilterPanel } from '@/components/FilterPanel';
import { TweetFeed } from '@/components/TweetFeed';
import { Analytics } from '@/components/Analytics';
import { InputPanel } from '@/components/InputPanel';
import { RedditPost } from '@/components/RedditCard';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, BarChart, LineChart, PieChart } from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const mockPosts: RedditPost[] = [
    {
      id: 'r1',
      text: 'This new product is absolutely terrible! I want my money back immediately. #angry #refund',
      username: 'u/user1',
      profileImage: '',
      timestamp: '2h ago',
      classifications: [
        { type: 'toxic', confidence: 0.87 },
        { type: 'neutral', confidence: 0.13 }
      ]
    },
    {
      id: 'r2',
      text: 'I\'m going to find you and make you pay for what you did. You better watch your back.',
      username: 'u/user2',
      profileImage: '',
      timestamp: '5h ago',
      classifications: [
        { type: 'threat', confidence: 0.92 },
        { type: 'toxic', confidence: 0.74 }
      ]
    },
    {
      id: 'r3',
      text: 'This new feature is amazing! I love how intuitive it is to use. Great job team! #innovation',
      username: 'u/user3',
      profileImage: '',
      timestamp: '6h ago',
      classifications: [
        { type: 'neutral', confidence: 0.95 }
      ]
    },
    {
      id: 'r4',
      text: 'The explicit content in this post is inappropriate for all ages. Please delete this immediately.',
      username: 'u/user4',
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
    totalPosts: 1254,
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

  const [posts, setPosts] = useState<RedditPost[]>(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState<RedditPost[]>(mockPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModel, setActiveModel] = useState('bert');

  const handleFilter = (filters: any) => {
    const filtered = posts.filter(post => {
      return post.classifications.some(c => filters[c.type]);
    });
    setFilteredPosts(filtered);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredPosts(posts);
      return;
    }
    
    const filtered = posts.filter(post => 
      post.text.toLowerCase().includes(query.toLowerCase()) ||
      post.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
    
    toast({
      title: `Search Results: ${filtered.length} posts found`,
      description: `Search query: "${query}"`,
    });
  };

  const handleScrape = async (url: string, model: string) => {
    setIsLoading(true);
    setActiveModel(model);
    
    try {
      // This would be a real API call in production
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, just use our mock data
      const newPosts = mockPosts;
      
      setPosts([...newPosts, ...posts]);
      setFilteredPosts([...newPosts, ...posts]);
      
      toast({
        title: "Scan Complete",
        description: `Successfully analyzed content using ${model === 'bert' ? 'BERT' : 'Logistic Regression'} model`,
      });
    } catch (error) {
      console.error('Error analyzing content:', error);
      toast({
        title: "Error",
        description: "Failed to analyze content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClassify = async (text: string, model: string) => {
    setIsLoading(true);
    setActiveModel(model);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, create a random classification
      const newPost: RedditPost = {
        id: `manual-${Date.now()}`,
        text,
        username: 'u/user',
        profileImage: '',
        timestamp: 'just now',
        classifications: [
          { 
            type: Math.random() > 0.5 ? 'toxic' : 'neutral', 
            confidence: Math.random() 
          }
        ]
      };
      
      setPosts([newPost, ...posts]);
      setFilteredPosts([newPost, ...filteredPosts]);
      
      toast({
        title: "Classification Complete",
        description: `Content classified as ${newPost.classifications[0].type} using ${model === 'bert' ? 'BERT' : 'Logistic Regression'} model`,
      });
    } catch (error) {
      console.error('Error classifying content:', error);
      toast({
        title: "Error",
        description: "Failed to classify content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 gradient-text">AI Content Safety Classifier</h1>
            <p className="text-muted-foreground text-lg">Probabilistic assessment of harmful digital content</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="bg-secondary px-4 py-2 rounded-lg flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">
                {activeModel === 'bert' ? 'BERT' : 'Logistic Regression'} Active
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <InputPanel 
            onScrape={handleScrape}
            onClassify={handleClassify}
            isLoading={isLoading}
          />

          <FilterPanel 
            onFilter={handleFilter}
            onSearch={handleSearch}
            onScrape={() => handleScrape('https://example.com', activeModel)}
          />
        </div>

        <Card className="bg-card border-border mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-orange-500" />
              <span>Safety Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Content Classification', icon: <PieChart className="h-5 w-5 text-purple-500" /> },
                { title: 'Confidence Metrics', icon: <LineChart className="h-5 w-5 text-purple-500" /> },
                { title: 'Safety Distribution', icon: <BarChart className="h-5 w-5 text-purple-500" /> }
              ].map((chart, i) => (
                <div key={i} className="bg-background rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    {chart.icon}
                    <h3 className="font-medium">{chart.title}</h3>
                  </div>
                  <div className="h-[200px] flex items-center justify-center">
                    {i === 0 && (
                      <div className="relative w-32 h-32 rounded-full bg-secondary">
                        <div className="absolute inset-[15%] rounded-full bg-card"></div>
                        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-500 rounded-tl-full"></div>
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-500 rounded-tr-full"></div>
                        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500 rounded-bl-full"></div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-500 rounded-br-full"></div>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="w-full h-32 relative">
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border"></div>
                        <div className="absolute left-0 bottom-0 top-0 w-[1px] bg-border"></div>
                        <div className="absolute bottom-0 left-2 right-2 h-20 flex items-end">
                          {[35, 55, 45, 60, 48, 40, 30].map((h, i) => (
                            <div key={i} className="flex-1 mx-1">
                              <div 
                                className="w-full bg-gradient-to-t from-orange-500 to-red-500 rounded-t-sm"
                                style={{ height: `${h}%` }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="w-full space-y-3">
                        {[
                          { label: 'Toxic Content', value: 65, color: 'bg-red-500' },
                          { label: 'Threats', value: 40, color: 'bg-orange-500' },
                          { label: 'Obscene', value: 55, color: 'bg-purple-500' },
                          { label: 'Safe Content', value: 75, color: 'bg-blue-500' }
                        ].map((item, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{item.label}</span>
                              <span>{item.value}%</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${item.color} rounded-full`}
                                style={{ width: `${item.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          <Analytics data={analyticsData} />
          <TweetFeed tweets={filteredPosts} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
