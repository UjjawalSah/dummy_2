
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { ChevronRight, ChevronDown, ZoomIn, DownloadIcon } from 'lucide-react';

interface AnalyticProps {
  data: {
    totalTweets: number;
    totalClassified: number;
    classifications: {
      name: string;
      value: number;
      color: string;
    }[];
    timeline: {
      date: string;
      toxic: number;
      threat: number;
      obscene: number;
      neutral: number;
    }[];
  }
}

export const Analytics: React.FC<AnalyticProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="card-glass">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleExpanded}
      >
        <h2 className="text-lg font-semibold flex items-center">
          Analytics Summary
          {expanded ? (
            <ChevronDown className="h-4 w-4 ml-2" />
          ) : (
            <ChevronRight className="h-4 w-4 ml-2" />
          )}
        </h2>
        <div className="flex gap-2">
          <button className="text-muted-foreground hover:text-foreground button-transition">
            <ZoomIn className="h-4 w-4" />
          </button>
          <button className="text-muted-foreground hover:text-foreground button-transition">
            <DownloadIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 pt-0 space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary p-4 rounded-lg text-center">
              <p className="text-3xl font-semibold">{data.totalTweets}</p>
              <p className="text-sm text-muted-foreground">Total Posts</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg text-center">
              <p className="text-3xl font-semibold">{data.totalClassified}</p>
              <p className="text-sm text-muted-foreground">Classified Posts</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg text-center">
              <p className="text-3xl font-semibold">
                {Math.round((data.totalClassified / data.totalTweets) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Classification Rate</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <h3 className="text-sm font-medium mb-3">Content Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.classifications}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {data.classifications.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <h3 className="text-sm font-medium mb-3">Content Timeline</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.timeline}>
                    <XAxis dataKey="date" tick={{fontSize: 12}} />
                    <YAxis tick={{fontSize: 12}} />
                    <Tooltip />
                    <Bar dataKey="toxic" stackId="a" fill="#FF5A5A" />
                    <Bar dataKey="threat" stackId="a" fill="#FF9A5A" />
                    <Bar dataKey="obscene" stackId="a" fill="#A45AFF" />
                    <Bar dataKey="neutral" stackId="a" fill="#5AC8FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
