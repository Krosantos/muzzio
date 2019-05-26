const fs = require('fs');
const path = require('path');
const ncp = require('ncp');
const cleanFolders = require('./cleanFolders');

/*
When we run electron-packager, we need all our files in one place: bundled .js, entry html, static assets,
package.json, and the main electron kick-off script. This script moves and stages those pieces.
*/
cleanFolders();
const stagingPath = path.resolve(__dirname, '../staging');
const compilePath = path.resolve(__dirname, '../compiled');

fs.mkdirSync(stagingPath);
fs.mkdirSync(compilePath);
// Move electron/index.js to the staging folder
fs.copyFileSync(path.resolve(__dirname, 'index.js'), `${stagingPath}/index.js`);
// Copy over package.json, but modify the "main" property.
const packageJson = require('../package.json');

const newPackage = { ...packageJson, main: './index.js' };

fs.writeFileSync(`${stagingPath}/package.json`, JSON.stringify(newPackage, null, 2));
// Copy over our bootstrappy HTML, and our bundle.
fs.copyFileSync(path.resolve(__dirname, '../src/static', 'index.html'), `${stagingPath}/index.html`);
fs.copyFileSync('./dist/bundle.js', `${stagingPath}/bundle.js`);
// Copy over static assets.
fs.readdirSync('./src/static').forEach((file) => {
	const curPath = `./src/static/${file}`;

	if (fs.lstatSync(curPath).isDirectory())
		ncp(curPath, `${stagingPath}/${file}`);
});
