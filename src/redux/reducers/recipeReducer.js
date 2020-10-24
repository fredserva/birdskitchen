import {SET_RECIPE_LIST} from '../actions/recipeActions';

const initialState = {
    recipes: []
};

const recipeReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SET_RECIPE_LIST:
            return { ...state, recipes: action.payload };
        default:
            return { ...state };
    }
};

export default recipeReducer;
