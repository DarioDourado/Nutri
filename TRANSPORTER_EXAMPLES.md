# Exemplos de Uso dos Transporters

Este documento mostra como usar os transporters para se comunicar com a API.

## Auth Transporter

### Login

```typescript
import { authTransporter } from '@/services/transporter/auth';

// Fazer login
try {
  const user = await authTransporter.login('user@example.com', 'password123');
  console.log('User logged in:', user);
  // user = { id, name, email, goal, dailyCalorieTarget, weight, height }
} catch (error) {
  console.error('Login failed:', error.message);
}
```

### Registro

```typescript
import { authTransporter } from '@/services/transporter/auth';

// Registrar novo usuário
try {
  const newUser = await authTransporter.register({
    email: 'newuser@example.com',
    name: 'João Silva',
    goal: 'lose', // 'lose', 'gain', ou 'maintain'
    weight: 80,
    height: 175,
  }, 'password123');
  
  console.log('User registered:', newUser);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

### Logout

```typescript
import { authTransporter } from '@/services/transporter/auth';

// Fazer logout
try {
  await authTransporter.logout();
  console.log('User logged out');
} catch (error) {
  console.error('Logout failed:', error.message);
}
```

### Verificar Autenticação

```typescript
import { authTransporter } from '@/services/transporter/auth';

// Verificar se está autenticado
const isAuth = authTransporter.isAuthenticated();
console.log('Is authenticated:', isAuth);

// Obter token atual
const token = authTransporter.getAuthToken();
console.log('Current token:', token);

// Obter usuário armazenado localmente
const user = authTransporter.getStoredUser();
console.log('Stored user:', user);
```

## User Transporter

### Obter Perfil

```typescript
import { userTransporter } from '@/services/transporter/user';

// Buscar perfil do usuário autenticado
try {
  const profile = await userTransporter.getProfile();
  console.log('User profile:', profile);
} catch (error) {
  console.error('Failed to fetch profile:', error.message);
}
```

### Atualizar Perfil

```typescript
import { userTransporter } from '@/services/transporter/user';

// Atualizar informações do perfil
try {
  const updatedUser = await userTransporter.updateProfile({
    name: 'João Silva Atualizado',
    goal: 'gain',
    weight: 82,
    height: 175,
    dailyCalorieTarget: 2500,
  });
  
  console.log('Profile updated:', updatedUser);
} catch (error) {
  console.error('Failed to update profile:', error.message);
}
```

### Deletar Conta

```typescript
import { userTransporter } from '@/services/transporter/user';

// Deletar conta do usuário
try {
  await userTransporter.deleteAccount();
  console.log('Account deleted successfully');
} catch (error) {
  console.error('Failed to delete account:', error.message);
}
```

## Uso em Componentes React

### Exemplo de Login Component

```typescript
import { useState } from 'react';
import { authTransporter } from '@/services/transporter/auth';

export function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await authTransporter.login(email, password);
      console.log('Logged in:', user);
      // Redirecionar para dashboard ou home
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
```

### Exemplo de Profile Component

```typescript
import { useState, useEffect } from 'react';
import { userTransporter } from '@/services/transporter/user';
import { User } from '@/types/user';

export function ProfileComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await userTransporter.getProfile();
      setUser(profile);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updates: Partial<User>) => {
    try {
      const updated = await userTransporter.updateProfile(updates);
      setUser(updated);
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div>
      <h2>Perfil</h2>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Objetivo: {user.goal}</p>
      <p>Peso: {user.weight} kg</p>
      <p>Altura: {user.height} cm</p>
      <button onClick={() => setEditing(true)}>Editar</button>
    </div>
  );
}
```

### Exemplo com Custom Hook

```typescript
// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authTransporter } from '@/services/transporter/auth';
import { User } from '@/types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se há usuário armazenado
    const storedUser = authTransporter.getStoredUser();
    const isAuth = authTransporter.isAuthenticated();
    
    setUser(storedUser);
    setIsAuthenticated(isAuth);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const loggedUser = await authTransporter.login(email, password);
    setUser(loggedUser);
    setIsAuthenticated(true);
    return loggedUser;
  };

  const logout = async () => {
    await authTransporter.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData: Partial<User>, password: string) => {
    const newUser = await authTransporter.register(userData, password);
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
  };
}

// Uso no componente:
import { useAuth } from '@/hooks/useAuth';

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div>
      <h1>Bem-vindo, {user?.name}</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

## Tratamento de Erros

Todos os transporters lançam erros com mensagens amigáveis. Sempre use try-catch:

```typescript
try {
  // Operação
  const result = await authTransporter.login(email, password);
} catch (error: any) {
  // Exibir erro para o usuário
  console.error(error.message);
  
  // Verificar tipo de erro
  if (error.message.includes('autenticado')) {
    // Redirecionar para login
  } else if (error.message.includes('Credenciais inválidas')) {
    // Mostrar mensagem de credenciais incorretas
  } else {
    // Erro genérico
  }
}
```

## Notas Importantes

1. **Tokens**: Os tokens são salvos automaticamente no localStorage após login/registro
2. **Autenticação**: Use `authTransporter.isAuthenticated()` para verificar o estado de autenticação
3. **Renovação de Token**: Implemente lógica para renovar tokens expirados
4. **Erros 401**: Sempre redirecione para login quando receber erro de não autenticado
5. **Segurança**: Nunca exponha tokens no console em produção
