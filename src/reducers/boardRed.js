import { FETCHBOARDSSUCCESS, EDITBOARDSUCCESS, ADDBOARDSUCCESS, DELBOARDSUCCESS } from '../actions/ActionsType'
const intialState = {
    allData: []
}

const BoardData = (state = intialState, action) => {
    switch (action.type) {
        case FETCHBOARDSSUCCESS:
            return { ...state, allData: action.payload };
        case ADDBOARDSUCCESS:
            return { ...state, allData: [action.payload, ...state.allData] };
            case EDITBOARDSUCCESS:
                return {
                    ...state,
                    allData: state.allData.map((data) => data._id === action.payload._id ? action.payload : data)
                };
                case DELBOARDSUCCESS:
                    return { ...state, allData: state.allData.filter(
                (data) => data._id !== action.payload._id
              ),};
        default:
            return state;
    }
}

export default BoardData;