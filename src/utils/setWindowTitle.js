import path from 'path';

const setWindowTitle = (filepath) => {
	if (!filepath)
		document.title = 'Muzzio';

	const name = path.basename(filepath, '.muz');

	document.title = `Muzzio - ${name}`;
};

export default setWindowTitle;
