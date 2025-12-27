# 🏗️ Arquitetura do Projeto Nutri

## Visão Geral

O projeto Nutri é uma aplicação web de assistente nutricional com IA, composta por:
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + Firebase
- **Banco de Dados**: Firebase Firestore
- **Autenticação**: Firebase Authentication
- **IA**: Google Generative AI (Gemini)

## Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          React Components (UI)                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│ │
│  │  │  Dashboard   │  │   Profile    │  │    Login     ││ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘│ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↕                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Services Layer                                 │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│ │
│  │  │ Auth Service │  │ User Service │  │   Gemini     ││ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘│ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↕                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Transporters (HTTP Clients)                    │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│ │
│  │  │authTransporter│ │userTransporter│ │  aiClient    ││ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘│ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND API                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Express Server                            │ │
│  │  ┌──────────────┐  ┌──────────────┐                   │ │
│  │  │ CORS/Helmet  │  │  Body Parser │                   │ │
│  │  └──────────────┘  └──────────────┘                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↕                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Middleware                                │ │
│  │  ┌──────────────┐  ┌──────────────┐                   │ │
│  │  │     Auth     │  │ Error Handler│                   │ │
│  │  └──────────────┘  └──────────────┘                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                          ↕                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                Routes                                  │ │
│  │  ┌──────────────┐  ┌──────────────┐                   │ │
│  │  │  /api/auth   │  │ /api/users   │                   │ │
│  │  └──────────────┘  └──────────────┘                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          ↕ Firebase SDK
┌─────────────────────────────────────────────────────────────┐
│                    FIREBASE SERVICES                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Auth      │  │   Firestore  │  │   Storage    │     │
│  │ (Users Auth) │  │ (User Data)  │  │   (Files)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          Google Generative AI (Gemini)                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Fluxo de Dados

### Fluxo de Autenticação

```
1. Usuário preenche formulário de login
   ↓
2. Frontend chama authTransporter.login(email, password)
   ↓
3. Transporter faz POST para /api/auth/login
   ↓
4. API verifica email no Firebase Auth
   ↓
5. API busca perfil do usuário no Firestore
   ↓
6. API gera custom token do Firebase
   ↓
7. API retorna {user, token}
   ↓
8. Transporter salva token no localStorage
   ↓
9. Frontend redireciona para dashboard
```

### Fluxo de Registro

```
1. Usuário preenche formulário de registro
   ↓
2. Frontend chama authTransporter.register(userData, password)
   ↓
3. Transporter faz POST para /api/auth/register
   ↓
4. API cria usuário no Firebase Auth
   ↓
5. API cria documento do usuário no Firestore
   ↓
6. API gera custom token
   ↓
7. API retorna {user, token}
   ↓
8. Transporter salva token no localStorage
   ↓
9. Frontend redireciona para dashboard
```

### Fluxo de Atualização de Perfil

```
1. Usuário edita perfil
   ↓
2. Frontend chama userTransporter.updateProfile(updates)
   ↓
3. Transporter adiciona token no header Authorization
   ↓
4. Transporter faz PUT para /api/users/profile
   ↓
5. API verifica token com Firebase Admin
   ↓
6. Middleware authenticateToken valida e extrai UID
   ↓
7. API atualiza documento no Firestore
   ↓
8. API retorna perfil atualizado
   ↓
9. Transporter atualiza localStorage
   ↓
10. Frontend atualiza UI
```

## Estrutura de Pastas

### Frontend

```
/
├── app/                    # Páginas (Next.js style routing)
│   ├── page.tsx           # Home/Landing page
│   ├── login/
│   │   └── page.tsx       # Página de login
│   ├── dashboard/
│   │   └── page.tsx       # Dashboard do usuário
│   └── profile/
│       └── page.tsx       # Página de perfil
│
├── components/            # Componentes React reutilizáveis
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Dashboard.tsx
│   └── Profile.tsx
│
├── services/              # Lógica de negócio
│   ├── authService.ts     # Serviço de autenticação
│   ├── geminiService.ts   # Serviço de IA
│   ├── transporter/       # Camada de comunicação HTTP
│   │   ├── auth.ts        # Transporter de autenticação
│   │   ├── user.ts        # Transporter de usuário
│   │   └── client.ts      # Cliente AI
│   └── hooks/             # Custom React hooks
│       ├── useAuth.ts
│       └── useNutrition.ts
│
├── types/                 # TypeScript types/interfaces
│   ├── user.ts
│   ├── meal.ts
│   └── nutrients.ts
│
└── locales/               # i18n (internacionalização)
    ├── en.json
    ├── pt.json
    └── i18n.ts
```

### Backend (API)

```
api/
├── src/
│   ├── config/            # Configurações
│   │   └── firebase.ts    # Firebase Admin SDK setup
│   │
│   ├── middleware/        # Express middlewares
│   │   ├── auth.ts        # Autenticação JWT
│   │   └── errorHandler.ts
│   │
│   ├── routes/            # Rotas da API
│   │   ├── auth.ts        # Rotas de auth
│   │   └── users.ts       # Rotas de usuário
│   │
│   ├── types/             # TypeScript types
│   │   └── user.ts
│   │
│   └── server.ts          # Entry point do Express
│
├── .env                   # Variáveis de ambiente (não commitar!)
├── .env.example           # Exemplo de .env
├── package.json
└── tsconfig.json
```

## Camadas da Aplicação

### 1. Presentation Layer (Frontend)

**Responsabilidade**: Interface do usuário e experiência

- Componentes React
- Páginas e rotas
- Formulários e validação de UI
- Estado local (useState, useReducer)

### 2. Service Layer (Frontend)

**Responsabilidade**: Lógica de negócio e orquestração

- authService: Gerencia fluxo de autenticação
- geminiService: Integração com IA
- Hooks customizados (useAuth, useNutrition)

### 3. Transport Layer (Frontend)

**Responsabilidade**: Comunicação HTTP com a API

- authTransporter: Requisições de auth
- userTransporter: Requisições de usuário
- aiClient: Cliente Google AI
- Gerenciamento de tokens
- Tratamento de erros HTTP

### 4. API Layer (Backend)

**Responsabilidade**: Expor endpoints REST

- Rotas Express
- Validação de entrada (express-validator)
- Middleware de autenticação
- Tratamento de erros

### 5. Data Access Layer (Backend)

**Responsabilidade**: Interação com banco de dados

- Firebase Admin SDK
- Firebase Auth (gerenciamento de usuários)
- Firestore (CRUD de documentos)

### 6. External Services

**Responsabilidade**: Integrações externas

- Firebase Authentication
- Cloud Firestore
- Google Generative AI (Gemini)

## Modelo de Dados

### Firestore Collections

#### `users` Collection

```typescript
{
  id: string;              // Firebase UID
  name: string;            // Nome do usuário
  email: string;           // Email
  goal: 'lose' | 'gain' | 'maintain';  // Objetivo
  dailyCalorieTarget: number;          // Meta de calorias
  weight: number;          // Peso em kg
  height: number;          // Altura em cm
  createdAt: Date;         // Data de criação
  updatedAt: Date;         // Última atualização
}
```

#### `meals` Collection (futuro)

```typescript
{
  id: string;
  userId: string;          // Referência ao usuário
  name: string;            // Nome da refeição
  date: Date;              // Data da refeição
  calories: number;        // Calorias totais
  nutrients: {
    protein: number;
    carbs: number;
    fat: number;
  };
  createdAt: Date;
}
```

## Segurança

### Frontend
- Tokens armazenados em localStorage
- Validação de formulários
- Sanitização de inputs
- HTTPS em produção

### Backend
- Helmet para headers de segurança
- CORS configurado
- Validação com express-validator
- Rate limiting (a implementar)
- Autenticação JWT obrigatória em rotas protegidas

### Firebase
- Regras de segurança no Firestore
- Autenticação obrigatória
- Firebase Admin SDK para operações privilegiadas

## Escalabilidade

### Horizontal Scaling
- API stateless (pode ter múltiplas instâncias)
- Firebase gerencia escala automaticamente
- CDN para assets estáticos

### Vertical Scaling
- Otimização de queries do Firestore
- Cache de dados frequentes
- Lazy loading de componentes

## Performance

### Frontend
- Code splitting com Vite
- Lazy loading de rotas
- Memoização de componentes
- Debounce em inputs

### Backend
- Conexão persistente com Firebase
- Validação eficiente
- Resposta rápida (< 200ms)

### Database
- Índices no Firestore
- Queries otimizadas
- Cache quando apropriado

## Monitoramento

### Logs
- Console logs em desenvolvimento
- Structured logging em produção
- Error tracking (Sentry recomendado)

### Métricas
- Firebase Analytics
- Performance monitoring
- Error rate tracking

## Deploy

### Frontend
- **Recomendado**: Vercel ou Netlify
- Build: `npm run build`
- Variáveis de ambiente no provider

### Backend
- **Recomendado**: Railway, Render ou Heroku
- Build: `npm run build`
- Start: `npm start`
- Variáveis de ambiente no provider

## Próximas Melhorias

1. **WebSockets** para updates em tempo real
2. **Redis** para cache
3. **Bull** para job queues
4. **Winston** para logging avançado
5. **Jest** para testes automatizados
6. **GitHub Actions** para CI/CD
7. **Docker** para containerização
8. **Kubernetes** para orquestração (se necessário)
