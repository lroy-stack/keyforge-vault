
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Template } from '@/types';

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Database': 'bg-blue-100 text-blue-800',
      'Infrastructure': 'bg-green-100 text-green-800',
      'Authentication': 'bg-purple-100 text-purple-800',
      'Automation': 'bg-orange-100 text-orange-800',
      'Communication': 'bg-pink-100 text-pink-800',
      'Custom': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors['Custom'];
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">{template.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {template.description}
            </CardDescription>
          </div>
          <Badge className={getCategoryColor(template.category)}>
            {template.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="text-xs text-muted-foreground">
            {template.fields.length} field{template.fields.length !== 1 ? 's' : ''}
          </div>
          <Button 
            onClick={() => onSelect(template)}
            className="w-full"
            size="sm"
          >
            Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
