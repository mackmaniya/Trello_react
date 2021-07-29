import React, { useState, useEffect } from 'react'
import { TextField, IconButton, Paper, makeStyles, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { editBoardData, createBoardData, deleteBoardData, allBoard, getListsOfBoard } from '../actions/allActions'

import { useDispatch, useSelector } from "react-redux";
// import { deleteBoard } from '../../../npod_api/src/controllers/board';


const useStyle = makeStyles((theme) => ({
    root: {
        // background: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x2048/9d54c02d4d0f2f3cfb3e32add1aace68/photo-1475686521619-69149eceb8c7.jpg",
        backgroundImage: `url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/51d6b1a6ba4530cc2381fa9f665be7db/photo-1625242420602-a22dd7692b82.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100',
    },
    appbar: {
        flexGrow: 1,
        margin: "auto",
        background: 'rgba(73, 92, 99, 0.2)',
        height: "4vh",
        padding: "5px",
    },
    first_row: {
        flexGrow: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: "white",
        marginLeft: "5px",
        align: "left"
    },
    first_row_right: {
        flexGrow: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: "white",
        marginLeft: "5px",
        // align: "right",
        float: "right"
    },
    second_row: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        color: "white",
        marginLeft: "10px",
    },
    second_div: {
        marginTop: "10px",
        display: "flex",
    },
    list: {
        display: "flex",
    },
    boxList: {
        display: "flex",
        flexWrap: 'wrap',
        padding: "50px"
    },
    box: {
        width: "280px",
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "15px",
        backgroundColor: "moccasin",
        height: "15vh"
        // position: "absolute"
    },
    card: {
        backgroundColor: "#ffffff",
        margin: "10px",
        maarginTop: "5px",
        padding: "10px",
        boxShadow: theme.shadows[5]
    },
    cardItems: {
        margin: "10px",
        textDecoration: "underline",
        textTransform: "capitalize",
        whiteSpace: 'nowrap',
        width: '80%',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}))

const Index = (props) => {

    const allBoards = useSelector((state) => state.BoardDataRed.allData)
    const token = useSelector((state) => state.AuthenticationRed.token)
    const userId = useSelector((state) => state.AuthenticationRed.id)
    // console.log("aaa------", allBoards);

    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [open, setOpen] = React.useState(false);
    const [createOpen, setCreateOpen] = React.useState(false);

    const handleClickOpen = (id, name) => {
        setOpen(true)
        setName(name)
        setId(id)
    };

    const handleClickOpenCreate = () => {
        setName('')
        setCreateOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
        console.log("ssssdwfeer");
        dispatch(editBoardData(id, name, token))
    };

    const handleCloseCreate = () => {
        setCreateOpen(false);
        dispatch(createBoardData(name, userId, token))

    }
    const deleteBoard = (id) => {
        console.log("www", id);
        dispatch(deleteBoardData(id, token))
        // dispatch(allBoard(token))

    }
    useEffect(() => {
        dispatch(allBoard(token))
    }, [])

    const classes = useStyle();

    return (
        <div className={classes.root} item sm={12} lg={3}>
            <div className={classes.appbar} >
                <Button className={classes.first_row}>
                    <HomeOutlinedIcon />
                </Button>
                <Button className={classes.first_row} >
                    Jump to.....   <SearchOutlinedIcon />
                </Button>
                <Button className={classes.first_row_right} >
                    <AccountCircleOutlinedIcon />
                </Button>
                <Button className={classes.first_row_right} >
                    <NotificationsActiveOutlinedIcon />
                </Button>
            </div>
            <div className={classes.second_div}>
                <Button className={classes.second_row} onClick={() => handleClickOpenCreate()}>
                    Create New Board <AddOutlinedIcon />
                </Button>
                <Dialog
                    open={createOpen}
                    onClose={setCreateOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Create </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <TextField id="standard-basic" label="Standard" value={name} onChange={(e => setName(e.target.value))} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseCreate} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                <Typography variant="h5" style={{ marginLeft: "10px" }}>
                    UserName
                </Typography>
            </div>
            <div className={classes.boxList} item sm={12} lg={6}>
                {allBoards && allBoards.length > 0 && allBoards.map((board, index) => (
                    <Paper component={Box} className={classes.box} fitcontant key={index} >
                        <div className={classes.list} >
                            <Typography variant="h4" className={classes.cardItems} style={{ display: "block" }} gutterBottom onClick={() => dispatch(getListsOfBoard(board._id, token, props, board.name))}>
                                {board.name}
                            </Typography>
                            <IconButton style={{ float: "right", display: "inline-block" }} onClick={() => handleClickOpen(board._id, board.name)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton style={{ float: "right", display: "inline-block" }} onClick={() => deleteBoard(board._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Edit </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <TextField id="standard-basic" label="Standard" value={name} onChange={(e => setName(e.target.value))} />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Paper>
                ))}
            </div>
        </div>
    )
}

export default Index
