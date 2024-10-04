import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { Input } from "@mui/joy";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { addBoard, editBoard } from "../redux/boardsSlice";
import Task from "../components/Task";

type Subtask = {
  title: string;
  isCompleted: boolean;
};

type Task = {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
};

type Column = {
  name: string;
  tasks: Task[];
};

type tempType = Column[];

type propType = {
  type: string;
};

export default function AddEditBoard({ type }: propType) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [boardInput, setboardInput] = useState<string | undefined>("");
  const [themeclass, setthemeclass] = useState("bg-sky-100");

  const boardsList = useSelector((state: RootState) => state.boards);
  const theme = useSelector((state: RootState) => state.theme);
  const board = boardsList.find((board) => board.isActive === true);

  const dispatch = useDispatch();

  const initialTempColumns: tempType = [
    {
      name: "todo",
      tasks: [
        {
          title: "Task 1",
          description: "Do something",
          status: "todo",
          subtasks: [],
        },
      ],
    },
  ];

  const [tempColumns, settempColumns] = useState<tempType>(initialTempColumns);

  useEffect(() => {
    if (type == "edit" && board) {
      setboardInput(board.name);
      settempColumns(board.columns);
    }
  }, [type, board]);

  function deleteinput(id: number | undefined) {
    const updatedList = tempColumns?.filter((_col, i) => i !== id);
    settempColumns(updatedList);
  }

  function changeHandler(id: number | undefined, newValue: string) {
    settempColumns((prevState) => {
      const newsState = [...prevState];
      const column = newsState.find((_col, i) => i === id);
      column ? (column.name = newValue) : null;
      return newsState;
    });
  }

  function onSubmit(type: string) {
    if (type == "edit") {
      dispatch(editBoard({ tempColumns, boardInput }));
    } else {
      dispatch(addBoard({ tempColumns, boardInput }));
    }
  }

  useEffect(() => {
    if (theme == "dark") {
      setthemeclass("bg-gray-800");
    } else {
      setthemeclass("bg-sky-100");
    }
  });

  return (
    <React.Fragment>
      {type == "edit" ? (
        <div
          className={`${themeclass} hover:shadow-md rounded flex justify-center items-center cursor-pointer col-span-1 h-[100px] sm:h-full mx-3 `}
          onClick={() => setOpen(true)}
        >
          <p className="text-xl font-semibold text-gray-500">+ New Column</p>
        </div>
      ) : (
        <div
          className="flex justify-center items-center cursor-pointer p-3 rounded text-sky-600 m-4"
          onClick={() => setOpen(true)}
        >
          <h1>+Create New Board</h1>
        </div>
      )}
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
            maxWidth: 400,
            marginInline: 5,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            outline: "none",
            border: "none",
          }}
          className={theme == "dark" ? "!bg-gray-800 !text-white" : "bg-white"}
        >
          <h1 className="capitalize">
            {type == "edit" ? "edit borad" : "create  board"}
          </h1>
          <label htmlFor="">Board Name</label>
          <Input
            value={boardInput}
            onChange={(e) => setboardInput(e.target.value)}
            autoFocus
            required
          />
          <label htmlFor="">Borad Columns</label>
          {tempColumns?.map((col, idx) => {
            return (
              <div className="flex" key={idx}>
                <Input
                  sx={{ flexGrow: 1, marginTop: 1 }}
                  value={col.name}
                  onChange={(e) => {
                    changeHandler(idx, e.target.value);
                  }}
                />
                <button className="p-1" onClick={() => deleteinput(idx)}>
                  <ClearIcon sx={{ color: "gray" }} />
                </button>
              </div>
            );
          })}
          <Button
            sx={{ width: "100%", marginBlock: 2 }}
            onClick={() => {
              settempColumns((state) => [
                ...state,
                { name: "", tasks: [], id: tempColumns.length },
              ]);
            }}
          >
            + Add New Column
          </Button>
          <Button
            sx={{ width: "100%" }}
            onClick={() => {
              onSubmit(type);
              setOpen(false);
            }}
            type="submit"
          >
            save changes
          </Button>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
