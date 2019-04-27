const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');
/* eslint-disable no-console */
const installReduxTools = () => {
	installExtension(REDUX_DEVTOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));
};

module.exports = installReduxTools;
