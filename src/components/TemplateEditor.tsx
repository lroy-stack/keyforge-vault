
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { Template, KeyField } from '@/types';
import { templateCategories } from '@/data/templates';
import { CryptoUtils } from '@/utils/crypto';
import { useToast } from '@/hooks/use-toast';

interface TemplateEditorProps {
  template?: Template;
  onSave: (template: Template) => void;
  onCancel: () => void;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({
  template,
  onSave,
  onCancel
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Template>>({
    name: template?.name || '',
    description: template?.description || '',
    category: template?.category || '',
    fields: template?.fields || []
  });

  const [newField, setNewField] = useState<Partial<KeyField>>({
    name: '',
    label: '',
    type: 'text',
    description: '',
    isExternal: false,
    externalUrl: '',
    externalUrlLabel: '',
    length: 32
  });

  const addField = () => {
    if (!newField.name || !newField.label) {
      toast({
        title: "Error",
        description: "Field name and label are required.",
        variant: "destructive",
      });
      return;
    }

    const field: KeyField = {
      id: CryptoUtils.generateUUID(),
      name: newField.name!,
      label: newField.label!,
      type: newField.type!,
      description: newField.description,
      isExternal: newField.isExternal,
      externalUrl: newField.externalUrl,
      externalUrlLabel: newField.externalUrlLabel,
      length: newField.length
    };

    setFormData(prev => ({
      ...prev,
      fields: [...(prev.fields || []), field]
    }));

    setNewField({
      name: '',
      label: '',
      type: 'text',
      description: '',
      isExternal: false,
      externalUrl: '',
      externalUrlLabel: '',
      length: 32
    });
  };

  const removeField = (fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields?.filter(f => f.id !== fieldId) || []
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.fields?.length) {
      toast({
        title: "Error",
        description: "Template name, category, and at least one field are required.",
        variant: "destructive",
      });
      return;
    }

    const templateToSave: Template = {
      id: template?.id || CryptoUtils.generateUUID(),
      name: formData.name,
      description: formData.description || '',
      category: formData.category,
      fields: formData.fields,
      isCustom: true
    };

    onSave(templateToSave);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {template ? 'Edit Template' : 'Create New Template'}
          </h2>
          <p className="text-muted-foreground">
            {template ? 'Modify your custom template' : 'Create a custom template for your keys'}
          </p>
        </div>
        <Button onClick={onCancel} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Information</CardTitle>
          <CardDescription>Basic information about your template</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter template name..."
            />
          </div>
          
          <div>
            <Label htmlFor="template-category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {templateCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="template-description">Description</Label>
            <Textarea
              id="template-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this template is for..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Fields</CardTitle>
          <CardDescription>Define the keys and tokens this template will generate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.fields && formData.fields.length > 0 && (
            <div className="space-y-3">
              {formData.fields.map((field) => (
                <div key={field.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{field.label}</span>
                      <Badge variant={field.isExternal ? 'secondary' : 'default'} className="text-xs">
                        {field.isExternal ? 'EXTERNAL' : field.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>{field.name}</div>
                      {field.description && <div>{field.description}</div>}
                    </div>
                  </div>
                  <Button
                    onClick={() => removeField(field.id)}
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Add New Field</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="field-name">Field Name (ENV var)</Label>
                <Input
                  id="field-name"
                  value={newField.name}
                  onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                  placeholder="e.g., API_KEY"
                />
              </div>
              
              <div>
                <Label htmlFor="field-label">Display Label</Label>
                <Input
                  id="field-label"
                  value={newField.label}
                  onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="e.g., API Key"
                />
              </div>

              <div>
                <Label htmlFor="field-type">Field Type</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value) => setNewField(prev => ({ ...prev, type: value as KeyField['type'] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="password">Password</SelectItem>
                    <SelectItem value="hex">Hex Key</SelectItem>
                    <SelectItem value="uuid">UUID</SelectItem>
                    <SelectItem value="jwt">JWT Token</SelectItem>
                    <SelectItem value="external">External</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(newField.type === 'password' || newField.type === 'hex') && (
                <div>
                  <Label htmlFor="field-length">Length</Label>
                  <Input
                    id="field-length"
                    type="number"
                    value={newField.length}
                    onChange={(e) => setNewField(prev => ({ ...prev, length: parseInt(e.target.value) || 32 }))}
                    min="8"
                    max="128"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <Label htmlFor="field-description">Description</Label>
                <Input
                  id="field-description"
                  value={newField.description}
                  onChange={(e) => setNewField(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of this field..."
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="field-external"
                    checked={newField.isExternal}
                    onCheckedChange={(checked) => setNewField(prev => ({ ...prev, isExternal: checked as boolean }))}
                  />
                  <Label htmlFor="field-external">This is an external key (obtained from official service)</Label>
                </div>
              </div>

              {newField.isExternal && (
                <>
                  <div>
                    <Label htmlFor="external-url">External URL</Label>
                    <Input
                      id="external-url"
                      value={newField.externalUrl}
                      onChange={(e) => setNewField(prev => ({ ...prev, externalUrl: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="external-label">URL Label</Label>
                    <Input
                      id="external-label"
                      value={newField.externalUrlLabel}
                      onChange={(e) => setNewField(prev => ({ ...prev, externalUrlLabel: e.target.value }))}
                      placeholder="e.g., Get from Dashboard"
                    />
                  </div>
                </>
              )}
            </div>

            <Button onClick={addField} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Field
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={!formData.name || !formData.category}>
          <Save className="w-4 h-4 mr-2" />
          Save Template
        </Button>
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
};
