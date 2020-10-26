import {
  COMMANDER,
  OATHBREAKER,
  STANDARD,
  PIONEER,
  MODERN,
  PAUPER,
  LEGACY,
  VINTAGE,
} from '@constants';

const { app } = require('electron').remote;

const isMac = process.platform === 'darwin';

const macMenu = {
  label: app.getName(),
  submenu: [
    { role: 'about' },
    { type: 'separator' },
    { role: 'hide' },
    { role: 'hideothers' },
    { role: 'unhide' },
    { type: 'separator' },
    { role: 'quit' },
  ],
};

const viewMenu = {
  label: 'View',
  submenu: [
    { role: 'reload' },
    process.env.FROM_LOCAL
      ? { role: 'toggledevtools' }
      : { type: 'separator' },
    { role: 'resetzoom' },
    { accelerator: 'CommandOrControl+=', role: 'zoomin' },
    { role: 'zoomout' },
    { type: 'separator' },
    { role: 'togglefullscreen' },
  ],
};

type Callbacks = {
  changeFormat: (format:string)=>void;
  refreshCards:()=>void;
  newDeck:()=>void;
  loadDeck:()=>void;
  saveDeck:()=>void;
  saveDeckAs:()=>void;
}
type TemplateItem = {
  label: string;
  submenu: unknown[];
}
type Template = TemplateItem[]

type GetFileMenu = (callbacks:Callbacks)=>TemplateItem
const getFileMenu:GetFileMenu = ({
  changeFormat,
  refreshCards,
  newDeck,
  loadDeck,
  saveDeck,
  saveDeckAs,
}) => ({
  label: 'File',
  submenu: [
    { accelerator: 'CommandOrControl+N', click: newDeck, label: 'New Deck' },
    { accelerator: 'CommandOrControl+O', click: loadDeck, label: 'Open Deck' },
    { type: 'separator' },
    {
      label: 'Change Format',
      submenu: [
        { accelerator: 'Shift+Alt+C', click: changeFormat(COMMANDER), label: 'Commander' },
        { accelerator: 'Shift+Alt+O', click: changeFormat(OATHBREAKER), label: 'Oathbreaker' },
        { accelerator: 'Shift+Alt+S', click: changeFormat(STANDARD), label: 'Standard' },
        { accelerator: 'Shift+Alt+I', click: changeFormat(PIONEER), label: 'Pioneer' },
        { accelerator: 'Shift+Alt+M', click: changeFormat(MODERN), label: 'Modern' },
        { accelerator: 'Shift+Alt+P', click: changeFormat(PAUPER), label: 'Pauper' },
        { accelerator: 'Shift+Alt+L', click: changeFormat(LEGACY), label: 'Legacy' },
        { accelerator: 'Shift+Alt+V', click: changeFormat(VINTAGE), label: 'Vintage' },
      ],
    },
    { type: 'separator' },
    { accelerator: 'CommandOrControl+Alt+R', click: refreshCards, label: 'Refresh Card Data' },
    { type: 'separator' },
    { accelerator: 'CommandOrControl+S', click: saveDeck, label: 'Save Deck' },
    { accelerator: 'CommandOrControl+Shift+S', click: saveDeckAs, label: 'Save As' },
    { type: 'separator' },
    isMac ? { role: 'close' } : { role: 'quit' },
  ],
});

const windowMenu = {
  label: 'Window',
  submenu: [
    { role: 'minimize' },
    ...(isMac ? [
      { type: 'separator' },
      { role: 'front' },
      { type: 'separator' },
      { role: 'window' },
    ] : [
      { role: 'close' },
    ]),
  ],
};

type GenerateTemplate = (callbacks:Callbacks)=>Template;
const generateTemplate:GenerateTemplate = (callbacks) => {
  const template:Template = [];

  if (isMac)
    template.unshift(macMenu);
  template.push(getFileMenu(callbacks));
  template.push(viewMenu);
  template.push(windowMenu);
  return template;
};

export default generateTemplate;
