import * as React from "react";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { Subtask } from "./Subtask";
import { Select } from "@mui/joy";
import { Option } from "@mui/joy";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Subtask = {
  title: string;
  isCompleted: boolean;
};

type taskProp = {
  name: string;
  subtasks: Subtask[];
  colIndex: number;
};

export default function Task({ name, subtasks, colIndex }: taskProp) {
  const [open, setOpen] = React.useState<boolean>(false);

  const boardList = useSelector((state: RootState) => state.boards);
  const theme = useSelector((state: RootState) => state.theme);
  const columns = boardList.find((board) => board.isActive == true)?.columns;
  const tasks = columns?.find((_col, i) => i == colIndex)?.tasks;
  const task = tasks?.find((task) => task.title == name);
  const ticked = subtasks.filter((sub) => sub.isCompleted == true);

  return (
    <React.Fragment>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        <div
          className={`shadow-sm rounded hover:text-sky-600 p-3 my-2   ${
            theme == "dark" ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          <h1>{name}</h1>
          <p className="text-xs text-gray-500">
            {`${ticked.length} of ${subtasks.length} `}subtasks
          </p>
        </div>
      </div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            outline: "none",
            border:'none'
          }}
          className={theme == 'dark' ? '!bg-gray-800 !text-white':'bg-white'}>
          <Box sx={{ borderRadius: 5 }}>
            <form action="">
              <div className="flex">
                <h1 className="capitalize text-md font-bold">{name}</h1>
                <button></button>
              </div>
              <div className="my-2">
                <p className="text-gray-500">{task?.description}</p>
                <p className="py-2 tracking-widest text-sm">subtasks</p>
                {subtasks.map((sub, idx) => (
                  <Subtask
                    name={sub.title}
                    key={idx}
                    colIndex={colIndex}
                    taskTitle={name}
                  />
                ))}
              </div>
              <label htmlFor="" className="py-2 tracking-widest text-sm">
                current status
              </label>
              <Select>
                {columns?.map((col, idx) => (
                  <Option value={col.name} key={idx}>
                    {col.name}
                  </Option>
                ))}
              </Select>
            </form>
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
