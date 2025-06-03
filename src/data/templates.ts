
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
    id: 'firebase',
    name: 'Firebase',
    description: 'Google Firebase project configuration',
    category: 'Database',
    fields: [
      {
        id: 'firebase_api_key',
        name: 'FIREBASE_API_KEY',
        label: 'Firebase API Key',
        type: 'external',
        description: 'Web API key from Firebase project settings',
        isExternal: true,
        externalUrl: 'https://console.firebase.google.com/',
        externalUrlLabel: 'Get from Firebase Console'
      },
      {
        id: 'firebase_auth_domain',
        name: 'FIREBASE_AUTH_DOMAIN',
        label: 'Auth Domain',
        type: 'external',
        description: 'Authentication domain for your Firebase project',
        isExternal: true,
        externalUrl: 'https://console.firebase.google.com/',
        externalUrlLabel: 'Get from Firebase Console'
      },
      {
        id: 'firebase_project_id',
        name: 'FIREBASE_PROJECT_ID',
        label: 'Project ID',
        type: 'external',
        description: 'Unique identifier for your Firebase project',
        isExternal: true,
        externalUrl: 'https://console.firebase.google.com/',
        externalUrlLabel: 'Get from Firebase Console'
      },
      {
        id: 'firebase_messaging_sender_id',
        name: 'FIREBASE_MESSAGING_SENDER_ID',
        label: 'Messaging Sender ID',
        type: 'external',
        description: 'Sender ID for Firebase Cloud Messaging',
        isExternal: true,
        externalUrl: 'https://console.firebase.google.com/',
        externalUrlLabel: 'Get from Firebase Console'
      }
    ]
  },
  {
    id: 'aws-s3',
    name: 'AWS S3',
    description: 'Amazon S3 bucket configuration',
    category: 'Cloud Storage',
    fields: [
      {
        id: 'aws_access_key_id',
        name: 'AWS_ACCESS_KEY_ID',
        label: 'Access Key ID',
        type: 'external',
        description: 'IAM user access key for AWS services',
        isExternal: true,
        externalUrl: 'https://console.aws.amazon.com/iam/home#/security_credentials',
        externalUrlLabel: 'Get from AWS Console'
      },
      {
        id: 'aws_secret_access_key',
        name: 'AWS_SECRET_ACCESS_KEY',
        label: 'Secret Access Key',
        type: 'external',
        description: 'Secret key paired with access key ID',
        isExternal: true,
        externalUrl: 'https://console.aws.amazon.com/iam/home#/security_credentials',
        externalUrlLabel: 'Get from AWS Console'
      },
      {
        id: 'aws_region',
        name: 'AWS_REGION',
        label: 'AWS Region',
        type: 'text',
        description: 'AWS region for your S3 bucket (e.g., us-east-1)'
      },
      {
        id: 's3_bucket_name',
        name: 'S3_BUCKET_NAME',
        label: 'S3 Bucket Name',
        type: 'text',
        description: 'Name of your S3 bucket'
      }
    ]
  },
  {
    id: 'stripe',
    name: 'Stripe Payments',
    description: 'Stripe payment processing configuration',
    category: 'Payments',
    fields: [
      {
        id: 'stripe_public_key',
        name: 'STRIPE_PUBLIC_KEY',
        label: 'Publishable Key',
        type: 'external',
        description: 'Stripe publishable key for client-side operations',
        isExternal: true,
        externalUrl: 'https://dashboard.stripe.com/apikeys',
        externalUrlLabel: 'Get from Stripe Dashboard'
      },
      {
        id: 'stripe_secret_key',
        name: 'STRIPE_SECRET_KEY',
        label: 'Secret Key',
        type: 'external',
        description: 'Stripe secret key for server-side operations',
        isExternal: true,
        externalUrl: 'https://dashboard.stripe.com/apikeys',
        externalUrlLabel: 'Get from Stripe Dashboard'
      },
      {
        id: 'stripe_webhook_secret',
        name: 'STRIPE_WEBHOOK_SECRET',
        label: 'Webhook Secret',
        type: 'hex',
        length: 32,
        description: 'Secret for verifying Stripe webhook signatures'
      }
    ]
  },
  {
    id: 'github-oauth',
    name: 'GitHub OAuth',
    description: 'GitHub OAuth application configuration',
    category: 'Authentication',
    fields: [
      {
        id: 'github_client_id',
        name: 'GITHUB_CLIENT_ID',
        label: 'Client ID',
        type: 'external',
        description: 'OAuth app client ID from GitHub',
        isExternal: true,
        externalUrl: 'https://github.com/settings/developers',
        externalUrlLabel: 'Get from GitHub Developer Settings'
      },
      {
        id: 'github_client_secret',
        name: 'GITHUB_CLIENT_SECRET',
        label: 'Client Secret',
        type: 'external',
        description: 'OAuth app client secret from GitHub',
        isExternal: true,
        externalUrl: 'https://github.com/settings/developers',
        externalUrlLabel: 'Get from GitHub Developer Settings'
      },
      {
        id: 'github_webhook_secret',
        name: 'GITHUB_WEBHOOK_SECRET',
        label: 'Webhook Secret',
        type: 'hex',
        length: 32,
        description: 'Secret for GitHub webhook verification'
      }
    ]
  },
  {
    id: 'mongodb',
    name: 'MongoDB Atlas',
    description: 'MongoDB Atlas database configuration',
    category: 'Database',
    fields: [
      {
        id: 'mongodb_uri',
        name: 'MONGODB_URI',
        label: 'Connection URI',
        type: 'external',
        description: 'MongoDB connection string from Atlas dashboard',
        isExternal: true,
        externalUrl: 'https://cloud.mongodb.com/',
        externalUrlLabel: 'Get from MongoDB Atlas'
      },
      {
        id: 'mongodb_user',
        name: 'MONGODB_USER',
        label: 'Database User',
        type: 'text',
        description: 'MongoDB database username'
      },
      {
        id: 'mongodb_password',
        name: 'MONGODB_PASSWORD',
        label: 'Database Password',
        type: 'password',
        length: 24,
        description: 'MongoDB database password'
      }
    ]
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud Platform',
    description: 'Google Cloud Platform services configuration',
    category: 'Cloud Services',
    fields: [
      {
        id: 'google_client_id',
        name: 'GOOGLE_CLIENT_ID',
        label: 'OAuth Client ID',
        type: 'external',
        description: 'OAuth 2.0 client ID from Google Cloud Console',
        isExternal: true,
        externalUrl: 'https://console.cloud.google.com/apis/credentials',
        externalUrlLabel: 'Get from Google Cloud Console'
      },
      {
        id: 'google_client_secret',
        name: 'GOOGLE_CLIENT_SECRET',
        label: 'OAuth Client Secret',
        type: 'external',
        description: 'OAuth 2.0 client secret from Google Cloud Console',
        isExternal: true,
        externalUrl: 'https://console.cloud.google.com/apis/credentials',
        externalUrlLabel: 'Get from Google Cloud Console'
      },
      {
        id: 'google_api_key',
        name: 'GOOGLE_API_KEY',
        label: 'API Key',
        type: 'external',
        description: 'Google Cloud API key for service access',
        isExternal: true,
        externalUrl: 'https://console.cloud.google.com/apis/credentials',
        externalUrlLabel: 'Get from Google Cloud Console'
      },
      {
        id: 'google_project_id',
        name: 'GOOGLE_PROJECT_ID',
        label: 'Project ID',
        type: 'external',
        description: 'Google Cloud project identifier',
        isExternal: true,
        externalUrl: 'https://console.cloud.google.com/',
        externalUrlLabel: 'Get from Google Cloud Console'
      }
    ]
  },
  {
    id: 'auth0',
    name: 'Auth0',
    description: 'Auth0 authentication service configuration',
    category: 'Authentication',
    fields: [
      {
        id: 'auth0_domain',
        name: 'AUTH0_DOMAIN',
        label: 'Auth0 Domain',
        type: 'external',
        description: 'Your Auth0 tenant domain',
        isExternal: true,
        externalUrl: 'https://manage.auth0.com/',
        externalUrlLabel: 'Get from Auth0 Dashboard'
      },
      {
        id: 'auth0_client_id',
        name: 'AUTH0_CLIENT_ID',
        label: 'Client ID',
        type: 'external',
        description: 'Auth0 application client ID',
        isExternal: true,
        externalUrl: 'https://manage.auth0.com/',
        externalUrlLabel: 'Get from Auth0 Dashboard'
      },
      {
        id: 'auth0_client_secret',
        name: 'AUTH0_CLIENT_SECRET',
        label: 'Client Secret',
        type: 'external',
        description: 'Auth0 application client secret',
        isExternal: true,
        externalUrl: 'https://manage.auth0.com/',
        externalUrlLabel: 'Get from Auth0 Dashboard'
      }
    ]
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'SendGrid email service configuration',
    category: 'Communication',
    fields: [
      {
        id: 'sendgrid_api_key',
        name: 'SENDGRID_API_KEY',
        label: 'API Key',
        type: 'external',
        description: 'SendGrid API key for email services',
        isExternal: true,
        externalUrl: 'https://app.sendgrid.com/settings/api_keys',
        externalUrlLabel: 'Get from SendGrid Dashboard'
      },
      {
        id: 'sendgrid_sender_email',
        name: 'SENDGRID_SENDER_EMAIL',
        label: 'Sender Email',
        type: 'text',
        description: 'Verified sender email address'
      }
    ]
  },
  {
    id: 'redis',
    name: 'Redis',
    description: 'Redis cache database configuration',
    category: 'Database',
    fields: [
      {
        id: 'redis_host',
        name: 'REDIS_HOST',
        label: 'Redis Host',
        type: 'text',
        description: 'Redis server hostname or IP address'
      },
      {
        id: 'redis_port',
        name: 'REDIS_PORT',
        label: 'Redis Port',
        type: 'text',
        description: 'Redis server port (default: 6379)'
      },
      {
        id: 'redis_password',
        name: 'REDIS_PASSWORD',
        label: 'Redis Password',
        type: 'password',
        length: 32,
        description: 'Redis server authentication password'
      }
    ]
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'OpenAI API configuration',
    category: 'AI Services',
    fields: [
      {
        id: 'openai_api_key',
        name: 'OPENAI_API_KEY',
        label: 'API Key',
        type: 'external',
        description: 'OpenAI API key for accessing AI services',
        isExternal: true,
        externalUrl: 'https://platform.openai.com/api-keys',
        externalUrlLabel: 'Get from OpenAI Platform'
      },
      {
        id: 'organization_id',
        name: 'ORGANIZATION_ID',
        label: 'Organization ID',
        type: 'external',
        description: 'OpenAI organization identifier (optional)',
        isExternal: true,
        externalUrl: 'https://platform.openai.com/settings/organization',
        externalUrlLabel: 'Get from OpenAI Platform'
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

export const templateCategories = [
  'Database',
  'Cloud Storage',
  'Payments',
  'Authentication',
  'Cloud Services',
  'Communication',
  'AI Services',
  'Infrastructure',
  'Automation'
];
