import { useEffect, useState } from 'react';

const useLocalStorageCompare = (searches) => {
  const [matches, setMatches] = useState([]);
  const [newData, setNewData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storageData = localStorage.getItem('cpbsearches-stream');

    if (!storageData) {
      setError({ message: 'No data found in localStorage' });
      return;
    }

    let parsedData;
    try {
      parsedData = JSON.parse(storageData);
    } catch (e) {
      setError({ message: 'Failed to parse data in localStorage' });
      return;
    }

    if (!parsedData || typeof parsedData !== 'object') {
      setError({ message: 'Data in localStorage is not an object' });
      return;
    }

    setMatches(parsedData);

    localStorage.removeItem('cpbsearches-stream');
  }, []);

  return { matches, newData: [], error };
};

export default useLocalStorageCompare;
