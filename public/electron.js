const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { menu } = require('./menu');
const Store = require('./store.js');
const { autoUpdater } = require('electron-updater');

const contextMenu = require('electron-context-menu');

let mainWindow;
const isWindows = 'win32' === process.platform;

const store = new Store({
	configName: 'window-preferences',
	defaults: {
		windowBounds: {
			width: 1600,
			height: 900,
		},
	},
});


contextMenu({
	showSaveImageAs: true
});


app.on('ready', async () => {
	let { width, height } = store.get('windowBounds');

	mainWindow = new BrowserWindow({
		width: width,
		height: height,
		center: true,
		minWidth: 1600 * 0.75,
		minHeight: 900 * 0.75,
		icon: `${__dirname}/images/logo/birds-kitchen.png`,
		titleBarStyle: 'hidden',
		autoHideMenuBar: true,
		frame: !isWindows,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			worldSafeExecuteJavaScript: true,
			spellcheck: true,

		},
	});

	mainWindow
		.loadURL(
			isDev
				? 'http://localhost:3000'
				: `file://${path.join(__dirname, '../build/index.html')}`
		)
		.then((r) => r);

	mainWindow.on('resize', () => {
		let { width, height } = mainWindow.getBounds();
		store.set('windowBounds', { width, height });
	});

	const prefs = globalShortcut.register('CommandOrControl+,', () => {
		if (mainWindow === BrowserWindow.getFocusedWindow()) {
			mainWindow.webContents.send('appMenu', {
				type: 'preferences',
				tab: 'about',
			});
		}
	});

	if (!prefs) {
		console.log('globalShortcut registration failed');
	}

	autoUpdater.checkForUpdatesAndNotify();

	mainWindow.on('closed', () => (mainWindow = null));
});

app.disableHardwareAcceleration();

app.on('will-quit', () => {
	globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
	if ('darwin' !== process.platform) {
		app.quit();
	}
});

ipcMain.on('app_version', (e) => {
	e.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
	mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
	mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
	autoUpdater.quitAndInstall();
});

ipcMain.handle(`display-app-menu`, (e, args) => {
	if (isWindows && mainWindow) {
		menu.popup({ window: mainWindow, x: args.x, y: args.y });
	}
});
