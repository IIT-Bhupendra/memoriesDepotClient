import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Skeleton from '@mui/material/Skeleton';
import useStyles from "./style";

export const PostSkeleton = () => {
    const classes = useStyles();
  return (
    <Card className={classes.card} style={{ borderRadius: "24px" }}>      
        <CardHeader
            avatar={<Skeleton animation="wave" variant="circular" width={42} height={42} style={{margin: '0 0 0 8px'}} />}
            title={<Skeleton animation="wave" height={24} width="24%" sx={{ marginBottom: '2px' }} />}
            subheader={<Skeleton animation="wave" height={14} width="25%" />}
        />

        <Skeleton sx={{ height: '37vh' }} animation="wave" variant="rectangular" />

        <div className={classes.botBox}>
            <Skeleton animation="wave" height={24} width="30%" />
            <Skeleton animation="wave" height={12}  style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={12}  style={{ marginBottom: 6 }} />
        </div>      
    </Card>
  )
}
