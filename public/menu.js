const { Menu, BrowserWindow } = require( 'electron' );
const isMac = 'darwin' === process.platform;

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'About', click: () => {
                    BrowserWindow.getFocusedWindow().webContents.send( 'appMenu', { type: 'preferences', tab: 'about' } );
                }
            },
            {
                label: 'Preferences...', click: () => {
                    BrowserWindow.getFocusedWindow().webContents.send( 'appMenu', { type: 'preferences', tab: 'storage' } );
                }
            },
            { type: 'separator' },
            isMac ? { role: 'quit' } : { role: 'quit' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'togglefullscreen' },
            { type: 'separator' },
            { role: 'toggledevtools' }
        ]
    }
];

const menu = Menu.buildFromTemplate( template );
Menu.setApplicationMenu( menu );
module.exports = {
    menu
};
