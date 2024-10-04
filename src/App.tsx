import { useDispatch, useSelector } from "react-redux";
import { Board } from "./components/Board";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { setBoardActive } from "./redux/boardsSlice";
import AddEditBoard from "./modals/AddEditBoard";
function App() {
  const boardsList = useSelector((state: RootState) => state.boards);
  const board = boardsList.find((board) => board.isActive);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!board && boardsList.length > 0) dispatch(setBoardActive({ idx: 0 }));
  });

  return (
    <div className="app">
      {boardsList.length == 0 ? <AddEditBoard type={""} /> : null}
      {boardsList.map((board, idx) => {
        if (board.isActive === true) {
          return <Board name={board.name} key={idx} />;
        }
      })}
    </div>
  );
}

export default App;
