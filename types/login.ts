export interface LoginPageProps {
  login: (email: string, pass: string) => void;
  isAuthenticating: boolean;
  authError: string | null;
  t: any;
}