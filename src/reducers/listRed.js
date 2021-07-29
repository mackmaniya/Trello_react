import { LISTBOARDSUCCESS, EDITLISTSUCCESS, ADDLISTSUCCESS, DELLISTSUCCESS } from '../actions/ActionsType'
const intialState = {
    allData: []
}

const ListData = (state = intialState, action) => {
    switch (action.type) {
        case LISTBOARDSUCCESS:
            return { ...state, allData: action.payload };
        case ADDLISTSUCCESS:
            return { ...state, allData: [action.payload, ...state.allData] };
            case EDITLISTSUCCESS:
                return {
                    ...state,
                    allData: state.allData.map((data) => data._id === action.payload._id ? action.payload : data)
                };
                case DELLISTSUCCESS:
                    return { ...state, allData: state.allData.filter(
                (data) => data._id !== action.payload._id
              ),};
        default:
            return state;
    }
}

export default ListData;