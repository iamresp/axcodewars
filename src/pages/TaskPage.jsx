import { useEffect, useRef, useState } from "react";
import api from "../shared/service/axios/axiosClient";
import Loading from "../components/Loading";
import { useAuth } from "../shared/hooks/useAuth";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TimerCustom from "../components/TimerCustom";
import { useNavigate, useParams } from "react-router-dom";
import taskService from "../shared/services/task/task.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const taskTime = 150000;

const TaskPage = () => {
  const { id } = useParams();

  const socket = useRef();
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();

  const [isConnected, setIsConnected] = useState(false);
  const [isOpponent, setIsOpponent] = useState(false);
  const [code, setCode] = useState("");
  const [opponentCode, setOpponentCode] = useState("");
  const [taskData, setTaskData] = useState({});
  const [rightResult, setRightResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [opponentAttempts, setOpponentAttempts] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [gameMessage, setGameMessage] = useState("");
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      api
        .get("/tasks/" + id, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          console.log("res", res);
          setTaskData(res.data);
          setRightResult(res.data.results[0][1]);
        })
        .catch(function (error) {});
    }
  }, [isLoading]);

  // const getTasks = async () => {
  //   const data = await taskService.getTasks();
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getTasks();
  // }, []);

  function connect() {
    socket.current = new WebSocket("ws://134.0.116.26:4442");

    socket.current.onopen = () => {
      setIsConnected(true);
      const message = { event: "ready" };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.event) {
        case "connect":
          break;
        case "pair":
          setIsOpponent(true);
          break;
        case "ready":
          break;
        case "pull":
          setOpponentCode(message.data);
          break;
        case "attempt":
          setOpponentAttempts((opponentAttempts) => opponentAttempts + 1);
          break;
        case "lose":
          setGameMessage(`Вы проиграли, было ${attempts} попыток!`);
          setOpen(true);
          break;
        case "disconnect":
          setIsConnected(false);
          setIsOpponent(false);
          socket.current.close();
          socket.current = null;
          break;
        default:
          break;
      }
    };
    socket.current.onclose = () => {};
    socket.current.onerror = () => {};
  }

  const sendCode = (evn) => {
    setCode(evn.target.value);
    const message = {
      event: "push",
      data: evn.target.value,
    };
    socket.current.send(JSON.stringify(message));
  };

  const handleAttempt = async () => {
    const message = { event: "attempt" };
    socket.current.send(JSON.stringify(message));
    setAttempts(attempts + 1);
  };

  const handleWin = async () => {
    const message = { event: "win" };
    socket.current.send(JSON.stringify(message));
    setGameMessage(`Вы победили с ${attempts} попытки!`);
    setOpen(true);
  };

  const handleDecline = async () => {
    const message = { event: "decline" };
    socket.current.send(JSON.stringify(message));
  };

  const handleDisconnect = async () => {
    const message = { event: "decline" };
    socket.current.send(JSON.stringify(message));
    setIsConnected(false);
    setIsOpponent(false);
    socket.current.close();
    socket.current = null;
    navigate("/tasks");
  };

  const isTimeOutLose = () => {
    setGameMessage(`Вы проиграли, было ${attempts} попыток!`);
    setOpen(true);
  };

  const handleValidateCode = async (timeout = false) => {
    let result = null;

    try {
      result = eval(code);
    } catch (e) {}

    handleAttempt();

    if (result && result !== code) {
      if (result.toString() === rightResult) {
        await handleWin();
        setMessage("Результат выполнения совпал с ответом");
      } else {
        if (timeout) {
          isTimeOutLose();
          return;
        }
        setMessage("Результат выполнения не совпал с ответом");
      }
    } else {
      if (timeout) {
        isTimeOutLose();
        return;
      }
      setMessage("Ошибка в коде");
    }
  };

  useEffect(() => {
    if (timer) {
      handleValidateCode(timer);
    }
  }, [timer]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isOpponent) {
    return (
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          height: "100vh",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={connect}
          disabled={isConnected}
        >
          Присоединиться
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/tasks")}
        >
          Выйти
        </Button>
        {isConnected && <CircularProgress />}
        {isConnected && (
          <Typography component="div" variant="h6">
            Ждем подключение второго пользователя
          </Typography>
        )}
      </Grid>
    );
  }

  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        padding: "20px",
      }}
    >
      <Grid
        item
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" onClick={handleDisconnect}>
          Выйти
        </Button>
      </Grid>
      <Card sx={{ minWidth: 275, width: "100%", mt: "10px" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Название: {taskData.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Описание задачи: {taskData.description}
          </Typography>
          <Typography variant="body2">
            Вводимые значения: {taskData.results[0][0]}
          </Typography>
          <TimerCustom millySec={taskTime} setTime={setTimer} />
        </CardContent>
      </Card>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ minHeight: "500px", mt: "10px" }}
      >
        <Grid item xs={6}>
          <CodeEditor
            value={code}
            language="js"
            placeholder="Ваш код"
            onChange={(evn) => sendCode(evn)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              minHeight: "500px",
            }}
          />
          <Button
            variant="contained"
            onClick={() => handleValidateCode()}
            sx={{ mt: "10px" }}
          >
            Проверить код
          </Button>
          {message.length > 0 && (
            <Alert
              severity="info"
              sx={{
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: "500",
                textTransform: "uppercase",
                maxWidth: "300px",
                mt: "10px",
              }}
            >
              {message}
            </Alert>
          )}
        </Grid>
        <Grid item xs={6}>
          <CodeEditor
            value={opponentCode}
            language="js"
            placeholder="Код оппонента"
            disabled={true}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              minHeight: "500px",
            }}
          />
          <Typography variant="h5" component="div" sx={{ mt: "10px" }}>
            Ваши попытки: {attempts}
          </Typography>
          <Typography variant="h5" component="div">
            Попытки оппонента: {opponentAttempts}
          </Typography>
        </Grid>
      </Grid>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {gameMessage}
          </Typography>
          <Button
            onClick={() => navigate("/tasks")}
            variant="contained"
            sx={{ mt: "10px" }}
          >
            Вернуться к списку
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default TaskPage;
