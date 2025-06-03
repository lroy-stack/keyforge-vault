
export interface KeyField {
  id: string;
  name: string;
  label: string;
  type: 'password' | 'hex' | 'jwt' | 'uuid' | 'text';
  length?: number;
  description?: string;
  value?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: KeyField[];
  isCustom?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  templateId: string;
  templateName: string;
  encryptedData: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneratedKeySet {
  projectName: string;
  templateName: string;
  keys: Record<string, string>;
  generatedAt: Date;
}
