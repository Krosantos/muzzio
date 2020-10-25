import fs from 'fs';
import { useCallback } from 'react';

type UseLoad = ()=>(filePath:string)=>void
const useLoad:UseLoad = () => {
  const load = useCallback((filePath) => {
    try {
      const raw = fs.readFileSync(filePath).toString('utf8');

      return JSON.parse(raw);
    } catch (e) {
      return {};
    }
  }, []);

  return load;
};

export default useLoad;