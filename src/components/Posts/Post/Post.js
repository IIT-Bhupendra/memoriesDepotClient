import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ArrowDropDownCircleRoundedIcon from '@mui/icons-material/ArrowDropDownCircleRounded';
import { IconButton, Card, CardContent, CardMedia, Typography, Tooltip, Chip} from "@mui/material";
import useStyles from "./style";
import MemoForm from "../../MemoForm/MemoForm";
import { deletePost, likePost } from "../../../actions/posts";

function Post({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      let uArePresent = false;

      post.likes.forEach((like) => {
        if (like === user?.result?.googleId || like === user?.result?._id)
          uArePresent = true;
      });

      return uArePresent === true ? (
        <>
          <FavoriteSharpIcon fontSize="small" />
          {post.likes.length > 0 && ` ${post.likes.length}`}
        </>
      ) : (
        <>
          <FavoriteBorderSharpIcon fontSize="small" style={{color: "#f91880"}} />
          {post.likes.length && `${post.likes.length}`}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderSharpIcon fontSize="small" style={{color: "#f91880"}} />
      </>
    );
  };

  const defaultPic = "data:image/png;base64,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"
  let truncatedMessage = post.message.substring(0,120)

  if(post.message.length > 120){
    truncatedMessage += "..."
  }
  const [readMore, setReadMore] = useState({expand: false, rotate: '0', message: truncatedMessage})

  const handleReadMore = () => {
    const expand = !readMore.expand
    const rotate = readMore.expand ? '0' : '180'
    const message = !readMore.expand ? post.message : truncatedMessage
    setReadMore({expand, rotate, message});
  }

  return (
    <Card className={classes.card} style={{ borderRadius: "24px" }}>
      <div className={classes.headBox}>
        <div className={classes.headOne}>
            <img src={defaultPic} className={classes.headImg} width="40px" height="40px" alt="creater avatar"/>
        </div>
        <div className={classes.headTwo}>
            <Typography variant="h6" className={classes.headUser}>{post.name}</Typography>
            <Typography variant="body2" className={classes.timestamp}>
                {moment(post.createdAt).fromNow()}
            </Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) 
          && (<div>
                <MemoForm btnText={"Edit"} postId={post?._id} />
              </div>
        )}
        {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
                <div>
                <IconButton
                    size="small"
                    color="error"
                    onClick={() => dispatch(deletePost(post._id))}
                >
                    <DeleteOutlineRoundedIcon />
                </IconButton>
            </div>
        )}
      </div>
      <div className={classes.mediaBox}>
        <CardMedia
          className={classes.media}
          // image={post.assets.images[0].url}
          image={(post.selectedFile) ? post.selectedFile : post.assets.images[0].url}
          title={post.title}
        />
        <Tooltip title="Tags" placement="left">
          <div className={classes.tags}>
            <Typography variant="body2" color="textSuccess">
              {/* {post.tags.map((tag) => `#${tag} `)} */}
              {post.tags.map((tag) => <Chip label={`#${tag}`} className={classes.tag} />)}
            </Typography>
          </div>
        </Tooltip>
      </div>

      <div className={classes.botBox}>
        {/* Post Title */}
        <div className={classes.titlelikebox}>
            <Typography className={classes.title} variant="h5" gutterBottom>
                {post.title}
            </Typography>
            {post.message.length > 120 && <Tooltip title={(readMore.expand) ? "Read Less" : "Read More"} placement="left">
              <IconButton
                size="small"
                style={{rotate: `${readMore.rotate}deg`, alignSelf: 'center'}}
                onClick={handleReadMore}
              >
                <ArrowDropDownCircleRoundedIcon fontSize="small"/>
              </IconButton>
            </Tooltip>}
            <Tooltip title={(user) ? "Like/Dislike" : "Login / Signup first"}>
              <span>
                <IconButton
                  size="small"
                  style={{color: "#f91880", fontSize: "12px", fontWeight: "bold", alignSelf: 'center'}}
                  disabled={!user?.result}
                  onClick={() => dispatch(likePost(post._id))}
                >
                    <Likes />
                </IconButton>
              </span>
            </Tooltip>
        </div>
        {/* Post Details */}
        <CardContent style={{flexGrow: 1, padding: "0"}}>
            <Typography
              className={classes.details}
              variant="body2"
              color="textSecondary"
              component="p"
              >
                {readMore.message}
            </Typography>
            {/* <a href="#">Read More</a> */}
        </CardContent>
      </div>
    </Card>
  );
}

export default Post;
