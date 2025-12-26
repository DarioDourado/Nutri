import { User } from "./user";

export interface ProfileProps {
  user: User;
  onUpdateUser: (user: User) => void;
  t: any;
}