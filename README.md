
# Secure Key Generator - Professional Template Management

A comprehensive web application for generating, managing, and storing API keys, tokens, and credentials securely for development and production environments.

## 🔐 Security Features

- **End-to-end encryption**: All keys encrypted locally using AES-256
- **Master password protection**: Single password secures all your credentials
- **No backend storage**: Keys never leave your browser in plain text
- **Environment separation**: Clear distinction between development and production keys
- **Secret detection**: Visual indicators for confidential vs public credentials

## 🎯 Key Features

### Template Library
- **15+ predefined templates** for popular services (Stripe, Auth0, Firebase, GitHub, etc.)
- **Custom template creation** with full CRUD operations
- **Environment-specific fields** (development, production, or both)
- **Testing support** with sample values and test key generation
- **Official documentation links** for each service

### Smart Field Management
- **External vs Generated keys**: Clear distinction between official keys and generated values
- **Security indicators**: Visual warnings for confidential credentials
- **Test value support**: Sample keys for development environments
- **Contextual help**: Tooltips and guidance for each field type
- **Validation patterns**: Ensure correct key formats

### Advanced Filtering
- **Search by name/description**
- **Filter by category** (Database, Authentication, Payments, etc.)
- **Environment filtering** (Development/Production)
- **Template type** (Predefined/Custom)
- **Real-time filtering** with responsive design

### Project Management
- **Multiple projects** with isolated key sets
- **Environment separation** (dev/staging/prod)
- **Export/Import** encrypted templates and key sets
- **Clone and modify** existing templates
- **Version control** for template changes

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** component library
- **Vite** for build tooling
- **React Router** for navigation

### Security Implementation
- **WebCrypto API** for local encryption
- **AES-256-GCM** encryption standard
- **PBKDF2** key derivation
- **No server-side key storage**
- **Client-side only operation**

### Data Storage
- **LocalStorage** for encrypted data
- **Session management** for temporary keys
- **JSON export/import** for backup
- **Template versioning** system

## 🚀 Supported Services

### Payments
- **Stripe**: Test/Live keys, webhooks, proper scope separation
- Separate development (sk_test_/pk_test_) and production (sk_live_/pk_live_) keys

### Authentication
- **Auth0**: Multi-tenant support, environment-specific apps
- **GitHub OAuth**: Proper scope management, secret detection warnings
- **Firebase Auth**: Project separation, service account security

### Databases
- **Supabase**: Anon keys vs service role separation
- **MongoDB Atlas**: Connection string security
- **Firebase Firestore**: Rules-based security guidance

### Cloud Services
- **AWS S3**: IAM best practices, role-based access
- **Google Cloud**: Service account security, project isolation
- **SendGrid**: API key restrictions, verified sender setup

### AI Services
- **OpenAI**: Usage monitoring, billing limits guidance
- Organization-level key management

## 📋 Service-Specific Guidance

### Stripe Implementation
```
Development Environment:
- pk_test_* (Publishable Key) - Frontend safe
- sk_test_* (Secret Key) - Backend only
- Webhook endpoints for testing

Production Environment:
- pk_live_* (Publishable Key) - Frontend safe
- sk_live_* (Secret Key) - Backend only, real money
- Separate webhook endpoints
```

### Firebase Security
```
Development:
- Separate Firebase project
- Relaxed security rules for testing
- Development API keys

Production:
- Strict security rules
- Service account with minimal permissions
- Production-grade monitoring
```

### Auth0 Best Practices
```
Development:
- Separate application in Auth0
- Development callback URLs
- Test user database

Production:
- Production application
- Secure callback URLs
- Production user management
```

## 🔒 Security Best Practices

### Key Management
1. **Never commit keys to version control**
2. **Use environment-specific keys**
3. **Rotate keys regularly**
4. **Monitor key usage**
5. **Use minimal permissions**

### Development vs Production
1. **Separate environments completely**
2. **Use test keys in development**
3. **Validate key formats**
4. **Document key purposes**
5. **Regular security audits**

### Storage Security
1. **Master password strength**
2. **Regular encrypted backups**
3. **Secure password management**
4. **Browser security updates**
5. **Clean logout procedures**

## 🛠️ Development

### Requirements
- Node.js 18+
- Modern browser with WebCrypto support
- TypeScript knowledge

### Setup
```bash
# Clone repository
git clone <repository-url>
cd secure-key-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Workflow
1. **Template Creation**: Use the template editor for custom services
2. **Field Configuration**: Set up proper environment and security flags
3. **Testing**: Use test values and sample data
4. **Documentation**: Update help text and external links
5. **Security Review**: Validate secret handling and storage

## 📚 Usage Guide

### Getting Started
1. **Set Master Password**: First-time setup creates encryption key
2. **Choose Template**: Select from library or create custom
3. **Configure Environment**: Choose development or production
4. **Fill Keys**: Use official keys or test values
5. **Generate Project**: Create encrypted key set

### Template Creation
1. **Basic Info**: Name, category, description
2. **Field Definition**: Add all required keys/tokens
3. **Environment Setup**: Mark dev/prod/both for each field
4. **Security Flags**: Mark confidential fields
5. **Help Documentation**: Add guidance and links

### Key Management
1. **External Keys**: Get from official service dashboards
2. **Generated Keys**: Create secure random values
3. **Test Values**: Use samples for development
4. **Validation**: Check key formats and requirements
5. **Storage**: Automatic encryption and secure storage

## 🔄 Future Enhancements

- [ ] Team collaboration features
- [ ] Key expiration tracking
- [ ] Usage analytics
- [ ] Integration with CI/CD pipelines
- [ ] Mobile application
- [ ] Advanced audit logging
- [ ] Key rotation automation
- [ ] Compliance reporting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Follow security guidelines
4. Add tests for new features
5. Submit pull request

## 📞 Support

For issues, questions, or contributions:
- GitHub Issues: Report bugs and feature requests
- Documentation: Check inline help and tooltips
- Security: Report security issues privately

---

**⚠️ Security Notice**: This application handles sensitive credentials. Always follow security best practices, use strong master passwords, and regularly backup your encrypted data.
