# 🚀 Guia de Setup Completo - Nutri App

## Passo 1: Configurar Firebase

### 1.1 Criar Projeto Firebase

1. Acesse https://console.firebase.google.com/
2. Clique em "Adicionar projeto"
3. Dê um nome ao projeto (ex: "nutri-app")
4. Siga os passos de configuração

### 1.2 Ativar Serviços

#### Firebase Authentication
1. No console do Firebase, vá em **Authentication**
2. Clique em **Começar**
3. Ative o provedor **Email/Password**

#### Cloud Firestore
1. Vá em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha o modo de produção ou teste
4. Selecione uma localização

### 1.3 Obter Credenciais

1. Vá em **Configurações do Projeto** (ícone de engrenagem)
2. Clique na aba **Contas de serviço**
3. Clique em **Gerar nova chave privada**
4. Um arquivo JSON será baixado

O arquivo terá este formato:
```json
{
  "type": "service_account",
  "project_id": "seu-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@seu-project-id.iam.gserviceaccount.com",
  ...
}
```

## Passo 2: Configurar a API

### 2.1 Instalar Dependências

```bash
cd api
npm install
```

### 2.2 Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e preencha com os dados do arquivo JSON do Firebase:

```env
PORT=3001
NODE_ENV=development

# Copie estes valores do arquivo JSON baixado
FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@seu-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_AQUI\n-----END PRIVATE KEY-----\n"

FRONTEND_URL=http://localhost:5173
```

⚠️ **Importante**: 
- Mantenha as aspas duplas em `FIREBASE_PRIVATE_KEY`
- Mantenha os `\n` na chave privada
- Não compartilhe este arquivo

### 2.3 Executar a API

```bash
npm run dev
```

Você deve ver:
```
🚀 Server running on port 3001
📍 Health check: http://localhost:3001/health
🔥 Firebase initialized
🌐 CORS enabled for: http://localhost:5173
✅ Firebase Admin initialized successfully
```

### 2.4 Testar a API

Abra http://localhost:3001/health no navegador.

Você deve ver:
```json
{
  "status": "healthy",
  "timestamp": "2024-...",
  "uptime": 0.123
}
```

## Passo 3: Configurar o Frontend

### 3.1 Voltar para a pasta raiz

```bash
cd ..
```

### 3.2 Instalar Dependências

```bash
npm install
```

### 3.3 Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
# URL da API (já está rodando)
VITE_API_URL=http://localhost:3001

# Chave da API do Google AI (para Gemini)
# Obtenha em: https://makersuite.google.com/app/apikey
VITE_API_KEY=sua-google-ai-api-key
```

### 3.4 Executar o Frontend

```bash
npm run dev
```

O app estará em http://localhost:5173

## Passo 4: Testar o Sistema

### 4.1 Registrar um Usuário

1. Abra http://localhost:5173
2. Vá para a página de registro
3. Preencha o formulário:
   - Email: test@example.com
   - Password: test123
   - Nome: Teste
4. Clique em registrar

### 4.2 Verificar no Firebase

1. Abra o Console do Firebase
2. Vá em **Authentication** > **Users**
3. Você deve ver o usuário criado
4. Vá em **Firestore** > **Data**
5. Você deve ver a coleção `users` com o perfil do usuário

## 🐛 Troubleshooting

### API não conecta ao Firebase

**Erro**: `Error initializing Firebase Admin`

**Solução**:
- Verifique se o arquivo `.env` está na pasta `api/`
- Verifique se copiou corretamente as credenciais
- Certifique-se de que a chave privada está entre aspas duplas

### Frontend não conecta à API

**Erro**: `Failed to fetch` ou `Network error`

**Solução**:
- Verifique se a API está rodando em http://localhost:3001
- Teste o endpoint `/health`
- Verifique o arquivo `.env` do frontend

### CORS Error

**Erro**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solução**:
- Verifique se `FRONTEND_URL` está correto em `api/.env`
- Reinicie a API

### Token Inválido

**Erro**: `Invalid or expired token`

**Solução**:
- Faça logout e login novamente
- Limpe o localStorage do navegador (F12 > Application > Local Storage)

## 📚 Próximos Passos

1. **Adicionar mais rotas** à API (meals, nutrition, etc.)
2. **Configurar regras de segurança** no Firestore
3. **Deploy da API** (Heroku, Railway, etc.)
4. **Deploy do Frontend** (Vercel, Netlify, etc.)
5. **Configurar variáveis de ambiente** para produção

## 🔒 Segurança para Produção

Antes de fazer deploy:

1. ✅ Adicione `.env` ao `.gitignore`
2. ✅ Use variáveis de ambiente do servidor
3. ✅ Configure regras do Firestore
4. ✅ Ative HTTPS
5. ✅ Configure CORS para domínio específico
6. ✅ Implemente rate limiting
7. ✅ Use secrets management

## 📞 Suporte

Para problemas ou dúvidas:
- Verifique a documentação do Firebase
- Consulte [api/README.md](api/README.md)
- Verifique os logs do console
