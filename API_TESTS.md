# 🧪 Testes da API

Exemplos de requisições para testar a API usando `curl` ou ferramentas como Postman/Insomnia.

## 📡 Endpoints

### Health Check

```bash
curl http://localhost:3001/health
```

**Resposta esperada:**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-27T...",
  "uptime": 123.456
}
```

---

## 🔐 Autenticação

### 1. Registrar Novo Usuário

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "João Silva",
    "goal": "maintain",
    "weight": 75,
    "height": 180
  }'
```

**Resposta esperada:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "firebase-user-id",
    "name": "João Silva",
    "email": "test@example.com",
    "goal": "maintain",
    "dailyCalorieTarget": 2200,
    "weight": 75,
    "height": 180
  },
  "token": "custom-firebase-token"
}
```

### 2. Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

**Resposta esperada:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "firebase-user-id",
    "name": "João Silva",
    "email": "test@example.com",
    "goal": "maintain",
    "dailyCalorieTarget": 2200,
    "weight": 75,
    "height": 180
  },
  "token": "custom-firebase-token"
}
```

### 3. Verificar Token

```bash
curl -X POST http://localhost:3001/api/auth/verify-token \
  -H "Content-Type: application/json" \
  -d '{
    "token": "seu-firebase-id-token"
  }'
```

**Resposta esperada:**
```json
{
  "valid": true,
  "user": {
    "id": "firebase-user-id",
    "email": "test@example.com",
    "name": "João Silva",
    "goal": "maintain",
    "dailyCalorieTarget": 2200,
    "weight": 75,
    "height": 180
  }
}
```

---

## 👤 Usuário (Requer Autenticação)

**Importante**: Substitua `YOUR_TOKEN_HERE` pelo token recebido após login/registro.

### 1. Obter Perfil

```bash
curl -X GET http://localhost:3001/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Resposta esperada:**
```json
{
  "user": {
    "id": "firebase-user-id",
    "name": "João Silva",
    "email": "test@example.com",
    "goal": "maintain",
    "dailyCalorieTarget": 2200,
    "weight": 75,
    "height": 180,
    "createdAt": "2024-12-27T...",
    "updatedAt": "2024-12-27T..."
  }
}
```

### 2. Atualizar Perfil

```bash
curl -X PUT http://localhost:3001/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Atualizado",
    "goal": "lose",
    "weight": 73,
    "dailyCalorieTarget": 1800
  }'
```

**Resposta esperada:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "firebase-user-id",
    "name": "João Silva Atualizado",
    "email": "test@example.com",
    "goal": "lose",
    "dailyCalorieTarget": 1800,
    "weight": 73,
    "height": 180,
    "updatedAt": "2024-12-27T..."
  }
}
```

### 3. Deletar Conta

```bash
curl -X DELETE http://localhost:3001/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Resposta esperada:**
```json
{
  "message": "User account deleted successfully"
}
```

### 4. Obter Estatísticas (Placeholder)

```bash
curl -X GET http://localhost:3001/api/users/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Resposta esperada:**
```json
{
  "message": "Stats endpoint - to be implemented",
  "userId": "firebase-user-id"
}
```

---

## 🧪 Script de Teste Completo

Salve este script como `test-api.sh`:

```bash
#!/bin/bash

API_URL="http://localhost:3001"
EMAIL="test@example.com"
PASSWORD="test123"

echo "🧪 Testing Nutri API"
echo "===================="

# Health Check
echo -e "\n1️⃣ Testing Health Check..."
curl -s $API_URL/health | json_pp

# Register
echo -e "\n2️⃣ Testing Registration..."
REGISTER_RESPONSE=$(curl -s -X POST $API_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\",
    \"name\": \"Test User\",
    \"goal\": \"maintain\",
    \"weight\": 75,
    \"height\": 180
  }")
echo $REGISTER_RESPONSE | json_pp

# Extract token
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token: $TOKEN"

# Login
echo -e "\n3️⃣ Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\"
  }")
echo $LOGIN_RESPONSE | json_pp

# Get Profile
echo -e "\n4️⃣ Testing Get Profile..."
curl -s -X GET $API_URL/api/users/profile \
  -H "Authorization: Bearer $TOKEN" | json_pp

# Update Profile
echo -e "\n5️⃣ Testing Update Profile..."
curl -s -X PUT $API_URL/api/users/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User Updated",
    "weight": 73
  }' | json_pp

echo -e "\n✅ Tests completed!"
```

Execute com:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## 🔍 Testando com Postman

### Importar Collection

Crie uma collection no Postman com estes endpoints:

1. **Health Check**
   - Method: GET
   - URL: `{{API_URL}}/health`

2. **Register**
   - Method: POST
   - URL: `{{API_URL}}/api/auth/register`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "test123",
       "name": "João Silva",
       "goal": "maintain",
       "weight": 75,
       "height": 180
     }
     ```

3. **Login**
   - Method: POST
   - URL: `{{API_URL}}/api/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "test123"
     }
     ```

4. **Get Profile**
   - Method: GET
   - URL: `{{API_URL}}/api/users/profile`
   - Headers: `Authorization: Bearer {{token}}`

5. **Update Profile**
   - Method: PUT
   - URL: `{{API_URL}}/api/users/profile`
   - Headers: `Authorization: Bearer {{token}}`
   - Body (JSON):
     ```json
     {
       "name": "João Silva Atualizado",
       "goal": "lose",
       "weight": 73
     }
     ```

### Variables no Postman

Crie estas variáveis:
- `API_URL`: `http://localhost:3001`
- `token`: (será preenchido após login)

---

## ⚠️ Erros Comuns

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```
**Solução**: Adicione o header `Authorization: Bearer TOKEN`

### 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email"
    }
  ]
}
```
**Solução**: Verifique os dados enviados

### 500 Internal Server Error
```json
{
  "error": "Failed to register user"
}
```
**Solução**: Verifique os logs da API e configuração do Firebase

---

## 📝 Notas

- Todos os endpoints retornam JSON
- Tokens devem ser enviados no header `Authorization: Bearer TOKEN`
- O token é do tipo Firebase Custom Token
- Erros de validação retornam status 400 com array de erros
- Erros de autenticação retornam status 401
- Erros internos retornam status 500
