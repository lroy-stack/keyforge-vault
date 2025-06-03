import { Template } from '../types';

export const predefinedTemplates: Template[] = [
  {
    id: 'stripe',
    name: 'Stripe Payments',
    description: 'Complete Stripe payment processing configuration for development and production',
    category: 'Payments',
    documentationUrl: 'https://stripe.com/docs/keys',
    supportsTesting: true,
    fields: [
      {
        id: 'stripe_test_public_key',
        name: 'STRIPE_TEST_PUBLIC_KEY',
        label: 'Test Publishable Key',
        type: 'external',
        environment: 'development',
        description: 'Stripe test publishable key for development (starts with pk_test_)',
        isExternal: true,
        externalUrl: 'https://dashboard.stripe.com/test/apikeys',
        externalUrlLabel: 'Get from Stripe Test Dashboard',
        testValue: 'pk_test_51234567890abcdef...',
        helpText: 'Safe to use in frontend code. Used for test payments only.',
        isSecret: false
      },
      {
        id: 'stripe_test_secret_key',
        name: 'STRIPE_TEST_SECRET_KEY',
        label: 'Test Secret Key',
        type: 'external',
        environment: 'development',
        description: 'Stripe test secret key for server-side operations (starts with sk_test_)',
        isExternal: true,
        externalUrl: 'https://dashboard.stripe.com/test/apikeys',
        externalUrlLabel: 'Get from Stripe Test Dashboard',
        testValue: 'sk_test_51234567890abcdef...',
        helpText: 'CONFIDENTIAL - Never expose in frontend. For test transactions only.',
        isSecret: true
      },
      {
        id: 'stripe_live_public_key',
        name: 'STRIPE_LIVE_PUBLIC_KEY',
        label: 'Live Publishable Key',
        type: 'external',
        environment: 'production',
        description: 'Stripe live publishable key for production (starts with pk_live_)',
        isExternal: true,
        externalUrl: 'https://dashboard.stripe.com/apikeys',
        externalUrlLabel: 'Get from Stripe Live Dashboard',
        helpText: 'PRODUCTION ONLY - Processes real payments. Safe for frontend.',
        isSecret: false
      },
      {
        id: 'stripe_live_secret_key',
        name: 'STRIPE_LIVE_SECRET_KEY',
        label: 'Live Secret Key',
        type: 'external',
        environment: 'production',
        description: 'Stripe live secret key for production server operations (starts with sk_live_)',
        isExternal: true,
        externalUrl: 'https://dashboard.stripe.com/apikeys',
        externalUrlLabel: 'Get from Stripe Live Dashboard',
        helpText: 'HIGHLY CONFIDENTIAL - Processes real money. Never expose in frontend.',
        isSecret: true
      },
      {
        id: 'stripe_webhook_secret',
        name: 'STRIPE_WEBHOOK_SECRET',
        label: 'Webhook Secret',
        type: 'external',
        environment: 'both',
        description: 'Secret for verifying Stripe webhook signatures',
        isExternal: true,
        externalUrl: 'https://dashboard.stripe.com/webhooks',
        externalUrlLabel: 'Get from Stripe Webhooks',
        helpText: 'Required for webhook security. Different for test/live endpoints.',
        isSecret: true
      }
    ]
  },
  {
    id: 'auth0',
    name: 'Auth0',
    description: 'Auth0 authentication service configuration for all environments',
    category: 'Authentication',
    documentationUrl: 'https://auth0.com/docs/get-started',
    supportsTesting: true,
    fields: [
      {
        id: 'auth0_domain',
        name: 'AUTH0_DOMAIN',
        label: 'Auth0 Domain',
        type: 'external',
        environment: 'both',
        description: 'Your Auth0 tenant domain (e.g., your-tenant.auth0.com)',
        isExternal: true,
        externalUrl: 'https://manage.auth0.com/',
        externalUrlLabel: 'Get from Auth0 Dashboard',
        testValue: 'dev-tenant.auth0.com',
        helpText: 'Same domain can be used for dev/prod apps within the tenant.',
        isSecret: false
      },
      {
        id: 'auth0_client_id',
        name: 'AUTH0_CLIENT_ID',
        label: 'Client ID',
        type: 'external',
        environment: 'both',
        description: 'Auth0 application client ID',
        isExternal: true,
        externalUrl: 'https://manage.auth0.com/',
        externalUrlLabel: 'Get from Auth0 Applications',
        testValue: 'abcdef1234567890',
        helpText: 'Public identifier, safe to expose. Create separate apps for dev/prod.',
        isSecret: false
      },
      {
        id: 'auth0_client_secret',
        name: 'AUTH0_CLIENT_SECRET',
        label: 'Client Secret',
        type: 'external',
        environment: 'both',
        description: 'Auth0 application client secret',
        isExternal: true,
        externalUrl: 'https://manage.auth0.com/',
        externalUrlLabel: 'Get from Auth0 Applications',
        helpText: 'CONFIDENTIAL - For server-side auth flows only. Never expose publicly.',
        isSecret: true
      }
    ]
  },
  {
    id: 'firebase',
    name: 'Firebase',
    description: 'Google Firebase project configuration with security rules',
    category: 'Database',
    documentationUrl: 'https://firebase.google.com/docs/web/setup',
    supportsTesting: true,
    fields: [
      {
        id: 'firebase_api_key',
        name: 'FIREBASE_API_KEY',
        label: 'Web API Key',
        type: 'external',
        environment: 'both',
        description: 'Firebase Web API key for client-side SDK',
        isExternal: true,
        externalUrl: 'https://console.firebase.google.com/',
        externalUrlLabel: 'Get from Firebase Console → Project Settings',
        testValue: 'AIzaSyD-example-key-1234567890',
        helpText: 'Safe for frontend. Security controlled by Firebase rules, not this key.',
        isSecret: false
      },
      {
        id: 'firebase_auth_domain',
        name: 'FIREBASE_AUTH_DOMAIN',
        label: 'Auth Domain',
        type: 'external',
        environment: 'both',
        description: 'Firebase authentication domain',
        isExternal: true,
        externalUrl: 'https://console.firebase.google.com/',
        externalUrlLabel: 'Get from Firebase Console → Project Settings',
        testValue: 'your-project-id.firebaseapp.com',
        helpText: 'Public domain for Firebase Auth. Same for all environments.',
        isSecret: false
      },
      {
        id: 'firebase_project_id',
        name: 'FIREBASE_PROJECT_ID',
        label: 'Project ID',
        type: 'external',
        environment: 'both',
        description: 'Firebase project identifier',
        isExternal: true,
        externalUrl: 'https://console.firebase.google.com/',
        externalUrlLabel: 'Get from Firebase Console → Project Settings',
        testValue: 'your-project-id',
        helpText: 'Public identifier. Use separate projects for dev/staging/prod.',
        isSecret: false
      },
      {
        id: 'firebase_service_account',
        name: 'FIREBASE_SERVICE_ACCOUNT',
        label: 'Service Account Key',
        type: 'external',
        environment: 'production',
        description: 'Firebase Admin SDK service account JSON key',
        isExternal: true,
        externalUrl: 'https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk',
        externalUrlLabel: 'Generate from Firebase Console → Service Accounts',
        helpText: 'HIGHLY CONFIDENTIAL - Admin privileges. Server-side only.',
        isSecret: true
      }
    ]
  },
  {
    id: 'github-oauth',
    name: 'GitHub OAuth',
    description: 'GitHub OAuth application configuration with proper scopes',
    category: 'Authentication',
    documentationUrl: 'https://docs.github.com/en/developers/apps/building-oauth-apps',
    supportsTesting: true,
    fields: [
      {
        id: 'github_client_id',
        name: 'GITHUB_CLIENT_ID',
        label: 'Client ID',
        type: 'external',
        environment: 'both',
        description: 'OAuth app client ID from GitHub',
        isExternal: true,
        externalUrl: 'https://github.com/settings/developers',
        externalUrlLabel: 'Create OAuth App in GitHub Developer Settings',
        testValue: 'Iv1.1234567890abcdef',
        helpText: 'Public identifier. Create separate apps for dev/prod with different callback URLs.',
        isSecret: false
      },
      {
        id: 'github_client_secret',
        name: 'GITHUB_CLIENT_SECRET',
        label: 'Client Secret',
        type: 'external',
        environment: 'both',
        description: 'OAuth app client secret from GitHub',
        isExternal: true,
        externalUrl: 'https://github.com/settings/developers',
        externalUrlLabel: 'Get from GitHub OAuth App Settings',
        helpText: 'CONFIDENTIAL - GitHub scans for exposed secrets. Server-side only.',
        isSecret: true
      },
      {
        id: 'github_personal_token',
        name: 'GITHUB_PERSONAL_TOKEN',
        label: 'Personal Access Token',
        type: 'external',
        environment: 'both',
        description: 'Fine-grained personal access token for API access',
        isExternal: true,
        externalUrl: 'https://github.com/settings/personal-access-tokens/new',
        externalUrlLabel: 'Generate Fine-grained Token',
        helpText: 'CONFIDENTIAL - Use minimal scopes. Expires automatically.',
        isSecret: true
      }
    ]
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Complete Supabase project configuration for all environments',
    category: 'Database',
    documentationUrl: 'https://supabase.com/docs/guides/api/api-keys',
    supportsTesting: true,
    fields: [
      {
        id: 'supabase_url',
        name: 'SUPABASE_URL',
        label: 'Project URL',
        type: 'external',
        environment: 'both',
        description: 'Your Supabase project URL',
        isExternal: true,
        externalUrl: 'https://app.supabase.com/projects',
        externalUrlLabel: 'Get from Supabase Dashboard → Settings → API',
        testValue: 'https://abcdefghijklmnop.supabase.co',
        helpText: 'Public URL. Use separate projects for dev/staging/prod.',
        isSecret: false
      },
      {
        id: 'supabase_anon_key',
        name: 'SUPABASE_ANON_KEY',
        label: 'Anonymous Public Key',
        type: 'external',
        environment: 'both',
        description: 'Public anonymous key for client-side operations',
        isExternal: true,
        externalUrl: 'https://app.supabase.com/projects',
        externalUrlLabel: 'Get from Supabase Dashboard → Settings → API',
        testValue: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        helpText: 'Safe for frontend. Security controlled by RLS policies.',
        isSecret: false
      },
      {
        id: 'supabase_service_role',
        name: 'SUPABASE_SERVICE_ROLE_KEY',
        label: 'Service Role Secret Key',
        type: 'external',
        environment: 'production',
        description: 'Private service role key for server operations',
        isExternal: true,
        externalUrl: 'https://app.supabase.com/projects',
        externalUrlLabel: 'Get from Supabase Dashboard → Settings → API',
        helpText: 'HIGHLY CONFIDENTIAL - Bypasses RLS. Server-side only.',
        isSecret: true
      }
    ]
  },
  {
    id: 'aws-s3',
    name: 'AWS S3',
    description: 'Amazon S3 bucket configuration with IAM best practices',
    category: 'Cloud Storage',
    documentationUrl: 'https://docs.aws.amazon.com/s3/',
    supportsTesting: true,
    fields: [
      {
        id: 'aws_access_key_id',
        name: 'AWS_ACCESS_KEY_ID',
        label: 'Access Key ID',
        type: 'external',
        environment: 'both',
        description: 'IAM user access key for AWS services',
        isExternal: true,
        externalUrl: 'https://console.aws.amazon.com/iam/home#/security_credentials',
        externalUrlLabel: 'Create in AWS IAM Console',
        helpText: 'Use separate IAM users for dev/prod with minimal permissions.',
        isSecret: false
      },
      {
        id: 'aws_secret_access_key',
        name: 'AWS_SECRET_ACCESS_KEY',
        label: 'Secret Access Key',
        type: 'external',
        environment: 'both',
        description: 'Secret key paired with access key ID',
        isExternal: true,
        externalUrl: 'https://console.aws.amazon.com/iam/home#/security_credentials',
        externalUrlLabel: 'Get from AWS IAM Console',
        helpText: 'CONFIDENTIAL - Rotate regularly. Use IAM roles when possible.',
        isSecret: true
      },
      {
        id: 'aws_region',
        name: 'AWS_REGION',
        label: 'AWS Region',
        type: 'text',
        environment: 'both',
        description: 'AWS region for your S3 bucket (e.g., us-east-1)',
        testValue: 'us-east-1',
        helpText: 'Choose region closest to your users for better performance.',
        isSecret: false
      },
      {
        id: 's3_bucket_name',
        name: 'S3_BUCKET_NAME',
        label: 'S3 Bucket Name',
        type: 'text',
        environment: 'both',
        description: 'Name of your S3 bucket',
        testValue: 'my-app-dev-bucket',
        helpText: 'Use different buckets for dev/staging/prod environments.',
        isSecret: false
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
    description: 'OpenAI API configuration with usage monitoring',
    category: 'AI Services',
    documentationUrl: 'https://platform.openai.com/docs/api-reference',
    supportsTesting: true,
    fields: [
      {
        id: 'openai_api_key',
        name: 'OPENAI_API_KEY',
        label: 'API Key',
        type: 'external',
        environment: 'both',
        description: 'OpenAI API key for accessing AI services',
        isExternal: true,
        externalUrl: 'https://platform.openai.com/api-keys',
        externalUrlLabel: 'Create in OpenAI Platform',
        helpText: 'CONFIDENTIAL - Monitor usage and set billing limits. Server-side only.',
        isSecret: true
      },
      {
        id: 'organization_id',
        name: 'ORGANIZATION_ID',
        label: 'Organization ID',
        type: 'external',
        environment: 'both',
        description: 'OpenAI organization identifier (optional)',
        isExternal: true,
        externalUrl: 'https://platform.openai.com/settings/organization',
        externalUrlLabel: 'Get from OpenAI Organization Settings',
        helpText: 'Optional. Required only for organization-owned API keys.',
        isSecret: false
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
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud Platform',
    description: 'Google Cloud Platform services configuration',
    category: 'Cloud Services',
    documentationUrl: 'https://cloud.google.com/docs',
    supportsTesting: true,
    fields: [
      {
        id: 'google_project_id',
        name: 'GOOGLE_PROJECT_ID',
        label: 'Project ID',
        type: 'external',
        environment: 'both',
        description: 'Google Cloud project identifier',
        isExternal: true,
        externalUrl: 'https://console.cloud.google.com/',
        externalUrlLabel: 'Get from Google Cloud Console',
        testValue: 'my-project-dev-123456',
        helpText: 'Public identifier. Use separate projects for dev/staging/prod.',
        isSecret: false
      },
      {
        id: 'google_service_account',
        name: 'GOOGLE_SERVICE_ACCOUNT',
        label: 'Service Account Key',
        type: 'external',
        environment: 'production',
        description: 'Service account JSON key for server operations',
        isExternal: true,
        externalUrl: 'https://console.cloud.google.com/iam-admin/serviceaccounts',
        externalUrlLabel: 'Create in Google Cloud IAM',
        helpText: 'HIGHLY CONFIDENTIAL - Use principle of least privilege.',
        isSecret: true
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
