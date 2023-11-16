import {Input, Space, Typography, Button} from "antd";
import { ChangeEvent, useState } from "react";


export function CreateTaskWidget() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState({})
  const [initial, setInitial] = useState("")
  const [correct, setCorrect] = useState("")
  const [tasks, setTasks] = useState([])
 
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };


  return (
    <Space direction="vertical" style={{padding: '100px', background:"white", borderRadius: '20px', display: "flex", flexDirection:"column", gap
    : "25px"}}>
      <Typography.Title>Создание задачи</Typography.Title>
      <h1 style={{fontFamily:"monospace", fontWeight: 300}}>Язык программирования - JS</h1>
      <Input
        placeholder="Введите направление"
        onChange={handleChangeTitle}
        value={title}
      />
      
      
      <Input
        placeholder="Описание"
        onChange={handleChangeDescription}
        value={description}
      />

<Button type='primary' style={{background: "#F37022"}}>Создать</Button>
    </Space>
  );
}
