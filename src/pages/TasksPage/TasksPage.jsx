import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCustom from "../../components/Modal/Modal";
import Button from "@mui/material/Button";
import TaskCard from "../../components/TaskCard";
import api from "../../shared/service/axios/axiosClient";
import Typography from "@mui/material/Typography";

import Loading from "../../components/Loading";
import { noData } from "./tasksPage.model";
import Header from "../../components/Header/Header";
import { useAuth } from "../../shared/hooks/useAuth";
import userService from "../../shared/services/user/user.service";
import taskService from "../../shared/services/task/task.service";

const TasksPage = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoading, isAuth, user } = useAuth();

  const handleOpen = () => setOpen(true);

  const handleClick = (id) => {
    navigate("/tasks/" + id);
  };

  const GetTasks = () => {
    api
      .get(`/tasks`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => setTasks(res))
      .catch(function (error) {});
  };

  useEffect(() => {
    if (!isLoading) {
      GetTasks();
    }
  }, [isLoading]);

  // const getUser = async () => {
  //   const data = await userService.getUser();
  //   console.log(data);
  // };

  // const editUser = async (data) => {
  //   await userService.editUser(data);
  // };

  // const getConnectUser = async (id) => {
  //   const data = await userService.getConnectUser(id);
  //   console.log(data);
  // };

  // const createTask = async (data) => {
  //   await taskService.createTask(data);
  //   console.log(data);
  // };

  // const getTaskById = async (id) => {
  //   const data = await taskService.getTaskById(id);
  //   console.log(data);
  // };

  return (
    <div>
      {/* <button
        onClick={() => getTaskById("e7cd0d2a-9b37-4809-9c7f-5db2d37e7886")}
      >
        qwe
      </button> */}
      {/* <button onClick={() => getUser()}>qwe</button> */}
      {isLoading && <Loading />}
      <Header onClick={handleOpen} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "16px 0",
        }}
      >
        {(!tasks.data || tasks.data.length === 0) && (
          <Typography variant="h5" component="div">
            {noData}
          </Typography>
        )}
        {tasks.data &&
          tasks.data.map((el) => {
            return (
              <TaskCard
                onClick={() => handleClick(el.uuid)}
                key={el._id}
                title={el.title}
                description={el.description}
              />
            );
          })}
      </div>
      <ModalCustom taskFoo={GetTasks} open={open} close={setOpen} />
    </div>
  );
};

export default TasksPage;
