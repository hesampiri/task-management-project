import AddtaskModal from "../modals/taskmodal";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleTheme } from "../redux/themSlice";
import Options from "./options";
import { useMediaQuery } from "react-responsive";
import SelectBoard from "../modals/selectBoard";

const NavBar = ({ name }: { name?: string }) => {
  const isBigscreen = useMediaQuery({ query: "(min-width: 768px)" });
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  return (
    <div>
      <div
        className={
          theme == "dark"
            ? "bg-gray-800 text-white p-2 sm:p-5 flex items-center "
            : "bg-white  p-2 sm:p-5 flex items-center"
        }
      >
        <h1 className="sm:text-2xl capitalize font-bold tracking-tighter hidden sm:flex">
          task manager app
        </h1>
        {isBigscreen ? (
          <h1 className="text-lg font-semibold ml-auto">{name}</h1>
        ) : (
          <SelectBoard name={name} />
        )}
        <div className="flex ml-auto">
          <button onClick={() => dispatch(toggleTheme())} className="px-2">
            {theme == "dark" ? <DarkModeIcon /> : <LightModeIcon />}
          </button>
          <AddtaskModal />
          <Options name={"board"} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
