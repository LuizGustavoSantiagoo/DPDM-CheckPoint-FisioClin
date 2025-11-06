import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

interface User {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    funcao: string;
    crefito: string;
    status?: string;
}

export async function setAuth(token: string, user: User): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  await SecureStore.setItemAsync("id", user.id.toString());
  await SecureStore.setItemAsync("nome", user.nome);
  await SecureStore.setItemAsync("sobrenome", user.sobrenome);
  await SecureStore.setItemAsync("email", user.email);
  await SecureStore.setItemAsync("funcao", user.funcao);
  await SecureStore.setItemAsync("crefito", user.crefito);
}

export async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function getUser<T = User>(): Promise<T | null> {
  const raw = await SecureStore.getItemAsync(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

// Clear auth data
export async function clearAuth(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
}

// Quick check
export async function isAuthenticated(): Promise<boolean> {
  const token = await getToken();
  return !!token;
}
