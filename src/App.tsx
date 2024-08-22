import { useSelector } from "react-redux";
import { Board } from "./components/Board";
import { RootState } from "./redux/store";
import NewBoardModal from "./modals/newBoardModal";
function App() {
  const boardsList = useSelector((state: RootState) => state.boards);

  
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
