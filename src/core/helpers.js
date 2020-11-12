import _ from 'lodash';
import shortid from 'shortid';
import Noty from 'noty';
import {platform, homedir} from 'os';
import Store from 'electron-store';
import moment from 'moment';

import Api from './api';
import {SET_SELECTED_MENU_ITEM, SET_TAGS, SET_CATEGORIES} from '../redux/actions/sidebarActions';
import {SET_RECIPE_LIST} from '../redux/actions/recipeActions';

import 'noty/src/noty.scss';
import 'noty/src/themes/sunset.scss';
import {App} from './constants';
import fs from 'fs';
import path from 'path';

const isWin = 'win32' === platform();
const defaultPath = isWin ? `${homedir()}\\${App.folderName}` : `${homedir()}/${App.folderName}`;
const backupPath = isWin ? `${defaultPath}\\${App.backupFolderName}` : `${defaultPath}/${App.backupFolderName}`;
const storagePreferences = new Store({
    name: 'preferences',
    schema: {
        storagePath: {
            default: defaultPath
        },
        backupPath: {
            default: backupPath
        }
    }
});

const RecipeHelpers = {
    organizeRecipes: text => {
        const result = [];
        const matchedItems = text.match( new RegExp( `\\[s\\s*(.*?)\\s*\\/]`, 'g' ) );

        _.forEach( matchedItems, ( val ) => {
            let type = 'variable';

            if ( val.indexOf( 'sc_choice' ) > -1 ) {
                type = 'choice';
            }

            result.push({
                id: shortid.generate(),
                type,
                name: val.match( /name="(.*?)"/ )[1],
                value: val.match( /value="( .*? )"/ )[1]
            });
        });

        return result;
    },

    replacedRecipe: ( text, paramsAsObj ) => {
        const params = [];
        const matchedItems = text.match( new RegExp( `\\[s\\s*(.*?)\\s*\\/]`, 'g' ) );
        _.forOwn( paramsAsObj, o => params.push( o ) );

        _.forEach( matchedItems, ( val, index ) => {
            text = text.replace( val, params[index] );
        });

        return text;
    },

    recipeAsHtml: text => {
        const matchedItems = text.match( new RegExp( `\\[s\\s*(.*?)\\s*\\/]`, 'g' ) );

        _.forEach( matchedItems, ( val ) => {
            text = text.replace( val, `<span>&#60;${val.match( /name="(.*?)"/ )[1]}&#62;</span>` );
        });

        return text;
    },

    getRecipes: ( selectedMenu, query ) => {
        let result = [];
        if ( selectedMenu ) {
            const slug = selectedMenu.slug;

            if ( 'menu' === selectedMenu.type ) {
                if ( 'all_recipes' === slug ) {
                    result = new Api().getAllRecipes();
                } else if ( 'favorites' === slug ) {
                    result = new Api().getAllFavoriteRecipes();
                } else if ( 'untagged' === slug ) {
                    result = new Api().getAllUntaggedRecipes();
                } else if ( 'uncategorized' === slug ) {
                    result = new Api().getAllUncategorizedRecipes();
                } else if ( 'trash' === slug ) {
                    result = new Api().getAllRecipesInTrash();
                }
            } else if ( 'search' === selectedMenu.type ) {
                result = new Api().queryRecipe( query.toLowerCase() );
            } else if ( 'tag' === selectedMenu.type ) {
                result = new Api().getRecipesContainsTag( slug );
            } else if ( 'category' === selectedMenu.type ) {
                result = new Api().getRecipesContainsCategory( slug );
            } else {
                result = new Api().getAllRecipes();
            }
        }

        return result;
    }
};

const TagHelpers = {
    getAllItems: () => {
        let tagsAsStr = '';

        _.forEach( new Api().getAllTags(), key => {
            if ( null !== key && '' !== key && undefined !== key ) {
                tagsAsStr += `${key},`;
            }
        });

        if ( '' === tagsAsStr ) {
            return [];
        }

        tagsAsStr = tagsAsStr.substring( 0, tagsAsStr.length - 1 );
        return _.sortBy( _.uniq( tagsAsStr.split( ',' ) ) );
    }
};

const CategoriesHelpers = {
    getAllItems: () => {
        let categoriesAsStr = '';

        _.forEach( new Api().getAllCategories(), key => {
            if ( null !== key && '' !== key && undefined !== key ) {
                categoriesAsStr += `${key},`;
            }
        });

        if ( '' === categoriesAsStr ) {
            return [];
        }

        categoriesAsStr = categoriesAsStr.substring( 0, categoriesAsStr.length - 1 );
        return _.sortBy( _.uniq( categoriesAsStr.split( ',' ) ) );
    }
};

const ReduxHelpers = {
    fillTags: dispatch => dispatch({
        type: SET_TAGS,
        payload: TagHelpers.getAllItems()
    }),

    fillCategories: dispatch => dispatch({
        type: SET_CATEGORIES,
        payload: CategoriesHelpers.getAllItems()
    }),

    fillRecipes: ( dispatch, selectedMenu, query ) => dispatch({
        type: SET_RECIPE_LIST,
        payload: RecipeHelpers.getRecipes( selectedMenu, query )
    }),

    setSelectedMenu: ( dispatch, selectedMenu ) => dispatch({
        type: SET_SELECTED_MENU_ITEM,
        payload: selectedMenu
    })
};

const NotyHelpers = {
    open: ( text, type, timeout ) => {
        new Noty({
            text,
            theme: 'sunset',
            layout: 'bottomRight',
            type,
            progressBar: false,
            timeout
        }).show();
    },
    closeAll: () => {
        new Noty().close();
    }
};

const StorageHelpers = {
    preference: storagePreferences,

	readImg: ( file ) => {
		if ( undefined !== file ) {
			const mediasDir = storagePreferences.get( 'storagePath' ).toString() + '/medias/';
			let bitmap = fs.readFileSync( mediasDir + file );
			let encodedBitmap = new Buffer( bitmap ).toString( 'base64' );
			return 'data:image/jpg;base64,' + encodedBitmap;
		} else {
			return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQAgMAAAAPW/YLAAAACVBMVEVjaWygp6t+hIjGrRbLAAACnUlEQVR42u3bPY7TQBiA4bUlFz7AHsH3yBFSZKyFKkJCQpwiIHEE9zQ0nJIZO/YalKyEKOaLeJ5mtXHzKh6Pxz95egIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeEh9esOhWlb3VtZLtaznB8w6yZL1L1k/76qadbm3qZX10Fnt9Cli1pDyx+Gy2vnEEy5rXlbEyxpK1iVc1lSyzuGy5jPPMVpWHvHvp3SKltXk8d7Fy+pzT5vGeFnHPL7CZXUla0rxss6y/m5sBc2KeCSe8tw1xptOx5IWJOv77uTzOczJpx/3q8Awp+rh9XuLtLCZyvG3WwYeQmS1u/tGZdE8xlg0l5SAlxhlx22D60e5QRkiaz74wl2+Nq83JadLnIv9LqWPy+Bqy/ohStZzSt0yuPr1iAyQVaaHdhlc3XpEBsjK08M5T6gvy/d2iJI136J5nr+naT0iA2RNeVYvX9llnkrHIFnLmacp39M8UwTJmofW0zy45odA5xhZy6ia/wzp/XVerZ91HU5lcOX1zbT8Vz2ruR58+e85Tw9Dug64ylndOlVN6V1O6pfK6lnXvbY8ARrLPj0FyGq3h0798vxpOQJqZ12nh+vy5rju1NpZQ9pdZ5TCZp4iamdtQ2vefZf1XFQ5649rnu3MXTmr24ZW2X2nbZ1TOWt4vRLLu+9lu2isnPXbM+nhvA79yllfdhdim676xf63W+/SNNXv2Oymh51U+/7W7Vdp8udfK2edb3yep4gPlbMuNz4vT8nqZo03N0y137G5/ZbWUDvrcHNDXzvrzpbKWaf7wTWzjne2dCnkqz9NzKw8RYTMGmJm9V4re5isoG9Seh1W1n+V9eavC47VsoL+FgMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeBS/APEipcI05evwAAAAAElFTkSuQmCC';
		}
	},

    initDb: () => {
        const appDir = storagePreferences.get( 'storagePath' ).toString();
        const backupsDir = storagePreferences.get( 'backupPath' ).toString();
        const mediasDir = storagePreferences.get( 'storagePath' ).toString() + '/medias';

        if ( ! fs.existsSync( appDir ) ) {
            fs.mkdirSync( appDir );
            fs.appendFileSync( path.join( appDir, App.dbName ), '' );
        }

        if ( ! fs.existsSync( backupsDir ) ) {
            fs.mkdirSync( backupsDir );
        }

        if ( ! fs.existsSync( mediasDir ) ) {
            fs.mkdirSync( mediasDir );
        }
    },

    moveDb: ( willMoveDir ) => {
        const oldPathForDbFile = path.join( storagePreferences.get( 'storagePath' ).toString(), App.dbName );
        const newPathForDbFile = path.join( willMoveDir, App.dbName );
        const mediasFolderExistPath = storagePreferences.get( 'storagePath' ).toString() + '/medias';
        const mediasFolderNewPath = willMoveDir + '/medias';

        if ( ! fs.existsSync( willMoveDir ) ) {
            fs.mkdirSync( willMoveDir );
        }

        if ( ! fs.existsSync( mediasFolderNewPath ) ) {
            fs.mkdirSync( mediasFolderNewPath );
        }

		let files = fs.readdirSync( mediasFolderExistPath );
        for ( let i = files.length - 1; i >= 0; i-- ) {
            let file = files[i];
			let oldPath = mediasFolderExistPath + '/' + file;
			let newPath = mediasFolderNewPath + '/' + file;

            fs.copyFileSync( oldPath, newPath );
            fs.unlinkSync( oldPath );
            fs.rmdirSync( mediasFolderExistPath );
        }

        fs.copyFileSync( oldPathForDbFile, newPathForDbFile );
        fs.unlinkSync( oldPathForDbFile );

        storagePreferences.set( 'storagePath', willMoveDir );
    },

    restoreDb: ( willRestoreFilePath ) => {
        const appDir = storagePreferences.get( 'storagePath' ).toString();

        if ( ! fs.existsSync( appDir ) ) {
            fs.mkdirSync( appDir );
        }

        fs.copyFileSync( willRestoreFilePath, path.join( appDir, App.dbName ) );
    },

    autoBackup: () => {
        const backupFiles = StorageHelpers.backupFiles();

        if ( 0 === backupFiles.length ) {
            StorageHelpers.backupNow();
        } else {
            const lastBackupDate = moment( backupFiles[0].date ).add( 6, 'hours' );
            const now = moment();

            if ( now.isAfter( lastBackupDate ) ) {
                StorageHelpers.backupNow();
            }
        }
    },

    backupNow: () => {
        const dbFilePath = path.join( storagePreferences.get( 'storagePath' ).toString(), App.dbName );
        const dbBackupDir = path.join( storagePreferences.get( 'backupPath' ).toString(), moment().format( 'YYYY-MM-DD_HH-mm-ss' ) );

        if ( ! fs.existsSync( dbBackupDir ) ) {
            fs.mkdirSync( dbBackupDir );
        }

        fs.copyFileSync( dbFilePath, path.join( dbBackupDir, App.dbName ) );
    },

    backupFiles: () => {
        const result = [];
        const backupDir = storagePreferences.get( 'backupPath' ).toString();
        const folders = fs.readdirSync( backupDir );

        _.forEach( folders, ( value ) => {
            const momentVal = moment( value, 'YYYY-MM-DD_HH-mm-ss' );
            result.push({
                name: momentVal.format( 'DD MMM YYYY, HH:mm:ss' ),
                filePath: path.join( backupDir, value, App.dbName ),
                date: momentVal.format( 'YYYY-MM-DD HH:mm:ss' )
            });
        });

        result.reverse();
        return result;
    }
};

export {RecipeHelpers, TagHelpers, CategoriesHelpers, ReduxHelpers, NotyHelpers, StorageHelpers};
