import { Column } from "./Column";
import SideBar from "./SideBar";
import AddtaskModal from "../modals/taskmodal";
import AddEditBoard from "../modals/AddEditBoard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleTheme } from "../redux/themSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

type BoardType = {
  name?: string;
};

export function Board({ name }: BoardType) {
  const boardList = useSelector((state: RootState) => state.boards);
  const theme = useSelector((state: RootState) => state.theme);
  const columns = boardList.find((board) => board.name == name)?.columns;
  const dispatch = useDispatch();

  return (
    <div
      className={theme == "dark" ? "h-full bg-gray-900" : "h-full bg-sky-50"}
    >
      <div
        className={
          theme == "dark"
            ? "bg-gray-800 text-white p-5 flex items-center"
            : "bg-white p-5 flex items-center"
        }
      >
        <h1 className="text-2xl capitalize font-bold tracking-tighter">task manager app</h1>
        <h1 className="mr-auto capitalize text-xl font-bold ml-10">{name}</h1>
        {/* <button className="bg-blue-500 text-white rounded p-2 capitalize">+ Add new task</button> */}
        <div>
          <button onClick={() => dispatch(toggleTheme())} className="px-2 py-1 mr-3 ">{theme == 'dark' ? <DarkModeIcon />:<LightModeIcon/>}</button>
          <AddtaskModal />
          <button></button>
        </div>
      </div>
      <div className="flex h-full">
        <div className="h-full">
          <SideBar />
        </div>
        <div className="flex gap-3 h-5/6 p-3 overflow-auto">
          {columns?.length
            ? columns.map((_col, idx) => {
                return <Column key={idx} colIndex={idx} />;
              })
            : null}
          <AddEditBoard type={"edit"} />
        </div>
      </div>
    </div>
  );
}
