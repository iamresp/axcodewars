import { Input } from "antd";
import { ChangeEvent, useState } from "react";
import { LoginCard } from "../../shared/api/components/cards/LoginCard/LoginCard.tsx";
import { RegisterUser } from "../../features/register";

interface CredentialsState {
  login: string;
  password: string;
}

export function RegisterWidget() {
  const [credentials, setCredentials] = useState<CredentialsState>({
    login: "",
    password: "",
  });

  const handleChangeField =
    (field: keyof CredentialsState) => (e: ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <LoginCard title="Регистрация">
      <Input
        placeholder="Придумайте логин"
        onChange={handleChangeField("login")}
        value={credentials.login}
      />
      <Input
        placeholder="Придумайте пароль"
        onChange={handleChangeField("password")}
        value={credentials.password}
        type="password"
      />
      <RegisterUser
        disabled={!(credentials.login && credentials.password)}
        username={credentials.login}
        hash={credentials.password}
        avatar="https://example.com/default-avatar.png"
      />
    </LoginCard>
  );
}
