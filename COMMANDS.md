# ⚡ Comandos Úteis - Nutri App

Referência rápida de comandos para desenvolvimento.

## 🚀 Comandos Rápidos

### Iniciar Tudo (Frontend + API)

```bash
# Na raiz do projeto
npm run dev:all
```

### Instalar Tudo

```bash
# Na raiz do projeto
npm run install:all
```

---

## 📱 Frontend

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Variáveis de Ambiente

```bash
# Copiar exemplo
cp .env.example .env

# Editar variáveis
# VITE_API_URL=http://localhost:3001
# VITE_API_KEY=sua-google-ai-key
```

---

## 🔧 Backend (API)

### Desenvolvimento

```bash
# Entrar na pasta da API
cd api

# Iniciar servidor com hot reload
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

### Variáveis de Ambiente

```bash
# Copiar exemplo
cp .env.example .env

# Editar variáveis
# PORT=3001
# FIREBASE_PROJECT_ID=...
# FIREBASE_CLIENT_EMAIL=...
# FIREBASE_PRIVATE_KEY="..."
```

---

## 🔥 Firebase

### CLI Commands

```bash
# Instalar Firebase CLI (uma vez)
npm install -g firebase-tools

# Login no Firebase
firebase login

# Inicializar projeto
firebase init

# Deploy (quando configurado)
firebase deploy
```

### Emulators (Local Development)

```bash
# Iniciar emuladores locais
firebase emulators:start

# Emuladores disponíveis:
# - Auth: http://localhost:9099
# - Firestore: http://localhost:8080
# - Functions: http://localhost:5001
```

---

## 🧪 Testes

### Testar API com curl

```bash
# Health check
curl http://localhost:3001/health

# Registrar usuário
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","name":"Test"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Obter perfil (substitua TOKEN)
curl http://localhost:3001/api/users/profile \
  -H "Authorization: Bearer TOKEN"
```

### Script de Teste Rápido

Salve como `quick-test.sh`:

```bash
#!/bin/bash
echo "Testing API..."
curl -s http://localhost:3001/health | json_pp
```

Execute:
```bash
chmod +x quick-test.sh
./quick-test.sh
```

---

## 📦 Gerenciamento de Pacotes

### npm

```bash
# Instalar pacote no frontend
npm install nome-do-pacote

# Instalar pacote na API
cd api && npm install nome-do-pacote

# Atualizar pacotes
npm update

# Verificar vulnerabilidades
npm audit

# Corrigir vulnerabilidades
npm audit fix

# Limpar cache
npm cache clean --force

# Reinstalar tudo
rm -rf node_modules package-lock.json
npm install
```

---

## 🗄️ Firestore

### Via Firebase Console

1. Abrir https://console.firebase.google.com/
2. Selecionar projeto
3. Ir em **Firestore Database**
4. Ver collections e documentos

### Via Código (Node.js)

```javascript
// Criar documento
await db.collection('users').doc(userId).set(data);

// Ler documento
const doc = await db.collection('users').doc(userId).get();

// Atualizar documento
await db.collection('users').doc(userId).update(updates);

// Deletar documento
await db.collection('users').doc(userId).delete();

// Query
const snapshot = await db.collection('users')
  .where('goal', '==', 'lose')
  .limit(10)
  .get();
```

---

## 🐛 Debug

### Backend Logs

```bash
# Ver logs da API (se usando nodemon/tsx)
cd api
npm run dev

# Logs aparecem no terminal
```

### Frontend Logs

```bash
# Abrir console do navegador
# Chrome/Edge: F12 ou Cmd+Option+I (Mac)
# Firefox: F12 ou Cmd+Option+K (Mac)

# Ver logs no console
console.log('debug info');

# Ver network requests
# Aba Network > XHR/Fetch
```

### Firebase Logs

```bash
# Ver logs no console do Firebase
https://console.firebase.google.com/project/SEU_PROJECT/logs
```

---

## 🔐 Gerenciamento de Tokens

### Limpar Token no Navegador

```javascript
// Abrir console do navegador e executar:
localStorage.removeItem('nutri_auth_token');
localStorage.removeItem('nutri_user');
localStorage.clear(); // Limpar tudo
```

### Ver Token Atual

```javascript
// No console do navegador:
console.log(localStorage.getItem('nutri_auth_token'));
console.log(localStorage.getItem('nutri_user'));
```

---

## 🚀 Deploy

### Frontend (Vercel)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Backend (Railway)

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Inicializar projeto
railway init

# Deploy
railway up
```

### Variáveis de Ambiente no Deploy

**Vercel (Frontend):**
- Ir em Settings > Environment Variables
- Adicionar `VITE_API_URL` e `VITE_API_KEY`

**Railway (Backend):**
- Ir em Variables
- Adicionar todas as variáveis do `.env`

---

## 📊 Monitoramento

### Verificar Status

```bash
# Frontend
curl http://localhost:5173

# API
curl http://localhost:3001/health

# Firebase (check no console)
# https://console.firebase.google.com/
```

### Ver Processos Rodando

```bash
# Ver processos na porta 3001
lsof -i :3001

# Ver processos na porta 5173
lsof -i :5173

# Matar processo (se necessário)
kill -9 PID
```

---

## 🧹 Limpeza

### Limpar Build

```bash
# Frontend
rm -rf dist

# API
cd api && rm -rf dist

# Ambos
rm -rf dist api/dist
```

### Limpar node_modules

```bash
# Frontend
rm -rf node_modules

# API
rm -rf api/node_modules

# Ambos
rm -rf node_modules api/node_modules

# Reinstalar
npm run install:all
```

### Limpar Logs

```bash
# Remover arquivos de log
rm -rf *.log api/*.log

# Limpar cache do npm
npm cache clean --force
```

---

## 📝 Git

### Comandos Úteis

```bash
# Status
git status

# Adicionar arquivos
git add .

# Commit
git commit -m "feat: adiciona nova feature"

# Push
git push origin main

# Pull
git pull origin main

# Ver branches
git branch

# Criar branch
git checkout -b feature/nova-feature

# Voltar para main
git checkout main
```

### Verificar .gitignore

```bash
# Ver arquivos ignorados
git status --ignored

# Garantir que .env não está sendo rastreado
git rm --cached .env
git rm --cached api/.env
```

---

## 🔍 Troubleshooting Rápido

### API não inicia

```bash
# Verificar porta em uso
lsof -i :3001

# Matar processo
kill -9 $(lsof -t -i:3001)

# Reiniciar API
cd api && npm run dev
```

### Frontend não conecta à API

```bash
# Verificar .env
cat .env | grep VITE_API_URL

# Deve ser: VITE_API_URL=http://localhost:3001

# Reiniciar frontend
npm run dev
```

### Firebase errors

```bash
# Verificar credenciais
cat api/.env | grep FIREBASE

# Revalidar no console
# https://console.firebase.google.com/
```

---

## 📚 Recursos

### Documentação
- [README.md](README.md)
- [SETUP.md](SETUP.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [API_TESTS.md](API_TESTS.md)

### Links
- Frontend: http://localhost:5173
- API: http://localhost:3001
- Health: http://localhost:3001/health
- Firebase: https://console.firebase.google.com/

---

**💡 Dica**: Salve este arquivo nos favoritos do seu navegador para acesso rápido!
