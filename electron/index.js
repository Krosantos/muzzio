const url = require('url');
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Keep a global reference of the window object, to spare it from garbage collection.
let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		height: 900,
		minHeight: 900,
		minWidth: 1280,
		webPreferences: {
			webSecurity: false,
		},
		width: 1280,
	});
	// Check for content either from local (when developing), or from compoiled code.
	if (process.env.FROM_LOCAL) {
		mainWindow.loadURL('http://localhost:3000');
		const installReduxTools = require('./installReduxTools'); /* eslint-disable-line global-require */

		installReduxTools();
	} else {
		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, './index.html'),
			protocol: 'file:',
			slashes: true,
		}));
	}
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
// Mac behaves wacky. Emulate that.
	if (process.platform !== 'darwin')
		app.quit();
});
app.on('activate', () => {
// Open a new window if there ain't one (mostly for Mac's benefit.)
	if (mainWindow === null)
		createWindow();
});
