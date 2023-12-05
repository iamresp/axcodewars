import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateTaskModal } from '../../widgets/CreateTaskModal';
import Button from '@mui/material/Button';
import { TaskCard } from '../../entities/TaskCard';
import api from '../../shared/service/axios/axiosClient';
import Typography from '@mui/material/Typography';

import { Loading } from '../../shared/components/Loading';
import { noData } from './tasksPage.model';
import { Header } from '../../widgets/Header';
import { useAuth } from '../../shared/hooks/useAuth';

export const TasksPage = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoading, isAuth, user } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClick = (id) => {
    navigate('/tasks/' + id);
  };

  const GetTasks = () => {
    api
      .get('/tasks', { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        setTasks(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!isLoading) {
      GetTasks();
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading && <Loading />}
      <Header onClick={handleOpen} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '16px 0'
        }}
      >
        {(!tasks.data || tasks.data.length === 0) && (
          <Typography variant='h5' component='div'>
            {noData}
          </Typography>
        )}
        {tasks.data &&
          tasks.data.map((el) => {
            return (
              <TaskCard
                onClick={() => {
                  handleClick(el.uuid);
                }}
                key={el._id}
                title={el.title}
                description={el.description}
              />
            );
          })}
      </div>
      <CreateTaskModal taskFoo={GetTasks} open={open} close={setOpen} />
    </div>
  );
};
