import {AUTHLOGINSUCCESS} from "../actions/ActionsType"
const intialState = {
    token: "",
    id: ""
}

const Authentication = (state = intialState, { type, token, id }) => {
    switch (type) {
        case AUTHLOGINSUCCESS:
            return { ...state, token: token, id : id  };
        default:
            return state;
    }
}

export default Authentication;