# KeyForge Vault (API key templates, prototype)

A browser tool for generating credentials and managing key templates, generated with Lovable in June 2025. Everything stays in the browser. Treat it as a prototype and not as a vetted security tool.

## What it does

- Generators for passwords, hex keys, UUIDs and a development-only JWT, using the Web Crypto API.
- Template library for common services (Stripe, Supabase, Firebase, GitHub, ...), with search, category filter and custom templates.
- Projects that hold generated values, locked by a master password: PBKDF2 key derivation and AES-256-GCM encryption in `src/utils/crypto.ts`.
- Templates and projects stored in localStorage; no backend.

## Built with

Vite, React 18, TypeScript, Tailwind CSS and shadcn/ui (Lovable's default stack), Web Crypto API.

## Run it locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build
```

Status: archived prototype, not maintained.

---

Prototipo de generador de claves y plantillas de credenciales en el navegador, hecho con Lovable en junio de 2025.
Cifra con PBKDF2 y AES-GCM; es un prototipo sin auditar.
