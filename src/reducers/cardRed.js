import { CARDDATASUCCESS, EDITCARDSUCCESS, ADDCARDSUCCESS, DELCARDSUCCESS } from '../actions/ActionsType'
const intialState = {
    allData: []
}

const CardData = (state = intialState, action) => {
    // console.log("cardred", state.allData);
    switch (action.type) {
        case CARDDATASUCCESS:
            return { ...state, allData: action.payload };
        case ADDCARDSUCCESS:
            return { ...state, allData: [action.payload, ...state.allData] };
            case EDITCARDSUCCESS:
                return {
                    ...state,
                    allData: state.allData.map((data) => data._id === action.payload._id ? action.payload : data)
                };
                case DELCARDSUCCESS:
                    return { ...state, allData: state.allData.filter(
                (data) => data._id !== action.payload._id
              ),};
        default:
            return state;
    }
}

export default CardData;