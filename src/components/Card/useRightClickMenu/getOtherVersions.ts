import { Menu } from "electron";

const { MenuItem } = require("electron").remote;

type GetRemoveLine = (menu: Menu, openVariantModal: () => void) => void;
const getOtherVersions: GetRemoveLine = (menu, openVariantModal) => {
  menu.append(
    new MenuItem({
      click() {
        openVariantModal();
      },
      label: "See other printings",
    }),
  );
};

export default getOtherVersions;
