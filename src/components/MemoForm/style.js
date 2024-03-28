import { makeStyles } from "@material-ui/core/styles";
// import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    boxShadow: 24,
    borderRadius: "24px",
    display: "flex",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      display: "flex-col",
      flexDirection: "column-reverse",
      minWidth: "78vw",
    }
  },
  sideMemoPic: {
    width: "30vw",
    [theme.breakpoints.down("sm")]: {
      width: "40vw"
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    }
  },
  closeBtn: {
    position: "absolute",
    padding: "10px",
  },
  createBtn: {
    borderRadius: "24px 0 0 24px",
    marginLeft: "6px",
    background: "rgb(43,66,114)",
    color: "white",
    "&:hover": {
      background: "rgb(43,66,184)",
    },
  }
}));
