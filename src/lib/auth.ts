// Mock authentication for frontend demo
const AUTH_KEY = 'pixieguard_auth';

export interface User {
  email: string;
  name: string;
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) !== null;
}

export function getUser(): User | null {
  const stored = localStorage.getItem(AUTH_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
}

export function login(email: string, password: string): boolean {
  // Mock validation - accept any non-empty credentials
  if (email && password) {
    const user: User = {
      email,
      name: email.split('@')[0],
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return true;
  }
  return false;
}

export function register(email: string, password: string, name: string): boolean {
  // Mock registration - accept any valid input
  if (email && password && name) {
    const user: User = { email, name };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}
