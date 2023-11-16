import { ReactNode } from "react";
import { Space, Typography } from "antd";
import "./login-styles.css";

interface Props {
  children: ReactNode;
  title: string;
}

export function LoginCard({ children, title }: Props) {
  return (
    <div className="login-card">
      <Space direction="vertical" className="login-items-container">
        <Typography.Title level={2}>{title}</Typography.Title>
        {children}
      </Space>
    </div>
  );
}
