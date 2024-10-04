import { Column } from "./Column";
import SideBar from "./SideBar";
import AddEditBoard from "../modals/AddEditBoard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import NavBar from "./navBar";

type BoardType = {
  name?: string;
};

export function Board({ name }: BoardType) {
  const boardList = useSelector((state: RootState) => state.boards);
  const theme = useSelector((state: RootState) => state.theme);
  const columns = boardList.find((board) => board.name == name)?.columns;

  return (
    <div
      className={
        theme == "dark" ? "board h-auto  bg-gray-900" : "board   bg-sky-50"
      }
    >
      <NavBar name={name} />
      <div className="flex md:h-screen h-auto">
        <SideBar />
        <div
          className={
            theme == "dark"
              ? "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 p-3 bg-gray-900 w-full"
              : "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 p-3 bg-blue-50 w-full"
          }
        >
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
