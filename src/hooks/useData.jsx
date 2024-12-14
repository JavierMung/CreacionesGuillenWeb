import { useContext } from 'react';
import { DatabaseDataContext } from '../components/DatabaseDataProvider';

const useData = () => {
  const context = useContext(DatabaseDataContext);
  if (!context) {
    throw new Error('useData debe ser usado dentro de DataProvider');
  }
  return context;
};

export default useData;
