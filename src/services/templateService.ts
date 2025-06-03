
import { Template } from '@/types';
import { CryptoUtils } from '@/utils/crypto';

export class TemplateService {
  private static readonly STORAGE_KEY = 'customTemplates';

  static getCustomTemplates(): Template[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const templates = JSON.parse(stored);
      return templates.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt)
      }));
    } catch (error) {
      console.error('Error loading custom templates:', error);
      return [];
    }
  }

  static saveCustomTemplate(template: Template): void {
    try {
      const templates = this.getCustomTemplates();
      const now = new Date();
      
      const existingIndex = templates.findIndex(t => t.id === template.id);
      
      if (existingIndex >= 0) {
        templates[existingIndex] = { ...template, updatedAt: now };
      } else {
        templates.push({ ...template, createdAt: now, updatedAt: now, isCustom: true });
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(templates));
    } catch (error) {
      console.error('Error saving custom template:', error);
      throw new Error('Failed to save template');
    }
  }

  static deleteCustomTemplate(templateId: string): void {
    try {
      const templates = this.getCustomTemplates();
      const filtered = templates.filter(t => t.id !== templateId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting custom template:', error);
      throw new Error('Failed to delete template');
    }
  }

  static exportTemplate(template: Template): string {
    return JSON.stringify({
      ...template,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    }, null, 2);
  }

  static async exportTemplateEncrypted(template: Template, password: string): Promise<string> {
    const data = this.exportTemplate(template);
    return await CryptoUtils.encryptData(data, password);
  }

  static importTemplate(jsonData: string): Template {
    try {
      const parsed = JSON.parse(jsonData);
      
      // Validate template structure
      if (!parsed.name || !parsed.fields || !Array.isArray(parsed.fields)) {
        throw new Error('Invalid template format');
      }
      
      return {
        ...parsed,
        id: CryptoUtils.generateUUID(),
        isCustom: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      throw new Error('Invalid template file format');
    }
  }

  static async importTemplateEncrypted(encryptedData: string, password: string): Promise<Template> {
    try {
      const decryptedData = await CryptoUtils.decryptData(encryptedData, password);
      return this.importTemplate(decryptedData);
    } catch (error) {
      throw new Error('Invalid password or corrupted template file');
    }
  }

  static cloneTemplate(template: Template): Template {
    return {
      ...template,
      id: CryptoUtils.generateUUID(),
      name: `${template.name} (Copy)`,
      isCustom: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
