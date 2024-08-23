import { useDispatch, useSelector } from "react-redux";
import { Board } from "./components/Board";
import { RootState } from "./redux/store";
import {NewBoardModal} from "./modals/newBoardModal";
import { useEffect } from "react";
import { setBoardActive } from "./redux/boardsSlice";
function App() {
  const boardsList = useSelector((state: RootState) => state.boards);
  const board = boardsList.find((board)=> board.isActive)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if (!board && boardsList.length > 0)
      dispatch(setBoardActive({idx:0}))
  })
  
  return (
    <div>
      {boardsList.length == 0 ? <NewBoardModal /> : null}
      {boardsList.map((board , idx) => {
        if (board.isActive === true) {
          return <Board name={board.name} key={idx} />;
        }
      })}
    </div>
  );
}

export default App;
