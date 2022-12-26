import React, {useState} from 'react'
import { Box, Button, Modal, Typography, IconButton, CardMedia } from '@mui/material'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import Form from '../Form/Form'
import smp from "../../images/sideModalPic.jpg"
import useStyles from './style'

const MemoForm = ({btnText, postId=null, setCurrentId=null}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [sideMemoPic, setSideMemoPic] = useState(smp)
    const classes = useStyles();
  return (
    <>
        {postId ? (
            <IconButton
                size="small"
                onClick={() => setModalOpen(!isModalOpen)}
            >
                <ModeEditOutlinedIcon />
            </IconButton>
        ) : (
            <Button onClick={() => setModalOpen(!isModalOpen)}>
                <Typography>{btnText}</Typography>
            </Button>
        )}
        <Modal
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={classes.modal}
        >
            <Box className={classes.box}>
                <Form currentId={postId} setCurrentId={setCurrentId} setModalOpen={setModalOpen} setSideMemoPic={setSideMemoPic}/>
                <CardMedia component="img" alt="side memo pic" image={sideMemoPic} className={classes.sideMemoPic} />
            </Box>
        </Modal>
    </>
  )
}

export default MemoForm