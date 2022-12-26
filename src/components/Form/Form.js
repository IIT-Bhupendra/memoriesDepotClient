import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import FileBase from "react-file-base64";
import useStyles from "./style";

import { createPost, updatePost } from "../../actions/posts";

const Form = ({
  currentId = null,
  setCurrentId = null,
  setModalOpen,
  setSideMemoPic,
}) => {
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) {
      setSideMemoPic(post.selectedFile);
      setPostData(post);
    }
  // }, [post]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      try {
        dispatch(
          updatePost(currentId, { ...postData, name: user?.result?.name })
        );
      } catch (error) {
        console.log("Failed to update memory, Please try again!!")
      }
    } else {
      try {
        dispatch(createPost({ ...postData, name: user?.result?.name }));
      } catch (error) {
        console.log("Failed to create memory, Please try again!!")
      }
    }
    setModalOpen(false);
    clear();
  };
  const clear = () => {
    if(!currentId){
      console.log("All fields are already empty.")
    } else {
      setPostData({
        // creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
      });
      setCurrentId(null);
    }
  };
  const onDone = ({ base64 }) => {
    setPostData({ ...postData, selectedFile: base64 });
  };

  // if (!user?.result?.name) {
  //   return (
  //     <Paper className={classes.paper}>
  //       <Typography variant="h6" align="center">
  //         Please Sign In to create your memories and like other's memories.
  //       </Typography>
  //     </Paper>
  //   );
  // }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          required
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={2}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma seperated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        ></TextField>
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={onDone} required/>
        </div>
        <Button
          style={{ borderRadius: "16px" }}
          sx={{ my: 2 }}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
        >
          Submit
        </Button>
        <Button
          style={{ borderRadius: "16px" }}
          variant="contained"
          color="secondary"
          onClick={clear}
          size="large"
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
