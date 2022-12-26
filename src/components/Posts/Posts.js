import React, {useState, useEffect} from "react";
import { CircularProgress, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={4}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} lg={4} xl={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
