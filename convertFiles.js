const fs = require("fs");

const folderRoot = "C:\\Users\\tymko\\Documents\\github\\muzzio-decks";
const targetRoot = "C:\\Users\\tymko\\Documents\\github\\mazzio-docks";

const readAndParse = (path) => {
  const raw = fs.readFileSync(path, "utf-8");
  return JSON.parse(raw);
};

const convertFile = (inPath, outPath) => {
  const old = readAndParse(inPath);

  const toWrite = {
    format: old.format,
    commanderData: old.commanderData,
    oathbreakerData: old.oathbreakerData,
  };

  const attributes = {};
  const cardData = {};
  const cardsInDeck = {};
  const cardsInSideboard = {};

  for (let att of old.attributes) {
    attributes[att] = {
      name: att,
      cards: {},
    };
  }

  const cardNames = Object.keys(old.cards);
  for (let name of cardNames) {
    const _card = old.cards[name];
    const card = { ..._card };
    delete card.count;
    delete card.sideboardCount;
    delete card.attributes;
    cardData[name] = card;

    if (_card.count > 0) cardsInDeck[name] = _card.count;
    if (_card.sideboardCount > 0) cardsInSideboard[name] = _card.sideboardCount;

    let cardAttributes = Object.keys(_card.attributes);
    for (let att of cardAttributes) {
      if (!!attributes?.[att]?.cards) attributes[att].cards[name] = true;
    }
  }

  toWrite.attributes = { attributes };
  toWrite.cards = {
    cardData,
    cardsInDeck,
    cardsInSideboard,
  };

  const strung = JSON.stringify(toWrite, null, 2);

  const chunks = outPath.split("\\");
  chunks.pop();
  const directoryPath = chunks.join("\\");
  try {
    fs.mkdirSync(directoryPath, { recursive: true });
  } catch {}
  fs.writeFileSync(outPath, strung);
};

const recurseTree = (path) => {
  const stat = fs.statSync(path);
  if (!stat.isDirectory()) return [];
  let paths = fs.readdirSync(path);

  let deckFiles = paths
    .filter((path) => path.endsWith(".muz"))
    .map((p) => `${path}\\${p}`);
  const maybeDirs = paths.filter((path) => !path.endsWith(".muz"));

  for (let maybeDir of maybeDirs) {
    const subPath = `${path}\\${maybeDir}`;
    deckFiles = deckFiles.concat(recurseTree(subPath));
  }

  return deckFiles;
};

const convertFiles = () => {
  const filesToTarget = recurseTree(folderRoot);

  for (let file of filesToTarget) {
    const writePath = file.replace(folderRoot, targetRoot);
    convertFile(file, writePath);
  }
};

convertFiles();
