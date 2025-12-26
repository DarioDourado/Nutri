import { Language } from "@google/genai";
import { User } from "./user";

export interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  t: any;
}