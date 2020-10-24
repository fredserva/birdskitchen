import {combineReducers} from 'redux';

import sidebarReducer from "./sidebarReducer";
import recipeReducer from "./recipeReducer";
import searchReducer from "./searchReducer";


const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    recipe: recipeReducer,
    search: searchReducer
});


export default rootReducer;