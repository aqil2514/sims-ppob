import { RootState } from "@/store";
import { useSelector } from "react-redux";

export function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);

  return auth;
}
