import get from 'lodash/get';
import trim from 'lodash/trim';
import isEmpty from 'lodash/isEmpty';
import getList from '@api/getList';

const COUNT_REGEX = /\d /;
const SET_REGEX = /\[.*\]/;
const SINGLE_LINE_REGEX = /[\n\r]+/g;
const DOUBLE_LINE_REGEX = /[\n\r]{2}(?=[\n\r])/g;

type CountMap = {[name:string]:number}

type ParseLine = (line:string)=>{count:number; name:string}
const parseLine:ParseLine = (line) => {
  const noNumbers = line.replace(COUNT_REGEX, '');
  const rawName = noNumbers.replace(SET_REGEX, '');
  const name = trim(rawName.toLowerCase());
  const countMatch = line.match(COUNT_REGEX);
  const rawCount = get(countMatch, 0, '1');
  const count = parseInt(rawCount, 10);

  return { count, name };
};

type SplitIntoLines = (rawData:string)=>string[]
const splitIntoLines:SplitIntoLines = (rawData) => rawData.split(SINGLE_LINE_REGEX);

type GetCountMap = (rawData:string)=>CountMap
const getCountMap:GetCountMap = (rawData) => {
  const lines = splitIntoLines(rawData);
  const countMap:CountMap = {};

  lines.forEach((line) => {
    const { count, name } = parseLine(line);

    if (!isEmpty(name))
      countMap[name] = count;
  });
  return countMap;
};

type ConvertToPostBody = (
  mainCount:CountMap,
  sideCount: CountMap
)=>{name:string}[]
const convertToPostBody:ConvertToPostBody = (mainCount = {}, sideCount = {}) => {
  const result:{name:string}[] = [];
  const cards = [].concat(Object.keys(mainCount), Object.keys(sideCount));

  cards.forEach((card) => {
    if (!card)
      return;
    result.push({ name: card });
  });
  return result;
};

type LookUpCards = (rawData:string, isSingleton:boolean)=>Promise<Card[]>
const lookUpCards:LookUpCards = async (rawData, isSingleton) => {
  const [maindeck = '', sideboard = ''] = rawData.split(DOUBLE_LINE_REGEX);
  const defaultCount = isSingleton ? 1 : 0;
  const mainCount = getCountMap(maindeck);
  const sideCount = getCountMap(sideboard);

  const postBody = convertToPostBody(mainCount, sideCount);

  const cards = await getList(postBody);

  return cards.map((card) => {
    const { name = '' } = card;
    const count = mainCount[name.toLowerCase()] || defaultCount;
    const sideboardCount = sideCount[name.toLowerCase()] || 0;

    return { ...card, count, sideboardCount };
  });
};

export default lookUpCards;
