import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StorageHelpers } from '../../core/helpers';
import { remote, ipcRenderer } from 'electron';
import { connect } from 'react-redux';

import SvgIcon from '../svgicon';
import { SearchField } from '../form-elements';
import { ReduxHelpers } from '../../core/helpers';
import { SET_SEARCH_QUERY } from '../../redux/actions/searchActions';
import { MainMenus, SearchResult } from '../../core/constants';
import SettingsModal from '../settings-modal';

import './style.scss';

const Mousetrap = require('mousetrap');

class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.handleSidebarClick = this.handleSidebarClick.bind(this);
    }

    handleSidebarClick() {
        const sidebar = document.querySelector('#sidebar-container');
        sidebar.classList.toggle('hidden');
    }

    state = {
        maximize: false,
        showSettingsModal: false,
        settingsSelectedTab: 'storage',
        isWindows: 'win32' === process.platform
    };

    componentDidMount() {
        const { isWindows } = this.state;

        Mousetrap.bind(['ctrl+b', 'command+b'], () => this.handleSidebarClick());

        ipcRenderer.on('appMenu', (event, args) => {
            if ('preferences' === args.type) {
                this.setState({ showSettingsModal: true, settingsSelectedTab: args.tab });
            }
        });

        if (isWindows) {
            this.onResizeWindow();
            this.refMenu.addEventListener('click', this.onClickMenu);
            this.refClose.addEventListener('click', this.onClickClose);
            this.refMinimize.addEventListener('click', this.onClickMinimize);
            this.refMaximize.addEventListener('click', this.onClickMaximize);
            window.addEventListener('resize', this.onResizeWindow);
        }
    }

    componentWillUnmount() {
        const { isWindows } = this.state;

        Mousetrap.unbind(['ctrl+b', 'command+b']);

        if (isWindows) {
            this.refMenu.removeEventListener('click', this.onClickMenu);
            this.refClose.removeEventListener('click', this.onClickClose);
            this.refMinimize.removeEventListener('click', this.onClickMinimize);
            this.refMaximize.removeEventListener('click', this.onClickMaximize);
            window.removeEventListener('resize', this.onResizeWindow);
        }
    }

    onClickClose = () => remote.getCurrentWindow().close();
    onClickMenu = async e => await ipcRenderer.invoke('display-app-menu', { x: e.x, y: e.y });
    onClickMinimize = () => remote.getCurrentWindow().minimizable ? remote.getCurrentWindow().minimize() : null;
    onClickMaximize = () => remote.getCurrentWindow().isMaximized() ? remote.getCurrentWindow().unmaximize() : remote.getCurrentWindow().maximize();
    onResizeWindow = () => this.setState({ maximize: remote.getCurrentWindow().isMaximized() });

    onChangeText = (text) => {
        const { setQuery, setSelectedMenu, setRecipeList } = this.props;
        const selectedMenu = '' === text ? MainMenus[0] : SearchResult;
        setQuery(text);
        setSelectedMenu(selectedMenu);
        setRecipeList(selectedMenu, text);
    };

    render() {
        const { maximize, showSettingsModal, isWindows, settingsSelectedTab } = this.state;
        const { query } = this.props;

        // NOTE: Why react-i18n-next doesn't work here?
        const appLang = StorageHelpers.preference.get('appLang');
        let searchtext;
        switch (appLang) {
            case 'en':
                searchtext = 'Search recipe...';
                break;
            case 'fr':
                searchtext = 'Cherchez une recette...';
                break;
            case 'de':
                searchtext = 'Rezept suchen...';
                break;
            default:
                searchtext = 'Search recipe...';
        }

        return (
            <div className='comp_topmenu'>
                <SettingsModal
                    show={showSettingsModal}
                    selectedTab={settingsSelectedTab}
                    onClose={() => this.setState({ showSettingsModal: false })}
                    tabChanged={settingsSelectedTab => this.setState({ settingsSelectedTab })}
                />

                <div className='left-side'>
                    {
                        isWindows ?
                            (
                                <button ref={ref => this.refMenu = ref} className='btn-menubar menu' type='button'>
                                    <span />
                                    <span />
                                    <span />
                                </button>
                            )
                            : null
                    }
                    <span className='sidebar' onClick={this.handleSidebarClick}>
                        <SvgIcon name='sidebar' />
                    </span>
                    <div className='content-header-divider'></div>
                    <span className='applogo'>
                        <SvgIcon name='logo' />
                    </span>
                    <span className='appname'>
                        Birds Kitchen
                    </span>
                </div>

                <div className='center-side'>
                </div>
                <div className='right-side'>
                    <SearchField
                        placeholder={searchtext}
                        value={query}
                        onChangeText={text => this.onChangeText(text)}
                        onClearClick={() => this.onChangeText('')}
                    />
                    <div className='content-header-divider'></div>
                    <button className='btn-preferences' title='Preferences'
                        onClick={() => this.setState({ showSettingsModal: true, settingsSelectedTab: 'storage' })}>
                        <SvgIcon name='settings' />
                    </button>
                    {
                        isWindows ?
                            (
                                <div className='recipe-buttons'>
                                    <button ref={ref => this.refMinimize = ref} className='btn-menubar minimize'>
                                        <SvgIcon name='minimize' />
                                    </button>
                                    <button ref={ref => this.refMaximize = ref} className='btn-menubar maximize'>
                                        <SvgIcon name={maximize ? 'maximized' : 'maximize'} />
                                    </button>
                                    <button ref={ref => this.refClose = ref} className='btn-menubar close'>
                                        <SvgIcon name='close' />
                                    </button>
                                </div>
                            )
                            : null
                    }
                </div>
            </div>
        );
    }
}

TopMenu.defaultProps = {
    onClickSettings: PropTypes.func
};

const mapStateToProps = state => {
    const { query } = state.search;
    return { query };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedMenu: selectedMenu => ReduxHelpers.setSelectedMenu(dispatch, selectedMenu),
        setQuery: (query) => dispatch({ type: SET_SEARCH_QUERY, payload: query }),
        setRecipeList: (selectedMenu, query) => ReduxHelpers.fillRecipes(dispatch, selectedMenu, query)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
