
import React, { useState } from 'react';
import { Search, Calendar, RefreshCw, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface FilterPanelProps {
  onFilter: (filters: any) => void;
  onSearch: (query: string) => void;
  onScrape: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter, onSearch, onScrape }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    toxic: true,
    threat: true,
    obscene: true,
    neutral: true,
  });
  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  });
  const { toast } = useToast();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleFilterChange = (key: keyof typeof filters) => {
    const newFilters = { ...filters, [key]: !filters[key] };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  };

  const handleScrape = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Content Analyzed Successfully',
        description: '15 new posts have been analyzed and classified.',
      });
    }, 2000);
    onScrape();
  };

  return (
    <div className="card-glass p-4 mb-6 flex flex-col md:flex-row gap-4">
      <form className="flex-1" onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search content by keyword or source..."
            className="pl-10 border-none bg-secondary"
            value={query}
            onChange={handleSearchChange}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              onClick={() => setQuery('')}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4 mr-1" />
              Classification Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Content Categories</h4>
              <div className="space-y-2">
                {Object.entries(filters).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <Checkbox
                      id={`filter-${key}`}
                      checked={value}
                      onCheckedChange={() => handleFilterChange(key as keyof typeof filters)}
                    />
                    <Label
                      htmlFor={`filter-${key}`}
                      className="ml-2 capitalize cursor-pointer"
                    >
                      {key === 'neutral' ? 'Safe Content' : key}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4 mr-1" />
              Date Range
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Select Date Range</h4>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="from" className="text-xs">From</Label>
                  <Input
                    id="from"
                    name="from"
                    type="date"
                    className="col-span-2 h-8"
                    value={dateRange.from}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="to" className="text-xs">To</Label>
                  <Input
                    id="to"
                    name="to"
                    type="date"
                    className="col-span-2 h-8"
                    value={dateRange.to}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button 
          variant="default" 
          size="sm" 
          onClick={handleScrape}
          disabled={loading}
          className="bg-primary text-white flex items-center gap-1"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-1" />
          )}
          Analyze Content
        </Button>
      </div>
    </div>
  );
};
