import { BattleWidget } from "../widgets/battle";
import "./styles/pages.css";
import { task } from "./dummy-data";

const GamePage = () => {
  return (
    <div className="battle-container">
      <h1 className="battle-task-title">{task.title}</h1>
      <div className="battle-task-description">{task.description}</div>
      <BattleWidget />
    </div>
  );
};

export default GamePage;
