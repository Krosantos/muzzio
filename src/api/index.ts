import axios from "axios";

const createConnection = () => {
  const connection = axios.create({
    baseURL: "https://api.scryfall.com/cards/",
    timeout: 10000,
  });

  return connection;
};

export default createConnection();
