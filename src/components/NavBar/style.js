import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    alignItems: "center",
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    justifyContent: "space-between",
    margin: "25px 0",
    maxWidth: "1536px",
    padding: "8px 36px",
    position: "sticky",
    top: 8,
    zIndex: 100,
    [theme.breakpoints.down('sm')]: {
      padding: "8px 16px",
    }
  },
  heading: {
    color: "rgb(43,66,114)",
    fontWeight: 'bold',
    textDecoration: "none",
    [theme.breakpoints.down('xs')]: {
      fontSize: "36px",
    }
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 0,
    // width: "140px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
    // width: "400px",
  },
  userName: {
    alignItems: "center",
    display: "flex",
    [theme.breakpoints.down('xs')]: {
      display: "none",
    }
  },
  brandContainer: {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
  },
  purple: {
    backgroundColor: deepPurple[500],
    color: theme.palette.getContrastText(deepPurple[500]),
    cursor: "pointer",
  },
  logout1: {
    backgroundColor: "gray", 
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#lightgray", 
      color: "gray",
    },
    [theme.breakpoints.up('sm')]: {
      display: "none",
    }
  },
  logout2: {
    borderRadius: '12px',
    [theme.breakpoints.down('xs')]: {
      display: "none",
    }
  },
  menu: {
    alignItems: 'center',
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "24px",
    display: 'flex',
    gap: '8px',
    textAlign: 'center',
  },
  userMenu: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
  }
}));
