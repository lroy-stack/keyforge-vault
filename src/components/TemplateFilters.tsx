
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { TemplateFilters as TTemplateFilters } from '@/types';
import { templateCategories } from '@/data/templates';

interface TemplateFiltersProps {
  filters: TTemplateFilters;
  onFiltersChange: (filters: TTemplateFilters) => void;
  totalCount: number;
  filteredCount: number;
}

export const TemplateFilters: React.FC<TemplateFiltersProps> = ({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount
}) => {
  const updateFilters = (updates: Partial<TTemplateFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearFilters = () => {
    onFiltersChange({ searchTerm: '', category: '', type: 'all' });
  };

  const hasActiveFilters = filters.searchTerm || filters.category || filters.type !== 'all';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            className="pl-10"
          />
        </div>
        
        <Select
          value={filters.category}
          onValueChange={(value) => updateFilters({ category: value })}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {templateCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.type}
          onValueChange={(value) => updateFilters({ type: value as TTemplateFilters['type'] })}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Templates</SelectItem>
            <SelectItem value="predefined">Predefined</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button onClick={clearFilters} variant="outline" size="sm">
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filters:</span>
              {filters.searchTerm && (
                <Badge variant="secondary">
                  Search: {filters.searchTerm}
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary">
                  Category: {filters.category}
                </Badge>
              )}
              {filters.type !== 'all' && (
                <Badge variant="secondary">
                  Type: {filters.type}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalCount} templates
        </div>
      </div>
    </div>
  );
};
