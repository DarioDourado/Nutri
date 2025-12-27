# ✅ Checklist de Configuração

Use este checklist para garantir que tudo está configurado corretamente.

## 🔥 Firebase Setup

- [ ] Projeto Firebase criado em https://console.firebase.google.com/
- [ ] Firebase Authentication ativado com Email/Password
- [ ] Cloud Firestore criado (modo teste ou produção)
- [ ] Chave privada baixada (arquivo JSON)
- [ ] Credenciais copiadas para `api/.env`

## 🖥️ Backend (API)

- [ ] Entrou na pasta `api`: `cd api`
- [ ] Dependências instaladas: `npm install`
- [ ] Arquivo `.env` criado: `cp .env.example .env`
- [ ] Variáveis de ambiente preenchidas em `api/.env`:
  - [ ] `FIREBASE_PROJECT_ID`
  - [ ] `FIREBASE_CLIENT_EMAIL`
  - [ ] `FIREBASE_PRIVATE_KEY`
  - [ ] `PORT=3001`
  - [ ] `FRONTEND_URL=http://localhost:5173`
- [ ] API rodando: `npm run dev`
- [ ] Health check funcionando: http://localhost:3001/health
- [ ] Console mostra: "✅ Firebase Admin initialized successfully"

## 🎨 Frontend

- [ ] Voltou para a pasta raiz: `cd ..`
- [ ] Dependências instaladas: `npm install`
- [ ] Arquivo `.env` criado: `cp .env.example .env`
- [ ] Variáveis de ambiente preenchidas em `.env`:
  - [ ] `VITE_API_URL=http://localhost:3001`
  - [ ] `VITE_API_KEY=` (Google AI API Key)
- [ ] Frontend rodando: `npm run dev`
- [ ] App acessível em: http://localhost:5173

## 🧪 Testes

- [ ] Consegue acessar http://localhost:5173
- [ ] Consegue acessar http://localhost:3001/health
- [ ] Consegue registrar novo usuário
- [ ] Usuário aparece no Firebase Authentication
- [ ] Usuário aparece no Firestore (coleção `users`)
- [ ] Consegue fazer login com usuário criado
- [ ] Consegue acessar perfil do usuário

## 🔒 Segurança

- [ ] Arquivo `.env` está no `.gitignore`
- [ ] Arquivo `api/.env` está no `.gitignore`
- [ ] Não commitou credenciais do Firebase
- [ ] Não commitou API keys

## 📝 Documentação Lida

- [ ] [README.md](README.md) - Visão geral do projeto
- [ ] [SETUP.md](SETUP.md) - Guia de setup completo
- [ ] [api/README.md](api/README.md) - Documentação da API
- [ ] [TRANSPORTER_EXAMPLES.md](TRANSPORTER_EXAMPLES.md) - Exemplos de uso

## 🚀 Próximos Passos

Após completar o checklist acima:

1. [ ] Implementar páginas de login e registro
2. [ ] Implementar página de perfil
3. [ ] Conectar componentes aos transporters
4. [ ] Adicionar rotas de nutrição à API
5. [ ] Configurar regras de segurança do Firestore
6. [ ] Preparar para deploy

## 🐛 Problemas Comuns

### API não inicia
- Verifique se todas as variáveis de ambiente estão corretas
- Verifique se a chave privada está entre aspas duplas
- Verifique se há erros no console

### Frontend não conecta à API
- Verifique se a API está rodando
- Teste o endpoint `/health`
- Verifique o `VITE_API_URL` no `.env`

### Erro de CORS
- Verifique `FRONTEND_URL` em `api/.env`
- Reinicie a API

### Token inválido
- Limpe o localStorage do navegador
- Faça logout e login novamente

---

## 📞 Ajuda

Se algo não funcionar:

1. ✅ Revise este checklist
2. ✅ Consulte [SETUP.md](SETUP.md)
3. ✅ Verifique os logs no console
4. ✅ Verifique o console do Firebase
5. ✅ Teste os endpoints manualmente com Postman/Insomnia

---

**Última atualização**: Dezembro 2025
