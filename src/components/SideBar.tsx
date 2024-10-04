import AddEditBoard from "../modals/AddEditBoard";
import { setBoardActive } from "../redux/boardsSlice";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";


export default function SideBar() {
  const dispatch = useDispatch();
  const boardsList = useSelector((state: RootState) => state.boards);
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <div
      className={
        theme == "dark"
          ? "min-w-[250px] bg-gray-800 text-white px-4 hidden md:flex flex-col"
          : "min-w-[250px] bg-white px-4 hidden md:flex flex-col h-screen"
      }
    >
      <h1 className="tracking-widest py-2">All Borads</h1>
      {boardsList.map((board, idx) => (
        <div
          className={`p-3 flex justify-center align-center hover:bg-sky-100 hover:!text-sky-600 text-gray-500 capitalize rounded cursor-pointer my-2     ${
            board.isActive ? " bg-sky-600 !text-white" : null
          } `}
          key={idx}
          onClick={() => dispatch(setBoardActive({ idx }))}
        >
          <h1>{board.name}</h1>
        </div>
      ))}
      {/* <NewBoardModal/> */}
      <AddEditBoard type={""} />
    </div>
  );
}
