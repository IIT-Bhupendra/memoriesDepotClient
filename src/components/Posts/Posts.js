import React, {useState, useEffect} from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import { PostSkeleton } from "./Post/PostSkeleton";
import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const upMd = useMediaQuery('(min-width:1080px)');
  const upSm = useMediaQuery('(min-width:600px)');

  if(!posts.length)
    return (
      <Grid
        className={classes.mainContainer}
        container
        alignItems="stretch"
        spacing={4}
      >
        {[...Array(6)].map((_, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
            <PostSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  
  else
    // return (
    //   <Grid
    //     className={classes.mainContainer}
    //     container
    //     alignItems="stretch"
    //     spacing={4}
    //   >
    //     {posts.map((post, index) => (
    //       <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
    //         <Post post={post} setCurrentId={setCurrentId} />
    //       </Grid>
    //     ))}
    //   </Grid>
    // );

    return (
      <Masonry columns={!upMd ? (!upSm ? 1 : 2) : 3} spacing={2} style={{ margin: 0 }}>
        {posts.map((post, index) => (
          <Paper key={index} border style={{borderRadius: 24}}>
            <Post key={index} post={post} setCurrentId={setCurrentId}/>
          </Paper>
        ))}
      </Masonry>
    );
};

export default Posts;
