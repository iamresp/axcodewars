import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { RegisterRequest } from "../../shared/api/services/interfaces";
import { AuthService } from "../../shared/api/services/auth";

interface Props extends RegisterRequest {
  disabled?: boolean;
}

export function RegisterUser({ username, hash, disabled }: Props) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleClickRegister = async () => {
    console.log(`Попытка зарегать юзера с ${username} и ${hash}`);

    setIsLoading(true);

    try {
      await AuthService.register({
        username,
        hash,
        avatar: "https://example.com/default-avatar.png",
      });

      // Имитируем задержку
      await new Promise((res) => {
        setTimeout(res, 1000);
      });

      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Button
      loading={isLoading}
      disabled={disabled}
      type="primary"
      onClick={handleClickRegister}
    >
      Зарегистрироваться
    </Button>
  );
}
