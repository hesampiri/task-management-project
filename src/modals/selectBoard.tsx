import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddEditBoard from "../modals/AddEditBoard";
import { setBoardActive } from "../redux/boardsSlice";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  height:250,
  bgcolor: "background.paper",
  outline: 0,
};

export default function SelectBoard({ name }: { name?: string }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const boardsList = useSelector((state: RootState) => state.boards);
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <div className="ml-2">
      <h1 onClick={handleOpen}>
        {name}
        <KeyboardArrowDownIcon />
      </h1>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className={
              theme == "dark"
                ? " bg-gray-800 text-white  px-4 sm:flex flex-col "
                : " bg-white px-4  sm:flex flex-col"
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
        </Box>
      </Modal>
    </div>
  );
}
