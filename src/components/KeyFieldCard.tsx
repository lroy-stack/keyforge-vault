
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Copy, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Shield, 
  AlertTriangle, 
  Info,
  TestTube,
  Building
} from 'lucide-react';
import { KeyField } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { CryptoUtils } from '@/utils/crypto';

interface KeyFieldCardProps {
  field: KeyField;
  value: string;
  onChange: (value: string) => void;
  environment: 'development' | 'production';
}

export const KeyFieldCard: React.FC<KeyFieldCardProps> = ({
  field,
  value,
  onChange,
  environment
}) => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [showTestValue, setShowTestValue] = useState(false);

  const getEnvironmentBadge = () => {
    if (field.environment === 'development') {
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><TestTube className="w-3 h-3 mr-1" />Dev Only</Badge>;
    }
    if (field.environment === 'production') {
      return <Badge variant="destructive" className="bg-red-100 text-red-800"><Building className="w-3 h-3 mr-1" />Prod Only</Badge>;
    }
    return <Badge variant="outline" className="bg-gray-100 text-gray-800">Both</Badge>;
  };

  const getSecurityIcon = () => {
    if (field.isSecret) {
      return <Shield className="w-4 h-4 text-red-500" />;
    }
    return <Info className="w-4 h-4 text-blue-500" />;
  };

  const shouldShowField = () => {
    return field.environment === 'both' || field.environment === environment;
  };

  const generateTestValue = () => {
    if (field.testValue) {
      onChange(field.testValue);
      toast({
        title: "Test value applied",
        description: "This is a sample value for development/testing only.",
      });
    } else {
      // Generate based on type
      let generated = '';
      switch (field.type) {
        case 'password':
          generated = CryptoUtils.generatePassword(field.length || 32);
          break;
        case 'hex':
          generated = CryptoUtils.generateHexKey(field.length || 32);
          break;
        case 'uuid':
          generated = CryptoUtils.generateUUID();
          break;
        case 'jwt':
          generated = CryptoUtils.generateJWT();
          break;
        default:
          generated = `test_${field.name.toLowerCase()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      onChange(generated);
      toast({
        title: "Test value generated",
        description: "This is a generated test value for development only.",
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${field.label} copied to clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  if (!shouldShowField()) {
    return null;
  }

  return (
    <TooltipProvider>
      <Card className={`relative ${field.isSecret ? 'border-red-200' : 'border-gray-200'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg">{field.label}</CardTitle>
                {getEnvironmentBadge()}
                <Tooltip>
                  <TooltipTrigger>
                    {getSecurityIcon()}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{field.isSecret ? 'Confidential - Keep secure' : 'Public - Safe to expose'}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <CardDescription className="text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">{field.name}</code>
                <br />
                {field.description}
              </CardDescription>
            </div>
          </div>
          
          {field.helpText && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">{field.helpText}</p>
              </div>
            </div>
          )}
          
          {field.isSecret && environment === 'production' && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800">
                  This is a sensitive credential for production use. Never expose in frontend code or commit to version control.
                </p>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {field.isExternal && (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => window.open(field.externalUrl, '_blank')}
                variant="outline"
                size="sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {field.externalUrlLabel || 'Get Official Key'}
              </Button>
              
              {field.testValue && environment === 'development' && (
                <Button
                  onClick={generateTestValue}
                  variant="outline"
                  size="sm"
                  className="text-blue-600"
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  Use Test Value
                </Button>
              )}
            </div>
          )}

          <div className="space-y-2">
            <div className="relative">
              {field.isSecret ? (
                <div className="relative">
                  <Textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={environment === 'development' ? 'Paste test key or generate one...' : 'Paste production key...'}
                    className="min-h-[80px] font-mono text-sm pr-20"
                    style={{
                      WebkitTextSecurity: isVisible ? 'none' : 'disc'
                    } as React.CSSProperties}
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      onClick={() => setIsVisible(!isVisible)}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    {value && (
                      <Button
                        onClick={() => copyToClipboard(value)}
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={environment === 'development' ? 'Enter test value...' : 'Enter production value...'}
                    className="font-mono text-sm pr-10"
                  />
                  {value && (
                    <Button
                      onClick={() => copyToClipboard(value)}
                      size="sm"
                      variant="ghost"
                      className="absolute top-1 right-1 h-8 w-8 p-0"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            {!field.isExternal && (
              <Button
                onClick={generateTestValue}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Generate {field.type.toUpperCase()}
              </Button>
            )}
          </div>

          {field.testValue && environment === 'development' && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TestTube className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Test Value Available</span>
              </div>
              <div className="text-xs text-yellow-700 font-mono bg-yellow-100 p-2 rounded">
                {showTestValue ? field.testValue : '••••••••••••••••'}
                <Button
                  onClick={() => setShowTestValue(!showTestValue)}
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-6 text-xs"
                >
                  {showTestValue ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
