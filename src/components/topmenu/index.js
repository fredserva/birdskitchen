import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { remote, ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import SvgIcon from '../svgicon';
import { SearchField } from '../form-elements';
import { ReduxHelpers } from '../../core/helpers';
import { SET_SEARCH_QUERY } from '../../redux/actions/searchActions';
import { MainMenus, SearchResult } from '../../core/constants';
import SettingsModal from '../settings-modal';
import UnitConverter from '../unit-converter';

import './style.scss';

const Mousetrap = require('mousetrap');

class TopMenuNotExtended extends Component {
	constructor(props) {
		super(props);
		this.handleSidebarClick = this.handleSidebarClick.bind(this);
		this.handleUnitConverterClick = this.handleUnitConverterClick.bind(
			this
		);
	}

	handleSidebarClick() {
		const sidebar = document.querySelector('#sidebar-container');
		sidebar.classList.toggle('hidden');
	}

	handleUnitConverterClick() {
		const unitConverter = document.querySelector(
			'.comp_unit-converter-modal'
		);
		unitConverter.classList.toggle('visible');
	}

	closeNotification() {
		const notification = document.querySelector('#notification');
		notification.classList.add('hidden');
	}

	restartApp() {
		ipcRenderer.send('restart_app');
	}

	state = {
		maximize: false,
		showUnitConverter: false,
		showSettingsModal: false,
		settingsSelectedTab: 'storage',
		isWindows: 'win32' === process.platform,
	};

	componentDidMount() {
		const { isWindows } = this.state;
		const { t } = this.props;
		const notification = document.querySelector('#notification');
		const message = document.querySelector('#message');
		const restartButton = document.querySelector('#restart-button');

		Mousetrap.bind(['ctrl+b', 'command+b'], () =>
			this.handleSidebarClick()
		);
		Mousetrap.bind(['ctrl+u', 'command+u'], () =>
			this.handleUnitConverterClick()
		);

		ipcRenderer.on('appMenu', (event, args) => {
			if ('preferences' === args.type) {
				this.setState({
					showSettingsModal: true,
					settingsSelectedTab: args.tab,
				});
			}
		});

		ipcRenderer.on('update_available', () => {
			ipcRenderer.removeAllListeners('update_available');
			message.innerText = t(
				'A new update is available. Downloading now...'
			);
			notification.classList.remove('hidden');
		});

		ipcRenderer.on('update_downloaded', () => {
			ipcRenderer.removeAllListeners('update_downloaded');
			message.innerText = t(
				'Update Downloaded. It will be installed on restart. Restart now?'
			);
			restartButton.classList.remove('hidden');
			notification.classList.remove('hidden');
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
	onClickMenu = async (e) =>
		await ipcRenderer.invoke('display-app-menu', { x: e.x, y: e.y });
	onClickMinimize = () =>
		remote.getCurrentWindow().minimizable
			? remote.getCurrentWindow().minimize()
			: null;
	onClickMaximize = () =>
		remote.getCurrentWindow().isMaximized()
			? remote.getCurrentWindow().unmaximize()
			: remote.getCurrentWindow().maximize();
	onResizeWindow = () =>
		this.setState({ maximize: remote.getCurrentWindow().isMaximized() });

	onChangeText = (text) => {
		const { setQuery, setSelectedMenu, setRecipeList } = this.props;
		const selectedMenu = '' === text ? MainMenus[0] : SearchResult;
		setQuery(text);
		setSelectedMenu(selectedMenu);
		setRecipeList(selectedMenu, text);
	};

	render() {
		const {
			maximize,
			showUnitConverter,
			showSettingsModal,
			isWindows,
			settingsSelectedTab,
		} = this.state;
		const { t, query } = this.props;

		return (
			<div className="comp_topmenu">
				<div id="notification" className="hidden">
					<p id="message"></p>
					<div className="buttons">
						<button
							className="btn"
							id="close-button"
							onClick={this.closeNotification}
						>
							{t('close')}
						</button>
						<button
							className="btn hidden"
							id="restart-button"
							onClick={this.restartApp}
						>
							{t('restart')}
						</button>
					</div>
				</div>
				<UnitConverter
					show={showUnitConverter}
					onClose={() => this.setState({ showUnitConverter: false })}
				/>
				<SettingsModal
					show={showSettingsModal}
					selectedTab={settingsSelectedTab}
					onClose={() => this.setState({ showSettingsModal: false })}
					tabChanged={(settingsSelectedTab) =>
						this.setState({ settingsSelectedTab })
					}
				/>

				<div className="left-side">
					{isWindows ? (
						<button
							ref={(ref) => (this.refMenu = ref)}
							className="btn-menubar menu"
							type="button"
						>
							<span />
							<span />
							<span />
						</button>
					) : null}
					<span className="sidebar" onClick={this.handleSidebarClick}>
						<SvgIcon name="sidebar" />
					</span>
					<span
						className="calculator"
						onClick={this.handleUnitConverterClick}
					>
						<SvgIcon name="calculator" />
					</span>
					<div className="content-header-divider"></div>
					<span className="applogo">
						<SvgIcon name="logo" />
					</span>
					<span className="appname">Birds Kitchen</span>
				</div>

				<div className="center-side"></div>
				<div className="right-side">
					<SearchField
						placeholder={t('Search recipe...')}
						value={query}
						onChangeText={(text) => this.onChangeText(text)}
						onClearClick={() => this.onChangeText('')}
					/>
					<div className="content-header-divider"></div>
					<button
						className="btn-preferences"
						title="Preferences"
						onClick={() =>
							this.setState({
								showSettingsModal: true,
								settingsSelectedTab: 'storage',
							})
						}
					>
						<SvgIcon name="settings" />
					</button>
					{isWindows ? (
						<div className="recipe-buttons">
							<button
								ref={(ref) => (this.refMinimize = ref)}
								className="btn-menubar minimize"
							>
								<SvgIcon name="minimize" />
							</button>
							<button
								ref={(ref) => (this.refMaximize = ref)}
								className="btn-menubar maximize"
							>
								<SvgIcon
									name={maximize ? 'maximized' : 'maximize'}
								/>
							</button>
							<button
								ref={(ref) => (this.refClose = ref)}
								className="btn-menubar close"
							>
								<SvgIcon name="close" />
							</button>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

TopMenuNotExtended.defaultProps = {
	onClickSettings: PropTypes.func,
};

const mapStateToProps = (state) => {
	const { query } = state.search;
	return { query };
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSelectedMenu: (selectedMenu) =>
			ReduxHelpers.setSelectedMenu(dispatch, selectedMenu),
		setQuery: (query) =>
			dispatch({ type: SET_SEARCH_QUERY, payload: query }),
		setRecipeList: (selectedMenu, query) =>
			ReduxHelpers.fillRecipes(dispatch, selectedMenu, query),
	};
};

const TopMenu = hoistStatics(
	withTranslation()(TopMenuNotExtended),
	TopMenuNotExtended
);

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
