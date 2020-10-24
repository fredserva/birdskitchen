import React, {Component} from 'react';
import {Provider} from 'react-redux';

import TopMenu from './components/topmenu';
import Sidebar from './components/sidebar';
import store from './redux/store';
import RecipeArea from './components/recipe-area';
import {StorageHelpers} from './core/helpers';

import './components/common.scss';

class App extends Component {
    constructor( props ) {
        super( props );
        this.setTheme();
        this.setGridDisplay();
        StorageHelpers.initDb();
        StorageHelpers.autoBackup();
        setInterval( StorageHelpers.autoBackup, 1000 * 60 * 60 * 6 );
    }

    setTheme = () => {
        const theme = `${StorageHelpers.preference.get( 'appTheme' ) || 'athens'}-theme`;
        if ( ! document.body.classList.contains( theme ) ) {
            document.body.classList.add( theme );
        }
    };

    setGridDisplay = () => {
        const recipesdisplay = `${StorageHelpers.preference.get( 'recipesdisplay' ) || 'grid'}-display`;
        if ( ! document.body.classList.contains( recipesdisplay ) ) {
            document.body.classList.add( recipesdisplay );
        }
    };

    render() {
        return (
            <Provider store={store}>
                <div className='top-menu-container'>
                    <TopMenu/>
                </div>
                <div className='content-main-container'>
                    <div id='sidebar-container' className='sidebar-container'>
                        <Sidebar/>
                    </div>
                    <div className='content-container'>
                        <RecipeArea/>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
