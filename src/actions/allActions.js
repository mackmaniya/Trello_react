import axios from 'axios';



import { AUTHLOGINSUCCESS,CARDDATASUCCESS,ADDLISTSUCCESS, EDITLISTSUCCESS,DELLISTSUCCESS, FETCHBOARDSSUCCESS, EDITBOARDSUCCESS, ADDBOARDSUCCESS, DELBOARDSUCCESS, LISTBOARDSUCCESS, ADDCARDSUCCESS, EDITCARDSUCCESS, DELCARDSUCCESS } from './ActionsType';
const authSuccess = (token, user_id) => {
    return {
        type: AUTHLOGINSUCCESS,
        token: token,
        id: user_id,
    }
}

export const Authlogin = (email, password, props) => {
    return dispatch => {
        axios.post('http://localhost:8000/user/login', {
            email: email,
            password: password
        })
            .then(res => {
                const token = res.data.token;
                const user_id = res.data.user.id;
                localStorage.setItem("token", token);
                dispatch(authSuccess(token, user_id));
                // dispatch(allBoard(token))
                props.history.push('/board')
            })
            .catch(err => {
                console.log(err);
                // dispatch(authFail(err));
            })
    }
}

const getAllBoard = (data) => {
    return {
        type: FETCHBOARDSSUCCESS,
        payload: data
    }
}

export const allBoard = (token) => {
    return dispatch => {
        console.log("ddddd")
        axios.get('http://localhost:8000/user/board/allboards', {
            headers: { "x-auth-token": `${token}` }
        })
            .then(res => {
                console.log(res.data);
                let data = res.data
                console.log("token", token);
                dispatch(getAllBoard(data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const createBoard = (data) => {
    return {
        type: ADDBOARDSUCCESS,
        payload: data
    }
}

export const createBoardData = (name, userId, token) => {
    const data = {
        name: name,
        userId: userId
    }
    return dispatch => {
        axios.post('http://localhost:8000/user/board/createboard', data)
        .then(res => {
            console.log(res.data);
            let data = res.data
            // console.log("token", token);
            dispatch(createBoard(data));
            dispatch(allBoard(token))
            // props.history.push("/board")
        })
        .catch(err => {
            console.log(err);
            // dispatch(authFail(err));
        })
    }
}


const editBoard = (data) => {
    return {
        type: EDITBOARDSUCCESS,
        payload: data
    }
}

export const editBoardData = (id, name, token) => {
    const data = {
        name: name
    }
    return dispatch => {
        axios.patch(`http://localhost:8000/user/board/updateboard/${id}`, data, {
            headers: { "x-auth-token": `${token}` }
        })
        .then(res => {
            console.log(res.data);
            let data = res.data
            // console.log("token", token);
            dispatch(editBoard(data));
            dispatch(allBoard(token))
            
            // props.history.push("/board")
        })
        .catch(err => {
            console.log(err);
            // dispatch(authFail(err));
        })
    }
}


const deleteBoard = (data) => {
    return {
        type: DELBOARDSUCCESS,
        payload: data
    }
}

export const deleteBoardData = (id, token) => {
    console.log("dddd", token);
    console.log("dddd", id);
    return dispatch => {
        axios.delete(`http://localhost:8000/user/board/deleteboard/${id}`, {
            headers: { "x-auth-token": `${token}` }
        })
        .then(res => {
            let data = res.data
            console.log("delete", data);
            dispatch(deleteBoard(data));
            dispatch(allBoard(token))
        })
        .catch(err => {
            console.log(err);
        })
    }
}

const listOfBoard = (data) => {
    
    return {
        type: LISTBOARDSUCCESS,
        payload: data
    }
}

export const getListsOfBoard = (id, token, props, name) => {
    return dispatch => {
        axios.get(`http://localhost:8000/user/board/getlistsofboard/${id}`, {
            headers: { "x-auth-token": `${token}` }
        })
        .then(res => {
            console.log("list",res.data);
            let data = res.data
            let newData = data.map((obj) => {
                return{
                    boardId:obj.boardId,
                    boardName : name,
                    name : obj.name,
                    order: obj.order,
                    _id: obj._id
                }
            })
            dispatch(listOfBoard(newData));
            props.history.push('/list', {boardId : id, boardName : name})
            dispatch(allCards())
        })
        .catch(err => {
            console.log(err);
        })
    }
}

const createList = (data) => {
    return {
        type: ADDLISTSUCCESS,
        payload: data
    }
}

export const createListData = (name, boardId, token, order) => {
    const data = {
        name: name,
        boardId: boardId,
        order: order
    }
    return dispatch => {
        axios.post('http://localhost:8000/user/list/createlist', data,
        {
            headers: { "x-auth-token": `${token}` }
        })
        .then(res => {
            console.log(res.data);
            let data = res.data
            dispatch(createList(data));

        })
        .catch(err => {
            console.log(err);
        })
    }
}

const editList = (data) => {
    return {
        type: EDITLISTSUCCESS,
        payload: data
    }
}

export const editListData = (id, name, order, token) => {
    const data = {
        name: name,
        order: order
    }
    return dispatch => {
        axios.patch(`http://localhost:8000/user/list/updatelist/${id}`, data, {
            headers: { "x-auth-token": `${token}` }
        })
        .then(res => {
            console.log(res.data);
            let data = res.data
            dispatch(editList(data));
       
        })
        .catch(err => {
            console.log(err);
            // dispatch(authFail(err));
        })
    }
}

const deleteList = (data) => {
    
    return {
        type: DELLISTSUCCESS,
        payload: data
    }
}

export const deleteListData = (id ) => {
    console.log("dddd", id);
    return dispatch => {
        axios.delete(`http://localhost:8000/user/list/deletelist/${id}`)
        .then(res => {
            console.log(res.data);
            let data = res.data
            dispatch(deleteList(data));
            // dispatch(allBoard(token))
        })
        .catch(err => {
            console.log(err);
        })
    }
}

const allCardsData = (data) => {
    
    return {
        type: CARDDATASUCCESS,
        payload: data
    }
}

export const allCards = () => {
    return dispatch => {
        axios.get('http://localhost:8000/user/card/allcards')
        .then(res => {
            let data = res.data
            dispatch(allCardsData(data));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

const createCard = (data) => {
    return {
        type: ADDCARDSUCCESS,
        payload: data
    }
}

export const createCardData = (name, boardId, listId, token) => {
    console.log("tokrm", token);
    const data = {
        name: name,
        boardId: boardId,
        listId: listId
    }
    return dispatch => {
        axios.post('http://localhost:8000/user/card/createcard', data,
        {
            headers: { "x-auth-token": `${token}` }
        })
        .then(res => {
            console.log(res.data);
            let data = res.data
            dispatch(createCard(data));
            dispatch(allCards)
        })
        .catch(err => {
            console.log(err);
        })
    }
}

const editCard = (data) => {
    return {
        type: EDITCARDSUCCESS,
        payload: data
    }
}

export const editCardData = (id, name, description) => {
    const data = {
        name: name,
        description: description
    }
    return dispatch => {
        axios.patch(`http://localhost:8000/user/card/updatecard/${id}`, data
        )
        .then(res => {
            console.log(res.data);
            let data = res.data
            dispatch(editCard(data));
            dispatch(allCards)
        })
        .catch(err => {
            console.log(err);
            // dispatch(authFail(err));
        })
    }
}
    

    const deleteCard = (data) => {
        
        return {
            type: DELCARDSUCCESS,
            payload: data
        }
    }
    
    export const deleteCardData = (id ) => {
        console.log("dddd", id);
        return dispatch => {
            axios.delete(`http://localhost:8000/user/card/deletecard/${id}`)
            .then(res => {
                console.log(res.data);
                let data = res.data
                dispatch(deleteCard(data));
                dispatch(allCards)

            })
            .catch(err => {
                console.log(err);
            })
        }
    }