import get from 'lodash/get';
import formatCards from './formatCards';
import api from '.';

type GetCardById = (id:string)=>Promise<Card>
const getCardById:GetCardById = async (id) => {
  try {
    const response = await api.get<RawCard>(id);
    const card = get(response, 'data');

    return formatCards([card])[0];
  } catch {
    return {};
  }
};

export default getCardById;
