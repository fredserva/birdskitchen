import { SET_SELECTED_MENU_ITEM, SET_TAGS, SET_CATEGORIES } from '../actions/sidebarActions';
import { MainMenus } from '../../core/constants';

const initialState = {
	selectedMenu: MainMenus[ 0 ],
	tags: [],
	categories: []
};

const sidebarReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case SET_SELECTED_MENU_ITEM:
			return { ...state, selectedMenu: action.payload };
		case SET_TAGS:
			return { ...state, tags: action.payload };
		case SET_CATEGORIES:
			return { ...state, categories: action.payload };
		default:
			return { ...state };
	}
};

export default sidebarReducer;
