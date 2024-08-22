import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { Input } from "@mui/joy";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { addBoard } from "../redux/boardsSlice";

type inputType = {
  id: number;
  value: string;
};

type inputListType = inputType[];

export default function NewBoardModal() {

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState<boolean>(false);
  const [name , setname] = React.useState('')

  const [inputList, setinputList] = React.useState<inputListType>([
    { id: 0, value: "" },
  ]);

  function inputHandler() {
    const newInput = { id: inputList.length, value: "" };
    setinputList([...inputList, newInput]);
  }

  function deleteinput(id: number) {
    const updatedList = inputList.filter((input) => input.id !== id);
    setinputList(updatedList);
  }


  return (
    <React.Fragment>
      <div
        className="flex justify-center items-center cursor-pointer p-3 rounded text-sky-600 hover:bg-sky-100"
        onClick={() => setOpen(true)}
      >
            <h1>+Create New Board</h1>
      </div>
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
            minWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            outline: "none",
          }}
        >
          <h1>create Board</h1>
          <label htmlFor="">Board Name</label>
          <Input value={name} onChange={(e)=>setname(e.target.value)} />
          <label htmlFor="">Board Columns</label>
          {inputList.map((input) => {
            return (
              <div className="flex" key={input.id}>
                <Input sx={{ flexGrow: 1, marginTop: 1 }} />
                <button className="p-1" onClick={() => deleteinput(input.id)}>
                  <ClearIcon sx={{ color: "gray" }} />
                </button>
              </div>
            );
          })}
          <Button sx={{ width: "100%", marginBlock: 2 }} onClick={inputHandler}>
            + Add New Column
          </Button>
          <Button sx={{ width: "100%" }} onClick={()=>{dispatch(addBoard({name}))
        setOpen(false)}} >Create Board</Button>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
