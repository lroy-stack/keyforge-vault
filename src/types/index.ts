
export interface KeyField {
  id: string;
  name: string;
  label: string;
  type: 'password' | 'hex' | 'jwt' | 'uuid' | 'text' | 'external';
  length?: number;
  description?: string;
  value?: string;
  isExternal?: boolean;
  externalUrl?: string;
  externalUrlLabel?: string;
  environment?: 'development' | 'production' | 'both';
  isSecret?: boolean;
  testValue?: string;
  validationPattern?: string;
  helpText?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: KeyField[];
  isCustom?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  documentationUrl?: string;
  supportsTesting?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  templateId: string;
  templateName: string;
  encryptedData: string;
  environment: 'development' | 'production';
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneratedKeySet {
  projectName: string;
  templateName: string;
  keys: Record<string, string>;
  environment: 'development' | 'production';
  generatedAt: Date;
}

export interface TemplateFilters {
  searchTerm: string;
  category: string;
  type: 'all' | 'predefined' | 'custom';
  environment: 'all' | 'development' | 'production';
}
