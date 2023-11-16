import { Routes, Route } from "react-router-dom";

import CreateTaskPage from "../pages/CreateTaskPage";
import GamePage from "../pages/GamePage";
import TasksPage from "../pages/TasksPage";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage.tsx";
import { Protected } from "./routing/Protected";
import { ConfigProvider } from "antd";

export default function App() {
  return (
    <div style={{ background: "#F37022", height: "100vh" }}>
      <ConfigProvider>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/tasks"
            element={
              <Protected>
                <TasksPage />
              </Protected>
            }
          />
          <Route path="/create-task" element={<CreateTaskPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
}
