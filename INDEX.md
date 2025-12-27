# 📚 Índice de Documentação - Nutri App

Bem-vindo ao projeto Nutri! Este arquivo serve como índice para toda a documentação do projeto.

## 🚀 Começando

Se você é novo no projeto, siga esta ordem:

1. **[README.md](README.md)** - Visão geral do projeto e início rápido
2. **[CHECKLIST.md](CHECKLIST.md)** - Lista de verificação para setup
3. **[SETUP.md](SETUP.md)** - Guia passo a passo de configuração
4. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitetura e estrutura do projeto

## 📖 Documentação Principal

### Visão Geral
- **[README.md](README.md)**
  - Descrição do projeto
  - Tecnologias utilizadas
  - Como executar localmente
  - Estrutura básica

### Setup e Configuração
- **[SETUP.md](SETUP.md)**
  - Configuração do Firebase
  - Setup da API
  - Setup do Frontend
  - Troubleshooting

- **[CHECKLIST.md](CHECKLIST.md)**
  - Lista completa de verificação
  - Checkpoints de configuração
  - Problemas comuns e soluções

### Arquitetura e Design
- **[ARCHITECTURE.md](ARCHITECTURE.md)**
  - Diagrama de arquitetura
  - Fluxos de dados
  - Estrutura de pastas
  - Modelo de dados
  - Segurança e escalabilidade

## 🔧 Documentação da API

### API Backend
- **[api/README.md](api/README.md)**
  - Documentação da API REST
  - Endpoints disponíveis
  - Configuração do servidor
  - Variáveis de ambiente

### Testes
- **[API_TESTS.md](API_TESTS.md)**
  - Exemplos de requisições com curl
  - Testes com Postman
  - Scripts de teste
  - Erros comuns

## 💻 Guias de Desenvolvimento

### Transporters
- **[TRANSPORTER_EXAMPLES.md](TRANSPORTER_EXAMPLES.md)**
  - Como usar auth transporter
  - Como usar user transporter
  - Exemplos de integração
  - Uso em componentes React
  - Custom hooks

## 📁 Estrutura do Projeto

```
Nutri/
├── 📄 README.md                    # Visão geral
├── 📄 SETUP.md                     # Guia de setup
├── 📄 CHECKLIST.md                 # Lista de verificação
├── 📄 ARCHITECTURE.md              # Arquitetura
├── 📄 API_TESTS.md                 # Testes da API
├── 📄 TRANSPORTER_EXAMPLES.md      # Exemplos de uso
├── 📄 INDEX.md                     # Este arquivo
│
├── 📁 api/                         # Backend
│   ├── 📄 README.md                # Documentação da API
│   ├── 📁 src/
│   │   ├── 📁 config/              # Configurações
│   │   ├── 📁 middleware/          # Middlewares
│   │   ├── 📁 routes/              # Rotas
│   │   ├── 📁 types/               # TypeScript types
│   │   └── 📄 server.ts            # Servidor Express
│   ├── .env.example                # Exemplo de variáveis
│   └── package.json
│
├── 📁 app/                         # Páginas
├── 📁 components/                  # Componentes React
├── 📁 services/                    # Serviços
│   ├── 📁 transporter/             # HTTP clients
│   └── 📁 hooks/                   # Custom hooks
├── 📁 types/                       # TypeScript types
└── 📁 locales/                     # i18n

```

## 🎯 Por Objetivo

### Quero configurar o projeto
1. [README.md](README.md) - Visão geral
2. [CHECKLIST.md](CHECKLIST.md) - O que preciso fazer
3. [SETUP.md](SETUP.md) - Como fazer passo a passo

### Quero entender a arquitetura
1. [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitetura completa
2. [api/README.md](api/README.md) - API backend

### Quero desenvolver features
1. [TRANSPORTER_EXAMPLES.md](TRANSPORTER_EXAMPLES.md) - Como usar transporters
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Estrutura do código
3. [api/README.md](api/README.md) - Endpoints disponíveis

### Quero testar a API
1. [API_TESTS.md](API_TESTS.md) - Exemplos de testes
2. [api/README.md](api/README.md) - Documentação dos endpoints

### Estou com problemas
1. [CHECKLIST.md](CHECKLIST.md) - Troubleshooting
2. [SETUP.md](SETUP.md) - Seção de problemas comuns
3. [API_TESTS.md](API_TESTS.md) - Testar endpoints manualmente

## 🔑 Conceitos Importantes

### Frontend
- **React Components**: Interfaces de usuário
- **Services**: Lógica de negócio
- **Transporters**: Comunicação HTTP com API
- **Hooks**: Estado e efeitos colaterais

### Backend
- **Express Routes**: Endpoints REST
- **Middleware**: Auth, validação, erros
- **Firebase Admin**: Gerenciamento de usuários e dados
- **Firestore**: Banco de dados NoSQL

### Autenticação
- **Firebase Auth**: Sistema de autenticação
- **Custom Tokens**: Tokens gerados pela API
- **JWT**: Tokens para requisições protegidas
- **LocalStorage**: Armazenamento de tokens

## 📞 Recursos Adicionais

### Links Úteis
- [Firebase Documentation](https://firebase.google.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Google AI Studio](https://ai.google.dev/)

### Ferramentas Recomendadas
- **VS Code**: Editor de código
- **Postman/Insomnia**: Testar API
- **Firebase Console**: Gerenciar dados
- **React DevTools**: Debug de componentes
- **Chrome DevTools**: Debug geral

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Leia [ARCHITECTURE.md](ARCHITECTURE.md) para entender a estrutura
2. Siga os padrões de código existentes
3. Documente novas features
4. Teste suas alterações
5. Atualize a documentação relevante

## 📝 Notas de Versão

### Versão Atual: 1.0.0

**Features implementadas:**
- ✅ Autenticação com Firebase
- ✅ Gerenciamento de perfil de usuário
- ✅ API REST com Express
- ✅ Integração com Firestore
- ✅ Documentação completa

**Em desenvolvimento:**
- 🚧 Registro de refeições
- 🚧 Análise nutricional com IA
- 🚧 Dashboard com gráficos
- 🚧 Histórico de refeições

## 🔐 Segurança

⚠️ **Importante**: Nunca commite arquivos `.env` ou credenciais do Firebase!

Arquivos que devem estar no `.gitignore`:
- `.env`
- `firebase-service-account.json`
- `node_modules/`
- `dist/`

## 📄 Licença

[Definir licença do projeto]

---

**Última atualização**: Dezembro 2025

**Desenvolvido com** ❤️ **usando React, TypeScript, Firebase e Node.js**
