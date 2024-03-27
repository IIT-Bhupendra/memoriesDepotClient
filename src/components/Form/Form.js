import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import useStyles from "./style";
import smp from "../../images/sideModalPic.jpg";

import { createPost, updatePost } from "../../actions/posts";
import TagsInput from "./TagsInput";

const Form = ({
  currentId = null,
  setCurrentId,
  setModalOpen,
  setSideMemoPic,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

  const [assetData, setAssetData] = useState(null);
  const [postData, setPostData] = useState({ title: "", message: "" });
  const [tags, setTags] = useState(post ? post.tags : []);

  useEffect(() => {
    if (post) {
      if(post.selectedFile)
        setSideMemoPic(post.selectedFile);
      else
        setSideMemoPic(post.assets.images[0].url);
      setPostData(post);
    }
  }, [post, setSideMemoPic]);

  const onChangeImageHandler = (e) => {
    setAssetData(e.target.files[0]);
    setSideMemoPic(URL.createObjectURL(e.target.files[0]));
  }

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "k1ybob8j");
    data.append("folder", "memories");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dommzhmwc/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      return { status: "success", file };
    } catch (error) {
      console.log("Failed to upload image, Please try again!!")
      return { status: "failed", file: null };
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!currentId && !assetData){
      console.log("Please attach atleast one-image.")
      return;
    }

    let assets = currentId ? post.assets : null;
    if(assetData){
      const { status, file } = await uploadImage(assetData);

      if(status === "failed"){
        console.log("Failed to upload image, Please try again!!")
        return;
      }

      assets = { images: [{ public_id: file.public_id, url: file.secure_url }] };
    }

    if(!currentId) {
      try {
        dispatch(createPost({ ...postData, tags, assets, name: user?.result?.name }));
      } catch (error) {
        console.log("Failed to create memory, Please try again!!")
      }
    } else {      
      try {
        dispatch(updatePost(currentId, { ...postData, tags, assets, name: user?.result?.name }));
      } catch (error) {
        console.log("Failed to update memory, Please try again!!")
      }
    }

    setModalOpen(false);
    clear();
  };
  
  const clear = () => {
    try {
      setPostData({
        title: "",
        message: "",
      });
      setAssetData(null);
      console.log(smp)
      setSideMemoPic(smp);
      setTags([]);
    } catch (error) {
      console.log(error.message)
    }
  };

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
        <TagsInput tags={tags} setTags={setTags}/>
        <div className={classes.fileInput}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChangeImageHandler(e)}
          />
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