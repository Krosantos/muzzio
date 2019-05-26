const fs = require('fs');
const path = require('path');

const cleanFolders = ({ killDist } = {}) => {
	const stagingPath = path.resolve(__dirname, '../staging');
	const compilePath = path.resolve(__dirname, '../compiled');
	const distPath = path.resolve(__dirname, '../dist');
	const deleteFolderRecursive = (filePath) => {
		if (fs.existsSync(filePath)) {
			fs.readdirSync(filePath).forEach((file) => {
				const curPath = `${filePath}/${file}`;

				// Recurse
				if (fs.lstatSync(curPath).isDirectory()) {
					deleteFolderRecursive(curPath);
				} else {
					// Delete file
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(filePath);
		}
	};
	// Wipe out the folders.

	deleteFolderRecursive(stagingPath);
	deleteFolderRecursive(compilePath);
	if (killDist)
		deleteFolderRecursive(distPath);
};

module.exports = cleanFolders;
