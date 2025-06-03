
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Copy, Edit, ExternalLink, MoreVertical, Trash2, Key, Globe, TestTube, Building, Shield, Info } from 'lucide-react';
import { Template } from '@/types';

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  onEdit?: (template: Template) => void;
  onClone?: (template: Template) => void;
  onDelete?: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  onSelect, 
  onEdit, 
  onClone, 
  onDelete 
}) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Database': 'bg-blue-100 text-blue-800',
      'Cloud Storage': 'bg-green-100 text-green-800',
      'Payments': 'bg-yellow-100 text-yellow-800',
      'Authentication': 'bg-purple-100 text-purple-800',
      'Cloud Services': 'bg-indigo-100 text-indigo-800',
      'Communication': 'bg-pink-100 text-pink-800',
      'AI Services': 'bg-orange-100 text-orange-800',
      'Infrastructure': 'bg-teal-100 text-teal-800',
      'Automation': 'bg-cyan-100 text-cyan-800',
      'Custom': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors['Custom'];
  };

  const getFieldStats = () => {
    const devFields = template.fields.filter(f => f.environment === 'development').length;
    const prodFields = template.fields.filter(f => f.environment === 'production').length;
    const bothFields = template.fields.filter(f => f.environment === 'both').length;
    const externalFields = template.fields.filter(f => f.isExternal).length;
    const secretFields = template.fields.filter(f => f.isSecret).length;
    
    return { devFields, prodFields, bothFields, externalFields, secretFields };
  };

  const { devFields, prodFields, bothFields, externalFields, secretFields } = getFieldStats();

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold">{template.name}</CardTitle>
              {template.isCustom && (
                <Badge variant="outline" className="text-xs">
                  Custom
                </Badge>
              )}
              {template.supportsTesting && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  <TestTube className="w-3 h-3 mr-1" />
                  Test Support
                </Badge>
              )}
            </div>
            <CardDescription className="text-sm text-muted-foreground">
              {template.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getCategoryColor(template.category)}>
              {template.category}
            </Badge>
            {template.isCustom && (onEdit || onClone || onDelete) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(template)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  )}
                  {onClone && (
                    <DropdownMenuItem onClick={() => onClone(template)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Clone
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem 
                      onClick={() => onDelete(template)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <TestTube className="w-4 h-4 text-blue-500" />
                <span className="text-muted-foreground">{devFields} dev only</span>
              </div>
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4 text-red-500" />
                <span className="text-muted-foreground">{prodFields} prod only</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-muted-foreground">{bothFields} both</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <ExternalLink className="w-4 h-4 text-orange-500" />
                <span className="text-muted-foreground">{externalFields} external</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-red-500" />
                <span className="text-muted-foreground">{secretFields} secret</span>
              </div>
              <div className="flex items-center gap-1">
                <Key className="w-4 h-4 text-blue-500" />
                <span className="text-muted-foreground">{template.fields.length} total</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => onSelect(template)}
              className="flex-1"
              size="sm"
            >
              Use Template
            </Button>
            {!template.isCustom && onClone && (
              <Button 
                onClick={() => onClone(template)}
                variant="outline"
                size="sm"
                className="px-3"
              >
                <Copy className="w-4 h-4" />
              </Button>
            )}
            {template.documentationUrl && (
              <Button 
                onClick={() => window.open(template.documentationUrl, '_blank')}
                variant="outline"
                size="sm"
                className="px-3"
              >
                <Info className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
