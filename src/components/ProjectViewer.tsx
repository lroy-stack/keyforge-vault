
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Eye, EyeOff, Download, ArrowLeft } from 'lucide-react';
import { Project, GeneratedKeySet } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface ProjectViewerProps {
  project: Project;
  keySet: GeneratedKeySet;
  onBack: () => void;
  onExport: () => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({
  project,
  keySet,
  onBack,
  onExport
}) => {
  const { toast } = useToast();
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const toggleVisibility = (keyName: string) => {
    setVisibleKeys(prev => ({ ...prev, [keyName]: !prev[keyName] }));
  };

  const copyAllAsEnv = () => {
    const envContent = Object.entries(keySet.keys)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    copyToClipboard(envContent, 'Environment variables');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="text-muted-foreground">
            Template: {keySet.templateName} • Generated: {new Date(keySet.generatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={copyAllAsEnv} variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copy All
          </Button>
          <Button onClick={onExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {project.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{project.description}</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Generated Keys</h3>
        {Object.entries(keySet.keys).map(([keyName, keyValue]) => (
          <Card key={keyName}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{keyName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Textarea
                      value={keyValue}
                      readOnly
                      className="min-h-[60px] font-mono text-sm resize-none"
                      style={{
                        WebkitTextSecurity: visibleKeys[keyName] ? 'none' : 'disc'
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button
                      onClick={() => toggleVisibility(keyName)}
                      size="sm"
                      variant="outline"
                      className="px-3"
                    >
                      {visibleKeys[keyName] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(keyValue, keyName)}
                      size="sm"
                      variant="outline"
                      className="px-3"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
