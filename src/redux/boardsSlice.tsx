import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import data from "../data.json";


const boardsSlice = createSlice({
  name: "boards",
  initialState: data.boards,
  reducers: {
    addBoard: (state, action) => {
      if (state) {
        const payload = action.payload;
        const isActive = state.length > 0 ? false : true;
        const board = {
          name: payload.boardInput,
          isActive,
          columns: [],
        };
        board.columns = payload.tempColumns;
        state.push(board);
      }
    },

    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.idx
          ? (board.isActive = true)
          : (board.isActive = false);
      });
    },

    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive === true);
      if (board) {
        board.name = payload.boardInput;
        board.columns = payload.tempColumns;
      }
    },

    addTask: (state, action) => {
      const columnName = action.payload.selectedColumn;
      const taskName = action.payload.taskName;
      const desc = action.payload.desc;
      const subtasks = action.payload.subtasks;
      const task = {
        title: taskName,
        description: desc,
        status: columnName,
        subtasks: subtasks,
      };
      const board = state.find((board) => board.isActive === true);
      const col = board?.columns?.find((col) => col.name === columnName);
      col?.tasks.push(task);
    },

    subtaskchange: (state, action) => {
      const colIndex = action.payload.colIndex;
      const taskTitle = action.payload.taskTitle;
      const subName = action.payload.name;
      const board = state.find((board) => board.isActive === true);
      const column = board?.columns?.find((_col, i) => i === colIndex);
      const task = column?.tasks?.find((task) => task.title === taskTitle);
      const subtask = task?.subtasks.find((sub) => sub.title === subName);
      subtask ? (subtask.isCompleted = true) : null;
    },
  },
});

export const {
  addBoard,
  editBoard,
  setBoardActive,
  addTask,
  subtaskchange,
} = boardsSlice.actions;

export const selectBoard = (state: RootState) => state.boards;

export default boardsSlice.reducer;
