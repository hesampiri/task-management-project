import { Box } from "@mui/joy";
import { Checkbox } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { subtaskchange } from "../redux/boardsSlice";
import { RootState } from "../redux/store";

type subProps = {
  name: string;
  colIndex: number;
  taskTitle: string;
};

export function Subtask({ name, colIndex, taskTitle }: subProps) {
  const dispatch = useDispatch();
  const boardList = useSelector((state: RootState) => state.boards);
  const theme = useSelector((state: RootState) => state.theme);
  const board = boardList.find((board) => board.isActive === true);
  const column = board?.columns?.find((_col, i) => i === colIndex);
  const task = column?.tasks.find((task) => task.title === taskTitle);
  const subtask = task?.subtasks.find((sub) => sub.title === name);
  const checked = subtask?.isCompleted;

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        borderRadius: 5,
        padding: 1,
        marginBlock: 0.5,
      }}
      className={theme == 'dark' ? '!bg-gray-700 !text-white':'bg-white'}>
      <Checkbox
        onChange={() => dispatch(subtaskchange({ colIndex, taskTitle, name }))}
        checked={checked}
      />
      <label htmlFor="" className="pl-2">
        {name}
      </label>
    </Box>
  );
}
