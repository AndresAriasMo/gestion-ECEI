import { useStore } from "@/lib/mockData";

export function useAuth() {
  const user = useStore(state => state.currentUser);
  const login = useStore(state => state.login);
  const logout = useStore(state => state.logout);

  return { user, login, logout };
}
