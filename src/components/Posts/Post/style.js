import { makeStyles } from "@material-ui/core/styles";

 export default makeStyles((theme) => ({
  details: {
    overflow: "hidden",
    // textOverflow: "ellipsis",
    // display: "-webkit-box",
    // "-webkit-line-clamp": 2,
    // "-webkit-box-orient": "vertical",    
    fontSize: "16px",
    textAlign: "justify",
  },
  card: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    borderRadius: "15px",
    height: "100%",
  },
  headBox: {
    display: "flex",
    alignItems: "center",
    padding: "8px 24px",
    gap: "8px"
  },
  // headOne: {},
  headTwo: {
    flexGrow: 1,
    alignItems: "center",
  },
  headImg: {
    width: "40px",
    paddingTop: "6px"
  },
  headUser: {
    fontSize: "16px",
  },
  timestamp: {
    fontSize: "10px",
    fontWeight: "bold"
  },
  mediaBox: {
    position: "relative",
  },
  media: {
    height: '280px',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  botBox: {
    padding: "8px 24px"
  },
  titlelikebox: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardActions: {
    padding: "0",
    display: "flex",
    justifyContent: "space-between",
  },
  tags: {
    cursor: "pointer",
    display: "flex",
    padding: "2px 6px",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    position: "absolute",
    right: "0",
    bottom: 0,
  },
  tag: {
    margin: "2px",
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(10px)",
    borderRadius: "4px",
    fontWeight: "bold",
    letterSpacing: "1px",
    color: "rgba(0, 0, 0, 0.8)",
  },
  title: {
    fontWeight: "",
    flexGrow: 1,
    marginBottom: "0",
  },
}));
