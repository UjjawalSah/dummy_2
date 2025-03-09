
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageCircle, Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface InputPanelProps {
  onScrape: (url: string, model: string) => void;
  onClassify: (text: string, model: string) => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ 
  onScrape,
  onClassify,
  isLoading
}) => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState('url');
  const [selectedModel, setSelectedModel] = useState('bert');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'url' && url.trim()) {
      onScrape(url.trim(), selectedModel);
    } else if (activeTab === 'text' && text.trim()) {
      onClassify(text.trim(), selectedModel);
    }
  };

  return (
    <Card className="card-glass overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-orange-500" />
          <span>Content Safety Analysis</span>
        </CardTitle>
        <CardDescription>
          Analyze content with our AI classification models to detect harmful indicators
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="model-select" className="text-sm font-medium mb-1.5 block">Classification Model</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger id="model-select" className="w-full">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bert">Fine-tuned BERT</SelectItem>
              <SelectItem value="logistic">Logistic Regression</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1.5">
            {selectedModel === 'bert' ? 
              'BERT offers higher accuracy for complex content (slower)' : 
              'Logistic regression is faster for simpler classification tasks'}
          </p>
        </div>
        
        <Tabs defaultValue="url" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="url">URL Analysis</TabsTrigger>
            <TabsTrigger value="text">Text Classification</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="url" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="Enter content URL to analyze"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-9"
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={!url.trim() || isLoading}
                  className="min-w-[120px] bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Content'
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter a content URL (e.g., social media post, article, or forum thread)
              </p>
            </TabsContent>
            
            <TabsContent value="text" className="space-y-4">
              <Textarea
                placeholder="Enter text for AI safety assessment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[100px]"
                disabled={isLoading}
              />
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={!text.trim() || isLoading}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Processing...
                    </>
                  ) : (
                    'Run Safety Analysis'
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Type or paste text to analyze its content for harmful indicators with probabilistic assessment
              </p>
            </TabsContent>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};
