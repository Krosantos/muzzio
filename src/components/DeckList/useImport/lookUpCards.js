import getList from '@api/getList';

const sanitizeLine = (line) => {
	const noNumbers = line.replace(/\d /, '');
	const noSet = noNumbers.replace(/\[.*\]/, '');

	return noSet;
};

const splitIntoLines = (rawData) => rawData.split(/[\r\n]+/g);

const convertToPostBody = (lines) => {
	const result = [];

	lines.forEach((line) => {
		if (!line)
			return;
		result.push({ name: line });
	});
	return result;
};

const lookUpCards = async (rawData) => {
	const rawLines = splitIntoLines(rawData);
	const lines = rawLines.map(sanitizeLine);
	const postBody = convertToPostBody(lines);

	const cards = await getList(postBody);

	return cards.filter((card) => !card.type.includes('Basic Land'));
};

export default lookUpCards;
