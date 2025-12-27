<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Nutri - AI Nutritional Assistant

Aplicativo de assistente nutricional com IA usando React, TypeScript e Firebase.

View your app in AI Studio: https://ai.studio/apps/drive/1ePJCmptDU59d-4_elu9CBSYXslq5sCiM

## 🏗️ Arquitetura

Este projeto é composto por duas partes:

1. **Frontend** (React + Vite + TypeScript) - Aplicação web
2. **API** (Node.js + Express + Firebase) - Micro API backend

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Projeto Firebase configurado

## 🚀 Executar Localmente

### 1. Configurar o Frontend

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env`:
```env
VITE_API_URL=http://localhost:3001
VITE_API_KEY=sua-google-ai-api-key
```

4. Execute o frontend:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

### 2. Configurar a API

1. Entre na pasta da API:
```bash
cd api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Edite o arquivo `api/.env` com suas credenciais do Firebase:
```env
PORT=3001
NODE_ENV=development

FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_CLIENT_EMAIL=seu-client-email
FIREBASE_PRIVATE_KEY="sua-private-key"

FRONTEND_URL=http://localhost:5173
```

5. Execute a API:
```bash
npm run dev
```

A API estará disponível em `http://localhost:3001`

## 📁 Estrutura do Projeto

```
Nutri/
├── api/                      # Backend API
│   ├── src/
│   │   ├── config/          # Configurações (Firebase)
│   │   ├── middleware/      # Middleware (auth, errors)
│   │   ├── routes/          # Rotas da API
│   │   ├── types/           # Tipos TypeScript
│   │   └── server.ts        # Servidor Express
│   ├── package.json
│   └── README.md
├── app/                      # Páginas Next.js style
├── components/               # Componentes React
├── services/                 # Serviços
│   ├── transporter/         # Transporters para API
│   │   ├── auth.ts          # Auth transporter
│   │   ├── client.ts        # AI client
│   │   └── user.ts          # User transporter
│   └── hooks/               # Custom hooks
├── types/                    # Tipos TypeScript
└── locales/                  # Internacionalização
```

## 🔧 Tecnologias

### Frontend
- React 19
- TypeScript
- Vite
- i18next (Internacionalização)
- Recharts (Gráficos)
- Google Generative AI

### Backend (API)
- Node.js
- Express
- TypeScript
- Firebase Admin SDK
- Firebase Auth
- Cloud Firestore

## 🔒 Autenticação

O sistema usa Firebase Authentication:
- O frontend se comunica com a API
- A API gerencia usuários com Firebase Admin SDK
- Tokens JWT para autenticação
- Dados do usuário armazenados no Firestore

## 📖 Documentação da API

Para mais detalhes sobre os endpoints da API, consulte [api/README.md](api/README.md).

## 🌐 Endpoints Principais

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login
- `GET /api/users/profile` - Obter perfil (requer auth)
- `PUT /api/users/profile` - Atualizar perfil (requer auth)

## 🛠️ Desenvolvimento

### Frontend
```bash
npm run dev      # Modo desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

### API
```bash
cd api
npm run dev      # Modo desenvolvimento com hot reload
npm run build    # Build para produção
npm start        # Executar build de produção
```

## 📝 Notas

- Configure o Firebase antes de executar a aplicação
- A API deve estar rodando para o frontend funcionar corretamente
- Use diferentes portas para frontend (5173) e API (3001)

