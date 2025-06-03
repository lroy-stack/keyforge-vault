
import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { TemplateCard } from '@/components/TemplateCard';
import { KeyGenerator } from '@/components/KeyGenerator';
import { ProjectList } from '@/components/ProjectList';
import { ProjectViewer } from '@/components/ProjectViewer';
import { MasterPasswordDialog } from '@/components/MasterPasswordDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Shield, Zap, Lock, Download } from 'lucide-react';
import { predefinedTemplates } from '@/data/templates';
import { Template, Project, GeneratedKeySet } from '@/types';
import { CryptoUtils } from '@/utils/crypto';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'templates' | 'generator' | 'viewer'>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentKeySet, setCurrentKeySet] = useState<GeneratedKeySet | null>(null);
  const [masterPassword, setMasterPassword] = useState<string>('');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordDialogConfig, setPasswordDialogConfig] = useState({
    title: '',
    description: '',
    action: '' as 'save' | 'load' | 'export'
  });
  const [pendingSaveData, setPendingSaveData] = useState<{
    projectName: string;
    keys: Record<string, string>;
  } | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const savedProjects = localStorage.getItem('privateKeyProjects');
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        setProjects(parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt)
        })));
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }
  };

  const saveProjects = (updatedProjects: Project[]) => {
    localStorage.setItem('privateKeyProjects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentView('generator');
  };

  const handleSaveProject = (projectName: string, keys: Record<string, string>) => {
    setPendingSaveData({ projectName, keys });
    setPasswordDialogConfig({
      title: 'Set Master Password',
      description: 'Set a master password to encrypt your keys. This password is required to access your saved projects.',
      action: 'save'
    });
    setShowPasswordDialog(true);
  };

  const handlePasswordConfirm = async (password: string) => {
    setMasterPassword(password);
    setShowPasswordDialog(false);

    try {
      if (passwordDialogConfig.action === 'save' && pendingSaveData && selectedTemplate) {
        const keySet: GeneratedKeySet = {
          projectName: pendingSaveData.projectName,
          templateName: selectedTemplate.name,
          keys: pendingSaveData.keys,
          generatedAt: new Date()
        };

        const encryptedData = await CryptoUtils.encryptData(JSON.stringify(keySet), password);
        
        const newProject: Project = {
          id: CryptoUtils.generateUUID(),
          name: pendingSaveData.projectName,
          templateId: selectedTemplate.id,
          templateName: selectedTemplate.name,
          encryptedData,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const updatedProjects = [...projects, newProject];
        saveProjects(updatedProjects);
        setPendingSaveData(null);
        
        toast({
          title: "Project Saved",
          description: `${pendingSaveData.projectName} has been saved securely.`,
        });

        setCurrentView('projects');
      } else if (passwordDialogConfig.action === 'load' && currentProject) {
        const decryptedData = await CryptoUtils.decryptData(currentProject.encryptedData, password);
        const keySet: GeneratedKeySet = JSON.parse(decryptedData);
        setCurrentKeySet(keySet);
        setCurrentView('viewer');
      } else if (passwordDialogConfig.action === 'export' && currentProject) {
        const decryptedData = await CryptoUtils.decryptData(currentProject.encryptedData, password);
        const keySet: GeneratedKeySet = JSON.parse(decryptedData);
        
        const exportData = {
          project: currentProject,
          keySet: keySet,
          exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentProject.name}-keys.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Project Exported",
          description: `${currentProject.name} has been exported successfully.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid password or corrupted data.",
        variant: "destructive",
      });
    }
  };

  const handleViewProject = (project: Project) => {
    setCurrentProject(project);
    setPasswordDialogConfig({
      title: 'Enter Master Password',
      description: 'Enter your master password to decrypt and view the keys for this project.',
      action: 'load'
    });
    setShowPasswordDialog(true);
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    saveProjects(updatedProjects);
    
    toast({
      title: "Project Deleted",
      description: "Project has been deleted successfully.",
    });
  };

  const handleExportProject = (project: Project) => {
    setCurrentProject(project);
    setPasswordDialogConfig({
      title: 'Enter Master Password',
      description: 'Enter your master password to decrypt and export this project.',
      action: 'export'
    });
    setShowPasswordDialog(true);
  };

  const renderHome = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <Shield className="w-16 h-16 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Private Key Generator Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Generate, manage, and store your development keys securely. 
          All encryption happens locally in your browser for maximum security.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2 hover:border-primary/20 transition-colors">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Zap className="w-10 h-10 text-blue-500" />
            </div>
            <CardTitle>Quick Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Generate secure passwords, JWT tokens, API keys, and more with predefined templates.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/20 transition-colors">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Lock className="w-10 h-10 text-green-500" />
            </div>
            <CardTitle>Local Encryption</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              All keys are encrypted locally with your master password. We never see your data.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/20 transition-colors">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Download className="w-10 h-10 text-purple-500" />
            </div>
            <CardTitle>Easy Export</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Export your keys as .env files or encrypted JSON for easy deployment.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Templates Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular Templates</h2>
          <Button onClick={() => setCurrentView('templates')}>
            View All Templates
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {predefinedTemplates.slice(0, 3).map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={handleTemplateSelect}
            />
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Projects</h2>
            <Button onClick={() => setCurrentView('projects')}>
              View All Projects
            </Button>
          </div>
          <ProjectList
            projects={projects.slice(0, 3)}
            onView={handleViewProject}
            onDelete={handleDeleteProject}
            onExport={handleExportProject}
          />
        </div>
      )}

      {/* Security Notice */}
      <Alert>
        <Shield className="w-4 h-4" />
        <AlertDescription>
          <strong>Security Notice:</strong> All key generation and encryption occurs locally in your browser. 
          Your master password and generated keys never leave your device. 
          Make sure to backup your master password as it cannot be recovered.
        </AlertDescription>
      </Alert>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Templates</h2>
          <p className="text-muted-foreground">Choose a template to generate your keys</p>
        </div>
        <Button onClick={() => setCurrentView('home')}>
          Back to Home
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {predefinedTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleTemplateSelect}
          />
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Projects</h2>
          <p className="text-muted-foreground">Manage your saved key sets</p>
        </div>
        <Button onClick={() => setCurrentView('templates')}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <ProjectList
        projects={projects}
        onView={handleViewProject}
        onDelete={handleDeleteProject}
        onExport={handleExportProject}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation currentView={currentView === 'generator' || currentView === 'viewer' ? 'home' : currentView} onNavigate={setCurrentView} />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' && renderHome()}
        {currentView === 'templates' && renderTemplates()}
        {currentView === 'projects' && renderProjects()}
        {currentView === 'generator' && selectedTemplate && (
          <KeyGenerator
            template={selectedTemplate}
            onSave={handleSaveProject}
            onBack={() => setCurrentView('templates')}
          />
        )}
        {currentView === 'viewer' && currentProject && currentKeySet && (
          <ProjectViewer
            project={currentProject}
            keySet={currentKeySet}
            onBack={() => setCurrentView('projects')}
            onExport={() => handleExportProject(currentProject)}
          />
        )}
      </main>

      <MasterPasswordDialog
        open={showPasswordDialog}
        onClose={() => {
          setShowPasswordDialog(false);
          setPendingSaveData(null);
        }}
        onConfirm={handlePasswordConfirm}
        title={passwordDialogConfig.title}
        description={passwordDialogConfig.description}
        confirmText={passwordDialogConfig.action === 'save' ? 'Save Project' : 'Unlock'}
      />
    </div>
  );
};

export default Index;
