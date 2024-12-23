import { useState, useEffect } from 'react';
import axios from 'axios';

interface TrackedPage {
  id: string;
  url: string;
  status: string;
  detectedDate: string;
}

export function useTrackedPages() {
  const [trackedPages, setTrackedPages] = useState<TrackedPage[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTrackedPages = async () => {
    try {
      const response = await axios.get('/api/pages/tracked');
      setTrackedPages(response.data.pages);
      setTotalPages(response.data.total);
    } catch (error) {
      console.error('Error fetching tracked pages:', error);
    }
  };

  useEffect(() => {
    fetchTrackedPages();
  }, []);

  return { trackedPages, totalPages, refreshPages: fetchTrackedPages };
}
