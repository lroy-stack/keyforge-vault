
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Download, Trash2, Eye, Calendar } from 'lucide-react';
import { Project } from '@/types';
import { format } from 'date-fns';

interface ProjectListProps {
  projects: Project[];
  onView: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onExport: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onView,
  onDelete,
  onExport
}) => {
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="text-muted-foreground mb-4">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No projects yet</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Create your first project by selecting a template above.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Your Projects</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {project.description || 'No description'}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(project)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Keys
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onExport(project)}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(project.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <Badge variant="secondary" className="text-xs">
                  {project.templateName}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  Created {format(new Date(project.createdAt), 'MMM d, yyyy')}
                </div>
                <Button 
                  onClick={() => onView(project)}
                  className="w-full"
                  size="sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
