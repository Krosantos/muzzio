import get from 'lodash/get';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';
import formatCards from './formatCards';
import api from '.';

type ApiResponse = {
  data:{
    data: RawCard[];
  };
}

type GetList = (identifiers:{name:string}[])=>Promise<Card[]>
const getList:GetList = async (identifiers) => {
  const chunks = chunk(identifiers, 75);

  const calls = chunks.map((body) => api.post<ApiResponse>('collection', { identifiers: body }));
  const responses = await Promise.all(calls);

  const rawCards = responses.map((response) => get(response, 'data.data'), []);
  const flat = flatten(rawCards) as RawCard[];

  return formatCards(flat);
};

export default getList;
