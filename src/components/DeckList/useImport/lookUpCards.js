import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import getList from '@api/getList';

const COUNT_REGEX = /\d /;
const SET_REGEX = /\[.*\]/;

const parseLine = (line) => {
	const noNumbers = line.replace(COUNT_REGEX, '');
	const rawName = noNumbers.replace(SET_REGEX, '');
	const name = rawName.toLowerCase();
	const countMatch = line.match(COUNT_REGEX);
	const rawCount = get(countMatch, 0, 1);
	const count = parseInt(rawCount, 10);

	return { count, name };
};

const getCountMap = (lines) => {
	const countMap = {};

	lines.forEach((line) => {
		const { count, name } = parseLine(line);

		if (!isEmpty(name))
			countMap[name] = count;
	});
	return countMap;
};

const splitIntoLines = (rawData) => rawData.split(/[\r\n]+/g);

const convertToPostBody = (countMap = {}) => {
	const result = [];
	const cards = Object.keys(countMap);

	cards.forEach((card) => {
		if (!card)
			return;
		result.push({ name: card });
	});
	return result;
};

const lookUpCards = async (rawData) => {
	const rawLines = splitIntoLines(rawData);
	const countMap = getCountMap(rawLines);
	const postBody = convertToPostBody(countMap);

	const cards = await getList(postBody);

	return cards.map((card) => {
		const { name = '' } = card;
		const count = countMap[name.toLowerCase()] || 1;

		return { ...card, count };
	});
};

export default lookUpCards;
