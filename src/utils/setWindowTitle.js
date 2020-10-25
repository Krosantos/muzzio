import path from 'path';

const setWindowTitle = (filepath) => {
  if (!filepath) {
    document.title = 'Muzzio';
    return;
  }
  const name = path.basename(filepath, '.muz');

  document.title = `Muzzio - ${name}`;
};

export default setWindowTitle;
