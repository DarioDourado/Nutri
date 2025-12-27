# Nutri API

Micro API para o aplicativo Nutri com Firebase Admin SDK.

## 🚀 Funcionalidades

- ✅ Autenticação com Firebase Auth
- ✅ Gerenciamento de perfis de usuário com Firestore
- ✅ Middleware de autenticação com tokens JWT
- ✅ Validação de dados com express-validator
- ✅ Segurança com Helmet e CORS
- ✅ TypeScript

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Projeto Firebase configurado

## 🔧 Instalação

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

4. Edite o arquivo `.env` com suas credenciais do Firebase:
```env
PORT=3001
NODE_ENV=development

FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_CLIENT_EMAIL=seu-client-email
FIREBASE_PRIVATE_KEY="sua-private-key"

FRONTEND_URL=http://localhost:5173
```

### Obtendo Credenciais do Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Vá em **Configurações do Projeto** > **Contas de serviço**
4. Clique em **Gerar nova chave privada**
5. Um arquivo JSON será baixado com as credenciais
6. Use os valores do JSON no arquivo `.env`

## 🏃 Executando

### Modo desenvolvimento (com hot reload):
```bash
npm run dev
```

### Modo produção:
```bash
npm run build
npm start
```

## 📡 Endpoints

### Autenticação

#### Registrar usuário
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "senha123",
  "name": "João Silva",
  "goal": "maintain",
  "weight": 75,
  "height": 180
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "senha123"
}
```

#### Verificar Token
```http
POST /api/auth/verify-token
Content-Type: application/json

{
  "token": "seu-firebase-token"
}
```

### Usuário (requer autenticação)

Todas as rotas de usuário requerem o header:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

#### Obter perfil
```http
GET /api/users/profile
Authorization: Bearer SEU_TOKEN
```

#### Atualizar perfil
```http
PUT /api/users/profile
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "name": "João Silva",
  "goal": "lose",
  "dailyCalorieTarget": 2000,
  "weight": 73,
  "height": 180
}
```

#### Deletar conta
```http
DELETE /api/users/profile
Authorization: Bearer SEU_TOKEN
```

### Health Check
```http
GET /health
```

## 🗂️ Estrutura do Projeto

```
api/
├── src/
│   ├── config/
│   │   └── firebase.ts          # Configuração Firebase Admin
│   ├── middleware/
│   │   ├── auth.ts               # Middleware de autenticação
│   │   └── errorHandler.ts      # Tratamento de erros
│   ├── routes/
│   │   ├── auth.ts               # Rotas de autenticação
│   │   └── users.ts              # Rotas de usuário
│   ├── types/
│   │   └── user.ts               # Tipos TypeScript
│   └── server.ts                 # Servidor Express
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🔒 Segurança

- Tokens JWT para autenticação
- Helmet para headers de segurança
- CORS configurado
- Validação de entrada com express-validator
- Variáveis de ambiente para dados sensíveis

## 📝 Notas

- A API usa Firebase Admin SDK no backend
- O frontend deve usar Firebase SDK para autenticação do cliente
- Os tokens personalizados (custom tokens) são gerados pela API
- O Firestore é usado para armazenar perfis de usuário

## 🛠️ Desenvolvimento

Para adicionar novos endpoints:

1. Crie uma nova rota em `src/routes/`
2. Adicione a rota no `server.ts`
3. Use o middleware `authenticateToken` para rotas protegidas
4. Valide dados com `express-validator`

## 📦 Build

```bash
npm run build
```

Os arquivos compilados estarão em `dist/`.
