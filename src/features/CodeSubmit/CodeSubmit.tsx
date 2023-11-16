import { Button } from "antd";
import "./style.css";

interface Props {
  handleClick: () => void;
}

export function CodeSubmit({ handleClick }: Props) {
  return (
    <Button
      size="large"
      type="primary"
      style={{ background: "#F37022" }}
      onClick={handleClick}
    >
      Отправить
    </Button>
  );
}
