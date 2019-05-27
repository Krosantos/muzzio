const url = require('url');
const { app, BrowserWindow } = require('electron');
const settings = require('electron-settings');
const path = require('path');

// Keep a global reference of the window object, to spare it from garbage collection.
let mainWindow;
const isMac = process.platform === 'darwin';

function createWindow() {
	mainWindow = new BrowserWindow({
		height: 900,
		minHeight: 900,
		minWidth: 1280,
		title: 'Muzzio',
		webPreferences: {
			nodeIntegration: true,
			webSecurity: true,
		},
		width: 1280,
	});
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
	// Check for content either from local (when developing), or from compoiled code.
	if (process.env.FROM_LOCAL) {
		mainWindow.loadURL('http://localhost:3000');
	} else {
		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, './pack/index.html'),
			protocol: 'file:',
			slashes: true,
		}));
	}
}

// Ensure that opening a .muz file loads it.
if (!isMac) {
	if (process.argv.length > 1) 
		settings.set('currentFilePath', process.argv[1])
	
} else {
	app.on('open-file', (event, path) => {
		settings.set('currentFilePath', path);
	});
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
// Mac behaves wacky. Emulate that.
	if (!isMac)
		app.quit();
});
app.on('activate', () => {
// Open a new window if there ain't one (mostly for Mac's benefit.)
	if (mainWindow === null)
		createWindow();
});
