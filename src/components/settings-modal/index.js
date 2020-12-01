import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { remote, shell } from 'electron';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import Modal from '../modal';
import i18n from '../i18n';
import { TextField } from '../form-elements';
import { NotyHelpers, ReduxHelpers, StorageHelpers } from '../../core/helpers';
import { openConfirmDialog } from '../confirm-dialog';
import SvgIcon from '../svgicon';
import { MainMenus } from '../../core/constants';
import { appname, version, author, links } from '../../../package.json';

import './style.scss';

class SettingsModalNotExtended extends React.Component {
	state = {
		dbDirectory: '',
		backupDirectory: '',
		backupFiles: [],
		appTheme: 'athens',
		appLang: 'en'
	};

	componentDidMount() {
		const dbDirectory = StorageHelpers.preference.get( 'storagePath' );
		const backupDirectory = StorageHelpers.preference.get( 'backupPath' );
		const appTheme = StorageHelpers.preference.get( 'appTheme' ) || 'athens';
		const appLang = StorageHelpers.preference.get( 'appLang' ) || 'en';
		i18n.changeLanguage( appLang );
		this.setState( { dbDirectory, backupDirectory, appTheme, appLang } );
		this.listBackupFiles();
	}

	onClickTabHeader = selectedTab => {
		const { tabChanged } = this.props;
		tabChanged && tabChanged( selectedTab );
	};

	openmoveStorage = type => {
		const { t, setRecipeList } = this.props;
		const feather = require( 'feather-icons' );

		const dir = remote.dialog.showOpenDialogSync( { properties: [ 'openDirectory' ] } );

		if ( undefined !== dir ) {
			if ( 'move' === type ) {
				StorageHelpers.moveDb( dir[0] );
				NotyHelpers.open( feather.icons.folder.toSvg() + t( 'Storage directory succesfully moved!' ), 'success', 1500 );
			} else {
				NotyHelpers.open( feather.icons.folder.toSvg() + t( 'New Storage directory succesfully set!' ), 'success', 1500 );
				StorageHelpers.preference.set( 'storagePath', dir[0] );
				setRecipeList();
			}
			this.setState( { dbDirectory: dir[0] } );
		}
	};

	changeOrBackupNow = type => {
		const { t } = this.props;
		const feather = require( 'feather-icons' );

		if ( 'change' === type ) {
			const dir = remote.dialog.showOpenDialogSync( { properties: [ 'openDirectory' ] } );

			if ( undefined !== dir ) {
				StorageHelpers.preference.set( 'backupPath', dir[ 0 ] );
				NotyHelpers.open( feather.icons.folder.toSvg() + t( 'Backups directory succesfully changed!' ), 'success', 1500 );
				this.setState( { backupDirectory: dir[ 0 ] } );
			}
		} else {
			StorageHelpers.backupNow();
			this.listBackupFiles();
			NotyHelpers.open( feather.icons.archive.toSvg() + t( 'Backup was successful!' ), 'success', 1500 );
		}
	};

	restoreFromBackup = file => {
		const { t, setRecipeList } = this.props;
		const feather = require( 'feather-icons' );

		openConfirmDialog( {
			title: t( 'Confirmation' ),
			text: t( 'Are you sure want to restore a backup? The current datas will be overwritten!' ),
			buttons: [
				{
					label: t( 'Yes' ),
					onClick: () => {
						StorageHelpers.restoreDb( file.filePath );
						NotyHelpers.open( feather.icons.database.toSvg() + t( 'Backup restored successfully!' ), 'success', 1500 );
						setRecipeList();
					},
					className: 'btn btn-success'
				}, {
					label: t( 'No' ),
					onClick: () => null,
					className: 'btn btn-default'
				}
			]
		} );
	};

	listBackupFiles = () => {
		const backupFiles = StorageHelpers.backupFiles();
		this.setState( { backupFiles } );
	};

	openLinkInBrowser = async slug => {
		await shell.openExternal( links[ slug ] );
	};

	changeTheme = appTheme => {
		document.body.classList.remove( 'athens-theme' );
		document.body.classList.remove( 'teal-theme' );
		document.body.classList.add( `${ appTheme }-theme` );
		StorageHelpers.preference.set( 'appTheme', appTheme );

		this.setState( { appTheme } );
	};

	changeLanguage = appLang => {
		StorageHelpers.preference.set( 'appLang', appLang );
		i18n.changeLanguage( appLang );
		this.setState( { appLang } );
	};

	onClose = () => {
		const { onClose } = this.props;
		onClose && onClose();
    };

	_headerIcons = () => {
        return (
            <div className='header-buttons'>
                <span onClick={this.onClose}>
                    <SvgIcon name='cancel'/>
                </span>
            </div>
        );
    };

	render() {
		const { dbDirectory, backupDirectory, backupFiles, appTheme, appLang } = this.state;
		const { t, show, onClose, selectedTab } = this.props;

		return ( <div className='comp_settings-modal'>
			<Modal
				show={show}
				onClose={onClose}
				title={'Preferences'}
				headerIconsTemplate={this._headerIcons}
			>

				<div className='tabs-header-container'>
					<ul>
						<li className={ 'storage' === selectedTab ? 'active' : ''} onClick={() => this.onClickTabHeader( 'storage' )}>
							<span>{ t( 'Storage' ) }</span>
						</li>
						<li className={ 'themes' === selectedTab ? 'active' : ''} onClick={() => this.onClickTabHeader( 'themes' )}>
							<span>{ t( 'Theme' ) }</span>
						</li>
						<li className={ 'language' === selectedTab ? 'active' : ''} onClick={() => this.onClickTabHeader( 'language' )}>
							<span>{ t( 'Language' ) }</span>
						</li>
						<li className={ 'update' === selectedTab ? 'active' : ''} onClick={() => this.onClickTabHeader( 'update' )}>
							<span>{ t( 'Update' ) }</span>
						</li>
						<li className={ 'help' === selectedTab ? 'active' : ''} onClick={() => this.onClickTabHeader( 'help' )}>
							<span>{ t( 'Help' ) }</span>
						</li>
						<li className={ 'about' === selectedTab ? 'active' : ''} onClick={() => this.onClickTabHeader( 'about' )}>
							<span>{ t( 'About' ) }</span>
						</li>
					</ul>
				</div>
				<div className='tabs-content-container'>
					<div className={`content${ 'storage' === selectedTab ? ' active' : '' }`}>
						<div className='storage-directory-container'>
							<div className='sub-title'>{ t( 'Storage Directory' ) }</div>
							<div className='info'>{ t( 'To use sync services like iCloud, Google Drive or Dropbox, simply move storage to the corresponding synced folders.' ) }
							</div>

							<div className='form-container'>
								<div className='input-container'>
									<TextField name={''} readOnly={true} value={dbDirectory}/>
								</div>
								<div className='buttons-container'>
									<button className='btn btn-default' onClick={() => this.openmoveStorage( 'open' )}>
										{ t( 'Open existing Storage folder' ) }
									</button>
									<button className='btn btn-default' onClick={() => this.openmoveStorage( 'move' )}>
										{ t( 'Move Storage folder' ) }
									</button>
								</div>
							</div>
						</div>

						<div className='storage-directory-backups-container'>
							<div className='sub-title'>{ t( 'Backups Directory' ) }</div>
							<div className='info'>
								{ t( 'Backup will be automatically created every 6 hours when app is running.' ) }
							</div>

							<div className='form-container'>
								<div className='input-container'>
									<TextField name={''} readOnly={true} value={backupDirectory}/>
								</div>
								<div className='buttons-container'>
									<button className='btn btn-default' onClick={() => this.changeOrBackupNow( 'change' )}>
										{ t( 'Select backup folder' ) }
									</button>
									<button className='btn btn-default' onClick={() => this.changeOrBackupNow( 'backup' )}>
										{ t( 'Backup now' ) }
									</button>
								</div>
							</div>
						</div>

						<div className='storage-restore-container'>
							<div className='sub-title'>{ t( 'Restore a backup' ) }</div>
							<div className='info'>
								{ t( 'Last backups are listed here. You can choose one to restore. Please be warned! No going back!' ) }
								<br />
								{ t( 'Do a backup before restoring' ) }
							</div>

							<ul>
								{
									backupFiles.map( ( file, index ) => {
										return ( <li key={`restore_item_${ index }`}>
											<div className='name'>{
													file.name
												}</div>
											<span onClick={() => this.restoreFromBackup( file )}>{ t( 'Restore' ) }</span>
										</li> );
									} )
								}
							</ul>
						</div>

					</div>
					<div className={`content${ 'themes' === selectedTab ? ' active' : '' }`}>
						<div className='theme-section'>
							<ul>
								<li onClick={() => this.changeTheme( 'athens' )} className={ 'athens' === appTheme ? 'active' : ''}>
									<div className='image-container'>
										<img src={'./images/themes/athens.png'} alt='Athens' width={240}/>
									</div>
								</li>
								<li onClick={() => this.changeTheme( 'teal' )} className={ 'teal' === appTheme ? 'active' : ''}>
									<div className='image-container'>
										<img src={'./images/themes/teal.png'} alt='Teal' width={240}/>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className={`content${ 'language' === selectedTab ? ' active' : '' }`}>
						<div className='language-section'>
							<ul>
								<li onClick={() => this.changeLanguage( 'de' )} className={ 'de' === appLang ? 'active' : ''}>
									<div className='text-container'>Deutsch</div>
								</li>
								<li onClick={() => this.changeLanguage( 'en' )} className={ 'en' === appLang ? 'active' : ''}>
									<div className='text-container'>English</div>
								</li>
								<li onClick={() => this.changeLanguage( 'fr' )} className={ 'fr' === appLang ? 'active' : ''}>
									<div className='text-container'>Français</div>
								</li>
							</ul>
						</div>
					</div>
					<div className={`content${ 'update' === selectedTab ? ' active' : '' }`}>
						<div className='update-section'>
							<div className='info'>
								{ t( 'You are using' ) }
								<b> {appname} </b>
								{ t( 'version' ) }
								<b> {version}</b>
							</div>
							<button className='btn btn-default' onClick={() => this.openLinkInBrowser( 'releases' )}>
								{ t( 'Check for updates' ) }
							</button>
						</div>
					</div>
					<div className={`content${ 'help' === selectedTab ? ' active' : '' }`}>
						<div className='help-section'>
							<div className='sub-title'>
								<span>
									{ t( 'Keyboard Shortcuts' ) }
								</span>
							</div>
							<div className='info'>
								<table>
									<tbody>
										<tr>
											<td>{ t( 'Ctrl ,' ) } <span className='tiny-text'>{ t( '(Windows & Linux)' ) }</span> { t( 'or' ) } &#8984; ; <span className='tiny-text'>{ t( '(Mac)' ) }</span></td>
											<td>{ t( 'Preferences' ) }</td>
										</tr>
										<tr>
											<td>{ t( 'Ctrl b' ) } <span className='tiny-text'>{ t( '(Windows & Linux)' ) }</span> { t( 'or' ) } &#8984; b <span className='tiny-text'>{ t( '(Mac)' ) }</span></td>
											<td>{ t( 'Hide / Show Sidebar' ) }</td>
										</tr>
										<tr>
											<td>{ t( 'Ctrl n' ) }<span className='tiny-text'>{ t( '(Windows & Linux)' ) }</span> { t( 'or' ) } &#8984; n <span className='tiny-text'>{ t( '(Mac)' ) }</span></td>
											<td>{ t( 'New recipe' ) }</td>
										</tr>
										<tr>
											<td>F11 <span className='tiny-text'>{ t( '(Windows & Linux)' ) }</span> { t( 'or' ) } ^ &#8984; F <span className='tiny-text'>{ t( '(Mac)' ) }</span></td>
											<td>{ t( 'Toggle Fullscreen' ) }</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className={`content${ 'about' === selectedTab ? ' active' : '' }`}>
						<div className='about-section'>
							<img src={'./images/logo/birds-kitchen.png'} width={100} alt='Birds Kitchen'/>
							<div className='product-name'>Birds Kitchen
								<br />
								<small>{version}</small>
							</div>
							<div className='description'>{ t( 'A free and open source recipe manager' ) }</div>
							<div className='about-details'>
								<div className='text'>{ t( 'Created by' ) }</div>
								<div className='author' onClick={() => this.openLinkInBrowser( 'author-page' )}>
									{author.name}
								</div>
								<div className='link-list'>
									<div className='link' onClick={() => this.openLinkInBrowser( 'project-page' )}>
										{ t( 'GitHub Repository' ) }
									</div>
									<div className='link' onClick={() => this.openLinkInBrowser( 'license' )}>
										{ t( 'License' ) }
									</div>
									<div className='link' onClick={() => this.openLinkInBrowser( 'changelog' )}>
										{ t( 'Changelog' ) }
									</div>
									<div className='link' onClick={() => this.openLinkInBrowser( 'issues' )}>
										{ t( 'Report an issue' ) }
									</div>
							</div>
							</div>

						</div>
					</div>
				</div>
			</Modal>
		</div> );
	}
}

SettingsModalNotExtended.propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
	selectedTab: PropTypes.string,
	tabChanged: PropTypes.func
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		setRecipeList: () => ReduxHelpers.fillRecipes( dispatch, MainMenus[ 0 ] )
	};
};

const SettingsModal = hoistStatics( withTranslation()( SettingsModalNotExtended ), SettingsModalNotExtended );

export default connect( null, mapDispatchToProps )( SettingsModal );
