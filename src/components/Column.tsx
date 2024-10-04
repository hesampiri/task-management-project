import Task from "./Task";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type columnProp = {
  colIndex: number;
};

export function Column({ colIndex }: columnProp) {
  const boardlist = useSelector((state: RootState) => state.boards);
  const columns = boardlist.find((board) => board.isActive === true)?.columns;
  const col = columns?.find((_col, i) => i === colIndex);
  const tasks = col?.tasks;

  return (
    <div className="p-3">
      <h2 className="tracking-widest text-gray-500 capitalize">
        {col?.name}
        {`(${tasks?.length})`}
      </h2>
      {tasks?.map((task, idx) => (
        <Task
          key={idx}
          name={task.title}
          subtasks={task.subtasks}
          colIndex={colIndex}
        />
      ))}
    </div>
  );
}
