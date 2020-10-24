import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

import {StorageHelpers} from './helpers';
import {App} from './constants';

let db;

class Api {
    constructor() {
        const dbFilePath = path.join( StorageHelpers.preference.get( 'storagePath' ), App.dbName );
        const adapter = new FileSync( dbFilePath );
        db = lowdb( adapter );
        db.defaults( { recipes: [] } ).write();
    }

    addNewRecipeItem = item => db.get( 'recipes' ).push( item ).write();

    updateRecipeItem = obj => db.get( 'recipes' ).find( { id: obj.id } ).assign( obj ).write();

    deleteRecipeById = id => db.get( 'recipes' ).remove( { id } ).write();

    getRecipeById = id => db.get( 'recipes' ).find( { id } ).value();

    getAllRecipes = () => db.get( 'recipes' ).filter( { isTrash: false } ).sortBy( 'title' ).value();

    getAllRecipesInTrash = () => db.get( 'recipes' ).filter( { isTrash: true } ).value();

    getAllUntaggedRecipes = () => db.get( 'recipes' ).filter( { tags: '', isTrash: false } || {
        tags: null,
        isTrash: false
    }).value();

    getAllFavoriteRecipes = () => db.get( 'recipes' ).filter( { isfavorite: true, isTrash: false } ).sortBy( 'title' ).value();

    getAllTags = () => db.get( 'recipes' ).filter( { isTrash: false } ).map( 'tags' ).value();

    getRecipesContainsTag = tag => db.get( 'recipes' ).filter( ( t => t.tags.indexOf( tag ) > -1 && false === t.isTrash ) ).value();

    queryRecipe = query => db.get( 'recipes' ).filter( ( t => ( t.title.toLowerCase().indexOf( query ) > -1 ) && false === t.isTrash ) ).value();
}

export default Api;
