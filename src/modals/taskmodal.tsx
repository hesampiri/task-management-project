import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { FormControl, Input } from "@mui/joy";
import { Textarea } from "@mui/joy";
import { Select } from "@mui/joy";
import { Option } from "@mui/joy";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addTask } from "../redux/boardsSlice";
import { useMediaQuery } from "react-responsive";

export default function AddtaskModal() {
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [open, setOpen] = React.useState<boolean>(false);
  const [subtasks, setsubtasks] = useState([
    { name: "", isCompleted: false, id: 0 },
  ]);
  const [selectedColumn, setselectedColumn] = useState("");
  const [taskName, settaskName] = useState("");
  const [desc, setdesc] = useState("");

  const boardList = useSelector((state: RootState) => state.boards);
  const theme = useSelector((state: RootState) => state.theme);
  const columns = boardList.find((board) => board.isActive == true)?.columns;
  const dispatch = useDispatch();

  function deleteSub(id: number) {
    const updatedList = subtasks.filter((sub) => sub.id !== id);
    setsubtasks(updatedList);
  }

  function taskNameHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    settaskName(e.target.value);
  }

  function descHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setdesc(e.target.value);
  }

  function selectHandler(
    _e: React.SyntheticEvent | null,
    newvalue: string | null
  ) {
    newvalue ? setselectedColumn(newvalue) : null;
  }

  function subchangeHandler(id: number, newValue: string) {
    setsubtasks((prevState) => {
      const newsState = [...prevState];
      const subtask = newsState.find((sub) => sub.id === id);
      subtask ? (subtask.name = newValue) : null;
      return newsState;
    });
  }

  function submitHandler() {
    dispatch(addTask({ selectedColumn, desc, taskName, subtasks }));
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button
        variant="solid"
        color="neutral"
        className="hover:!bg-sky-100 hover:!text-sky-600 !bg-sky-600 !text-white"
        onClick={() => setOpen(true)}
      >
        {isBigScreen ? "+ add new task" : "+"}
      </Button>
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
            maxWidth: 450,
            width: 500,
            borderRadius: "md",
            p: 3,
            border: "none",
            outline: "none",
          }}
          className={theme == "dark" ? "!bg-gray-800 !text-white mx-5" : "bg-white"}
        >
          <FormControl>
            <h1>Add new task</h1>
            <label htmlFor="task title">Task Name</label>
            <Input autoFocus required onChange={(e) => taskNameHandler(e)} />
            <label htmlFor="">Desciption</label>
            <Textarea sx={{ height: 100 }} onChange={(e) => descHandler(e)} />
            <label htmlFor="">Subtasks</label>
            {subtasks.map((sub) => (
              <div className="flex" key={sub.id}>
                <Input
                  sx={{ flexGrow: 1, marginTop: 1 }}
                  value={sub.name}
                  onChange={(e) => subchangeHandler(sub.id, e.target.value)}
                />
                <button className="p-1" onClick={() => deleteSub(sub.id)}>
                  <ClearIcon sx={{ color: "gray" }} />
                </button>
              </div>
            ))}
            <Button
              sx={{ width: "100%", marginBlock: 2 }}
              onClick={() => {
                setsubtasks((state) => [
                  ...state,
                  { name: "", isCompleted: false, id: subtasks.length },
                ]);
              }}
            >
              + add new subtask
            </Button>
            <label htmlFor="current state">Current State</label>
            <Select
              id={"myselect"}
              onChange={selectHandler}
              value={selectedColumn}
            >
              {columns?.map((col, idx) => (
                <Option value={col.name} key={idx}>
                  {col.name}
                </Option>
              ))}
            </Select>
            <Button
              sx={{ width: "100%", marginBlock: 2 }}
              onClick={submitHandler}
              type="submit"
            >
              Create Task
            </Button>
          </FormControl>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
