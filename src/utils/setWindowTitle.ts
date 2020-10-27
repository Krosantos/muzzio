import path from "path";

type SetWindowTitle = (filepath?: string) => void;

const setWindowTitle: SetWindowTitle = (filepath) => {
  if (!filepath) {
    document.title = "Muzzio";
    return;
  }
  const name = path.basename(filepath, ".muz");

  document.title = `Muzzio - ${name}`;
};

export default setWindowTitle;
