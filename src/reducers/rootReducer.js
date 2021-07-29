import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Authentication from './authentication';
import BoardData from './boardRed'
import ListData from './listRed'
import CardData from './cardRed'
// import AllBoards from './Allboards';
// import AddBoard from './Addboard';
// import DelBoards from './Dellboard';
// import EditBoards from './Editboard';
// import ListBoard from './Listboard';
// import CreateListOfBoard from './Createlistofboard';
// import Dellistboard from './Dellistofboard';
// import Editlistofboard from './Editlistofboard';
const persistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ["AuthenticationRed", "BoardDataRed","ListDataRed","CardDataRed"]
  };
const rootReducer = combineReducers({
    AuthenticationRed:Authentication,
    BoardDataRed: BoardData,
    ListDataRed: ListData,
    CardDataRed: CardData
    // AllBoardsReducer:AllBoards,
    // AddBoardReducer:AddBoard,
    // DellBoardReducer:DelBoards,
    // EditBoardReducer:EditBoards,
    // ListBoardReducer:ListBoard,
    // CreateListOfBoardReducer:CreateListOfBoard,
    // DellistboardReducer:Dellistboard,
    // EditlistofboardReducer:Editlistofboard,
});
export default persistReducer(persistConfig,rootReducer);