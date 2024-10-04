import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { deleteBoard, deleteTask } from "../redux/boardsSlice";

type menuProp = {
  name: string;
  colIndex?: number;
  taskTitle?: string;
};

export default function LongMenu({ name, colIndex, taskTitle }: menuProp) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  function clickHandler() {
    if (name == "board") {
      dispatch(deleteBoard());
    } else {
      dispatch(deleteTask({ colIndex, taskTitle }));
    }
  }

  return (
    <div className="">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon color="primary" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={clickHandler}>
        <p className="text-red-500">delete {name}</p>
        </MenuItem>
      </Menu>
    </div>
  );
}
