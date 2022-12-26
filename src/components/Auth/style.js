import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    borderRadius: "24px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  input: {
    borderRadius: "16px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: "16px",
    padding: "8px"
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    borderRadius: "16px",
    padding: "8px"
  },
}));
