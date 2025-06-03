
import { Template } from '../types';

export const predefinedTemplates: Template[] = [
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Complete Supabase project configuration',
    category: 'Database',
    fields: [
      {
        id: 'supabase_url',
        name: 'SUPABASE_URL',
        label: 'Project URL',
        type: 'external',
        description: 'Your Supabase project URL from the dashboard',
        isExternal: true,
        externalUrl: 'https://app.supabase.com/projects',
        externalUrlLabel: 'Get from Supabase Dashboard'
      },
      {
        id: 'supabase_anon_key',
        name: 'SUPABASE_ANON_KEY',
        label: 'Anonymous Key',
        type: 'external',
        description: 'Public anonymous key for client-side operations',
        isExternal: true,
        externalUrl: 'https://app.supabase.com/projects',
        externalUrlLabel: 'Get from Supabase Dashboard'
      },
      {
        id: 'supabase_service_role',
        name: 'SUPABASE_SERVICE_ROLE_KEY',
        label: 'Service Role Key',
        type: 'external',
        description: 'Private service role key for server operations',
        isExternal: true,
        externalUrl: 'https://app.supabase.com/projects',
        externalUrlLabel: 'Get from Supabase Dashboard'
      },
      {
        id: 'jwt_secret',
        name: 'JWT_SECRET',
        label: 'JWT Secret',
        type: 'hex',
        length: 64,
        description: 'Secret key for signing JWT tokens'
      },
      {
        id: 'postgres_password',
        name: 'POSTGRES_PASSWORD',
        label: 'Database Password',
        type: 'password',
        length: 24,
        description: 'PostgreSQL database password'
      },
      {
        id: 'dashboard_username',
        name: 'DASHBOARD_USERNAME',
        label: 'Dashboard Username',
        type: 'text',
        description: 'Dashboard access username'
      },
      {
        id: 'dashboard_password',
        name: 'DASHBOARD_PASSWORD',
        label: 'Dashboard Password',
        type: 'password',
        length: 20,
        description: 'Dashboard access password'
      }
    ]
  },
  {
    id: 'docker',
    name: 'Docker',
    description: 'Docker environment configuration',
    category: 'Infrastructure',
    fields: [
      {
        id: 'postgres_db',
        name: 'POSTGRES_DB',
        label: 'Database Name',
        type: 'text',
        description: 'PostgreSQL database name'
      },
      {
        id: 'postgres_user',
        name: 'POSTGRES_USER',
        label: 'Database User',
        type: 'text',
        description: 'PostgreSQL username'
      },
      {
        id: 'postgres_password',
        name: 'POSTGRES_PASSWORD',
        label: 'Database Password',
        type: 'password',
        length: 32,
        description: 'PostgreSQL password'
      },
      {
        id: 'redis_password',
        name: 'REDIS_PASSWORD',
        label: 'Redis Password',
        type: 'password',
        length: 24,
        description: 'Redis server password'
      }
    ]
  },
  {
    id: 'jwt',
    name: 'JWT Authentication',
    description: 'JWT token configuration',
    category: 'Authentication',
    fields: [
      {
        id: 'jwt_secret',
        name: 'JWT_SECRET',
        label: 'JWT Secret',
        type: 'hex',
        length: 64,
        description: 'Secret key for signing JWT tokens'
      },
      {
        id: 'jwt_refresh_secret',
        name: 'JWT_REFRESH_SECRET',
        label: 'JWT Refresh Secret',
        type: 'hex',
        length: 64,
        description: 'Secret key for refresh tokens'
      },
      {
        id: 'access_token_sample',
        name: 'ACCESS_TOKEN_SAMPLE',
        label: 'Sample Access Token',
        type: 'jwt',
        description: 'Sample JWT access token'
      }
    ]
  },
  {
    id: 'n8n',
    name: 'n8n Automation',
    description: 'n8n workflow automation platform',
    category: 'Automation',
    fields: [
      {
        id: 'n8n_encryption_key',
        name: 'N8N_ENCRYPTION_KEY',
        label: 'Encryption Key',
        type: 'hex',
        length: 32,
        description: 'Key for encrypting n8n credentials'
      },
      {
        id: 'webhook_url',
        name: 'WEBHOOK_URL',
        label: 'Webhook URL',
        type: 'text',
        description: 'n8n webhook endpoint URL'
      },
      {
        id: 'api_key',
        name: 'N8N_API_KEY',
        label: 'API Key',
        type: 'external',
        description: 'n8n API access key from your instance settings',
        isExternal: true,
        externalUrl: 'https://docs.n8n.io/api/authentication/',
        externalUrlLabel: 'See n8n API Documentation'
      }
    ]
  },
  {
    id: 'smtp',
    name: 'SMTP Email',
    description: 'Email server configuration',
    category: 'Communication',
    fields: [
      {
        id: 'smtp_host',
        name: 'SMTP_HOST',
        label: 'SMTP Host',
        type: 'text',
        description: 'SMTP server hostname'
      },
      {
        id: 'smtp_user',
        name: 'SMTP_USER',
        label: 'SMTP Username',
        type: 'text',
        description: 'SMTP authentication username'
      },
      {
        id: 'smtp_password',
        name: 'SMTP_PASSWORD',
        label: 'SMTP Password',
        type: 'password',
        length: 20,
        description: 'SMTP authentication password'
      },
      {
        id: 'sendgrid_api_key',
        name: 'SENDGRID_API_KEY',
        label: 'SendGrid API Key',
        type: 'external',
        description: 'SendGrid API key from your account dashboard',
        isExternal: true,
        externalUrl: 'https://app.sendgrid.com/settings/api_keys',
        externalUrlLabel: 'Get from SendGrid Dashboard'
      }
    ]
  }
];
