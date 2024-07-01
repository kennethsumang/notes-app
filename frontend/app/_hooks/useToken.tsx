import { useSessionStorage } from "@mantine/hooks";

export default function useToken() {
  const [token, setToken, removeToken] = useSessionStorage<string|null>({
    key: 'token',
    defaultValue: null,
  });

  return { token, setToken, removeToken };
}