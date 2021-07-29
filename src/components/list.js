import React, { useEffect, useState } from 'react'
// import { Paper, makeStyles, Typography, Button, Box } from '@material-ui/core'
import { TextField, IconButton, Paper, makeStyles, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextareaAutosize } from '@material-ui/core'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TocIcon from '@material-ui/icons/Toc';
import ClearIcon from '@material-ui/icons/Clear';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Link, useParams } from 'react-router-dom'
import { allCards, createListData, getListsOfBoard, editListData, deleteListData, createCardData, editCardData, deleteCardData } from '../actions/allActions'


const useStyle = makeStyles((theme) => ({
    root: {
        // background: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x2048/9d54c02d4d0f2f3cfb3e32add1aace68/photo-1475686521619-69149eceb8c7.jpg",
        backgroundImage: `url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/51d6b1a6ba4530cc2381fa9f665be7db/photo-1625242420602-a22dd7692b82.jpg")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        overflow: "hidden"
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
        marginLeft: "13px",
    },
    second_div: {
        marginTop: "10px",
        display: "flex",
    },
    list: {
        display: "flex",
        flexWrap: 'wrap',
        overflow: "hidden"
        // justifyContent :
    },
    box: {
        width: "320px",
        marginLeft: "15px",
        marginTop: "15px",
        backgroundColor: "moccasin",
        height: "fit-content",
        maxHeight: '89vh',
        overflow: 'auto'
    },
    card: {
        backgroundColor: "#ffffff",
        margin: "15px",
        maarginTop: "5px",
        padding: "5px",
        boxShadow: theme.shadows[5],
        // maxHeight: '89vh',

    },
    liStItem: {
        textDecoration: "underline",
        textTransform: "capitalize",
        whiteSpace: 'nowrap',
        width: '38%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginLeft: "5px",
        padding: "5px",
        float: "left"
    },
    dialogDiv: {
        // display: 'flex',
        // justifyContent: "center",
        // flexDirection: "column",
        // alignItems: "center",
        margin: '12px 20px 8px 20px',
        minHeight: '32px',
        position: 'relative',
        // z- index: 1;

    }
}))

const List = (props) => {
    const classes = useStyle();
    const b_id = props.location.state.boardId
    const b_name = props.location.state.boardName
    const listData = useSelector((state) => state.ListDataRed.allData)
    let cardData = useSelector((state) => state.CardDataRed.allData)
    // console.log("data", listData);
    const token = useSelector((state) => state.AuthenticationRed.token)
    const dispatch = useDispatch();
    // const boardName = listData && listData.length > 0 && listData[0].boardName
    // const boardId = listData && listData.length > 0 && listData[0].boardId
    const [name, setName] = useState('')
    const [order, setOrder] = useState('')
    const [open, setOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [id, setId] = useState('')
    const [cardId, setCardId] = useState()
    const [cardOpen, setCardOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [addcard, setAddCard] = useState('')
    const [show, setShow] = useState(true)
    const [hide, setHide] = useState(true)
    const [card, setCard] = useState('');
    // const handleClickOpenCard = () => {
    //     setCardOpen(true);
    //     setName('')
    //     setOrder('')
    // };
    const handleClosecard = () => {
        dispatch(editCardData(cardId, card, description))
        setCardOpen(false);
        setHide(true);
        setShow(true)
    };

    const [newCard, setNewcard] = useState('')

    const createCard = (id) => {
        setNewcard(id)
        setAddCard(false)
    }

    const addCard = (id) => {
        console.log("name", name)
        setName('')
        setNewcard()
        setAddCard('')
        dispatch(createCardData(name, b_id, id, token))

    }
    const closeCard = () => {
        setNewcard()
        setAddCard('')
    }

    const openModel = (id, name, description) => {
        setCardOpen(true)
        setCardId(id)
        setCard(name)
        setDescription(description)
    }

    const deleteCard = (id) => {
        dispatch(deleteCardData(id))
    }
    const handleClickOpenCreate = () => {
        setCreateOpen(true)
        setName('')
        setOrder('')
    };

    const handleCloseCreate = () => {
        setCreateOpen(false);
        dispatch(createListData(name, b_id, token, order))
        dispatch(getListsOfBoard(b_id, token, props, b_name))
    }

    const handleClickOpen = (id, name, order) => {
        setOpen(true)
        setName(name)
        setId(id)
        setOrder(order)
    };

    const handleClose = () => {
        setOpen(false);
        console.log("ssssdwfeer");
        dispatch(editListData(id, name, order, token))
        dispatch(getListsOfBoard(b_id, token, props, b_name))

    };

    const deleteList = (id) => {
        console.log("www", id);
        dispatch(deleteListData(id))
        dispatch(getListsOfBoard(b_id, token, props, b_name))
    }

    useEffect(() => {
        dispatch(allCards())
    }, [])

    return (
        <div className={classes.root} >
            <div className={classes.appbar} >
                <Button className={classes.first_row}>
                    <HomeOutlinedIcon />
                </Button>
                <Button className={classes.first_row} >
                    Jump to.....   <SearchOutlinedIcon />
                </Button>
                <Button className={classes.first_row_right} >
                    <NotificationsActiveOutlinedIcon />
                </Button>
                <Button className={classes.first_row_right} >
                    <AccountCircleOutlinedIcon />
                </Button>
            </div>
            <div className={classes.second_div}>
                <Button className={classes.second_row} onClick={() => handleClickOpenCreate()}>
                    Create New List <AddOutlinedIcon />
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
                            <TextField id="standard-basic" label="Name" value={name} onChange={(e => setName(e.target.value))} gutterBottom />
                            <br />
                            <TextField id="standard-basic" label="order" value={order} onChange={(e => setOrder(e.target.value))} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseCreate} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                <Typography variant="h5" style={{ marginLeft: "38%", textTransform: "capitalize" }}>
                    {b_name}
                </Typography>
                <Typography variant="h5" style={{ marginLeft: "41%", textTransform: "capitalize" }}>
                    <Link to="/board">
                        Board List
                    </Link>
                </Typography>
            </div>
            <div className={classes.list} >
                {listData && listData.length > 0 && listData.map((list, index) => (
                    <Paper component={Box} className={classes.box} fitContant key={index}>
                        <div className={classes.list} style={{ display: 'block' }}>
                            <Typography variant="h5" className={classes.liStItem} >
                                {list.name}
                            </Typography>
                            <IconButton style={{ float: "right" }} onClick={() => deleteList(list._id)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton style={{ float: "right" }} onClick={() => handleClickOpen(list._id, list.name, list.order)}>
                                <EditIcon />
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
                                    <TextField id="standard-basic" label="Name" value={name} onChange={(e => setName(e.target.value))} />
                                    <br />
                                    <TextField id="standard-basic" label="order" value={order} onChange={(e => setOrder(e.target.value))} />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {cardData && cardData.length > 0 && cardData.map((card, index) => (
                            <>
                                {card.listId == list._id ?
                                    <>
                                        <div className={classes.card} key={index} >
                                            <div style={{ display: "block" }}>
                                                <Typography variant='body1' style={{ textTransform: "capitalize", display: "inline-block" }} gutterBottom onClick={() => openModel(card._id, card.name, card.description)}>
                                                    {card.name}
                                                </Typography>
                                                <IconButton style={{ float: "right",  display: "inline-block"}} onClick={() => deleteCard(card._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                            <div style={{ display: "inline-block" }}>
                                                <Typography variant="subtitle1" >
                                                    {card.description ? <TocIcon /> : ''}
                                                </Typography>
                                            </div>
                                        </div>
                                    </>
                                    : null}
                            </>
                        ))}
                        <Typography variant='body2' style={{ textTransform: "capitalize", textAlign: "center" }} gutterBottom className={classes.card} >
                            <div style={{ display: 'flex' }}>
                                <h3 style={{ marginLeft: "25%" }}>
                                    Add New Card
                                </h3>
                                <IconButton style={{ marginLeft: "-2%" }} onClick={() => createCard(list._id)}>
                                    <AddOutlinedIcon variant="large" />
                                </IconButton>
                            </div>
                        </Typography>

                        {newCard == list._id &&
                            <div className={classes.card} >
                                <Typography variant='body1' style={{ textTransform: "capitalize", }} gutterBottom>
                                    <TextField value={name} onChange={(e => setName(e.target.value))} autoFocus="true" />
                                    <Button variant="contained" color="Primary" style={{ marginLeft: "10px" }} onClick={() => addCard(list._id)}>
                                        Add
                                    </Button>
                                    <Button onClick={() => closeCard()}>
                                        close
                                    </Button>
                                </Typography>
                            </div>
                        }
                        <Dialog onClose={handleClosecard} aria-labelledby="customized-dialog-title" open={cardOpen} maxWidth="sm" fullWidth="true" >
                            <div style={{ height: "700px", backgroundColor: "#f4f5f7" }}>
                                <div className={classes.dialogDiv}>
                                    <div style={{ display: "block" }}>
                                        <IconButton style={{ display: "inline-block" }}>
                                            <CreditCardIcon fontSize="large" />
                                        </IconButton>

                                        {
                                            hide ?
                                                <Typography style={{ display: "inline-block", textTransform: "capitalize" }} variant="h6" onClick={() => setHide(false)}>

                                                    {card}
                                                </Typography>
                                                :
                                                <Typography style={{ display: "inline-block" }}>
                                                    <TextField
                                                        margin="normal"
                                                        value={card}
                                                        onChange={(e) => setCard(e.target.value)}
                                                        inputProps={{ style: { fontSize: 20 } }}
                                                        autoFocus="true"

                                                    />
                                                    <Button onClick={() => setHide(true)}>
                                                        save
                                                    </Button>
                                                </Typography>
                                        }
                                        <IconButton style={{ float: "right", display: "inline-block", position: "relative" }} onClick={handleClosecard}>
                                            <ClearIcon />
                                        </IconButton>
                                    </div>
                                    <div style={{ display: "block" }}>
                                        <IconButton style={{}} font>
                                            <TocIcon fontSize="large" />
                                        </IconButton>
                                        <Typography style={{ display: "inline-block" }} variant="h6" >
                                            Description
                                        </Typography>
                                        {description ?
                                            <Button variant="contained" style={{ marginLeft: "10px" }} onClick={() => setShow(false)}>Edit</Button>
                                            : ''
                                        }
                                    </div>
                                    <div style={{ display: "block", marginLeft: "10%" }}>
                                        {show ?
                                            <Typography onClick={() => setShow(false)} >
                                                {description != null ?
                                                    description
                                                    :
                                                    <TextField
                                                        placeholder="Add more detailed description"
                                                        margin="normal"
                                                        inputProps={{ style: { fontSize: 20 } }}
                                                        fullWidth="true"
                                                    />
                                                }
                                            </Typography>
                                            :
                                            <Typography component={Box} borderColor="primary.main" gutterBottom>
                                                <TextField
                                                    id="filled-multiline-static"
                                                    multiline
                                                    placeholder={description ? description : 'Add more detailed description'}
                                                    rows={4}
                                                    defaultValue={description ? description : ""}
                                                    variant="filled"
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    fullWidth="true"
                                                    autoFocus="true"


                                                />
                                                <Button onClick={() => setShow(true)} variant="contained" color="primary"> Save</Button>
                                                <Button onClick={() => setShow(true)}> Close</Button>
                                            </Typography>}
                                    </div>
                                </div>
                            </div>
                        </Dialog>

                    </Paper>
                ))
                }
            </div >
        </div >
    )
}

export default List
