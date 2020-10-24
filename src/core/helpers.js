import _ from 'lodash';
import shortid from 'shortid';
import Noty from 'noty';
import {platform, homedir} from 'os';
import Store from 'electron-store';
import moment from 'moment';

import Api from './api';
import {SET_SELECTED_MENU_ITEM, SET_TAGS} from '../redux/actions/sidebarActions';
import {SET_RECIPE_LIST} from '../redux/actions/recipeActions';

import 'noty/src/noty.scss';
import 'noty/src/themes/sunset.scss';
import {App} from './constants';
import fs from 'fs';
import path from 'path';

const isWin = 'win32' === platform();
const defaultPath = isWin ? `${homedir()}\\${App.folderName}` : `${homedir()}/${App.folderName}`;
const backupPath = isWin ? `${defaultPath}\\${App.backupFolderName}` : `${defaultPath}/${App.backupFolderName}`;
const storagePrefences = new Store({
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
                } else if ( 'trash' === slug ) {
                    result = new Api().getAllRecipesInTrash();
                }
            } else if ( 'search' === selectedMenu.type ) {
                result = new Api().queryRecipe( query.toLowerCase() );
            } else {
                result = new Api().getRecipesContainsTag( slug );
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

const ReduxHelpers = {
    fillTags: dispatch => dispatch({
        type: SET_TAGS,
        payload: TagHelpers.getAllItems()
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
    preference: storagePrefences,

    initDb: () => {
        const appDir = storagePrefences.get( 'storagePath' ).toString();
        const backupsDir = storagePrefences.get( 'backupPath' ).toString();

        if ( ! fs.existsSync( appDir ) ) {
            fs.mkdirSync( appDir );
            fs.appendFileSync( path.join( appDir, App.dbName ), '' );
        }

        if ( ! fs.existsSync( backupsDir ) ) {
            fs.mkdirSync( backupsDir );
        }
    },

    moveDb: ( willMoveDir ) => {
        const dbFileExistPath = path.join( storagePrefences.get( 'storagePath' ).toString(), App.dbName );
        const dbFileNewPath = path.join( willMoveDir, App.dbName );

        if ( ! fs.existsSync( willMoveDir ) ) {
            fs.mkdirSync( willMoveDir );
        }

        fs.renameSync( dbFileExistPath, dbFileNewPath );
        storagePrefences.set( 'storagePath', willMoveDir );
    },

    restoreDb: ( willRestoreFilePath ) => {
        const appDir = storagePrefences.get( 'storagePath' ).toString();

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
        const dbFilePath = path.join( storagePrefences.get( 'storagePath' ).toString(), App.dbName );
        const dbBackupDir = path.join( storagePrefences.get( 'backupPath' ).toString(), moment().format( 'YYYY-MM-DD_HH-mm-ss' ) );

        if ( ! fs.existsSync( dbBackupDir ) ) {
            fs.mkdirSync( dbBackupDir );
        }

        fs.copyFileSync( dbFilePath, path.join( dbBackupDir, App.dbName ) );
    },

    backupFiles: () => {
        const result = [];
        const backupDir = storagePrefences.get( 'backupPath' ).toString();
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

export {RecipeHelpers, TagHelpers, ReduxHelpers, NotyHelpers, StorageHelpers};
