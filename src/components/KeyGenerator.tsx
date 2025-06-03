
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, Key, RefreshCw, Eye, EyeOff, Save } from 'lucide-react';
import { Template, KeyField } from '@/types';
import { CryptoUtils } from '@/utils/crypto';
import { useToast } from '@/hooks/use-toast';

interface KeyGeneratorProps {
  template: Template;
  onSave: (projectName: string, keys: Record<string, string>) => void;
  onBack: () => void;
}

export const KeyGenerator: React.FC<KeyGeneratorProps> = ({ template, onSave, onBack }) => {
  const { toast } = useToast();
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [projectName, setProjectName] = useState('');

  const generateKey = (field: KeyField) => {
    let generatedValue = '';
    
    switch (field.type) {
      case 'password':
        generatedValue = CryptoUtils.generatePassword(field.length || 32);
        break;
      case 'hex':
        generatedValue = CryptoUtils.generateHexKey(field.length || 32);
        break;
      case 'jwt':
        generatedValue = CryptoUtils.generateJWT();
        break;
      case 'uuid':
        generatedValue = CryptoUtils.generateUUID();
        break;
      default:
        generatedValue = CryptoUtils.generatePassword(16, false);
    }

    setKeys(prev => ({ ...prev, [field.id]: generatedValue }));
    
    toast({
      title: "Key Generated",
      description: `${field.label} has been generated successfully.`,
    });
  };

  const generateAllKeys = () => {
    const newKeys: Record<string, string> = {};
    template.fields.forEach(field => {
      if (field.type !== 'text') {
        let generatedValue = '';
        switch (field.type) {
          case 'password':
            generatedValue = CryptoUtils.generatePassword(field.length || 32);
            break;
          case 'hex':
            generatedValue = CryptoUtils.generateHexKey(field.length || 32);
            break;
          case 'jwt':
            generatedValue = CryptoUtils.generateJWT();
            break;
          case 'uuid':
            generatedValue = CryptoUtils.generateUUID();
            break;
        }
        newKeys[field.id] = generatedValue;
      }
    });
    setKeys(prev => ({ ...prev, ...newKeys }));
    
    toast({
      title: "All Keys Generated",
      description: "All keys have been generated successfully.",
    });
  };

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

  const toggleVisibility = (fieldId: string) => {
    setVisibleKeys(prev => ({ ...prev, [fieldId]: !prev[fieldId] }));
  };

  const handleSave = () => {
    if (!projectName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project name.",
        variant: "destructive",
      });
      return;
    }

    const keysToSave = { ...keys };
    template.fields.forEach(field => {
      if (field.type === 'text' && !keysToSave[field.id]) {
        keysToSave[field.id] = '';
      }
    });

    onSave(projectName, keysToSave);
  };

  const exportKeys = () => {
    const envContent = template.fields
      .map(field => `${field.name}=${keys[field.id] || ''}`)
      .join('\n');
    
    const blob = new Blob([envContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName || template.name}.env`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Generate Keys</h2>
          <p className="text-muted-foreground">Template: {template.name}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateAllKeys} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate All
          </Button>
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            Project Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="Enter project name..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={!projectName.trim()}>
                <Save className="w-4 h-4 mr-2" />
                Save Project
              </Button>
              <Button onClick={exportKeys} variant="outline" disabled={Object.keys(keys).length === 0}>
                Export .env
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {template.fields.map((field) => (
          <Card key={field.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{field.label}</CardTitle>
                  <CardDescription>{field.description}</CardDescription>
                </div>
                <Badge variant="secondary">{field.type.toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label>{field.name}</Label>
                <div className="flex gap-2">
                  {field.type === 'text' ? (
                    <Input
                      value={keys[field.id] || ''}
                      onChange={(e) => setKeys(prev => ({ ...prev, [field.id]: e.target.value }))}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      className="flex-1"
                    />
                  ) : (
                    <div className="relative flex-1">
                      <Textarea
                        value={keys[field.id] || ''}
                        onChange={(e) => setKeys(prev => ({ ...prev, [field.id]: e.target.value }))}
                        placeholder="Click 'Generate' to create a secure key"
                        className="min-h-[80px] font-mono text-sm resize-none"
                        type={visibleKeys[field.id] ? 'text' : 'password'}
                        style={{
                          WebkitTextSecurity: visibleKeys[field.id] ? 'none' : 'disc'
                        }}
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    {field.type !== 'text' && (
                      <Button
                        onClick={() => generateKey(field)}
                        size="sm"
                        className="px-3"
                      >
                        <Key className="w-4 h-4" />
                      </Button>
                    )}
                    {keys[field.id] && (
                      <>
                        <Button
                          onClick={() => toggleVisibility(field.id)}
                          size="sm"
                          variant="outline"
                          className="px-3"
                        >
                          {visibleKeys[field.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          onClick={() => copyToClipboard(keys[field.id], field.label)}
                          size="sm"
                          variant="outline"
                          className="px-3"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </>
                    )}
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
