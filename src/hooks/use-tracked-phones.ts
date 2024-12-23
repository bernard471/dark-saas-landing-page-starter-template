import { useState, useEffect } from 'react';
import axios from 'axios';

interface TrackedPhone {
  id: string;
  phoneNumber: string;
  status: string;
  location: string;
  date: string;
}

export function useTrackedPhones() {
  const [trackedPhones, setTrackedPhones] = useState<TrackedPhone[]>([]);
  const [totalPhones, setTotalPhones] = useState(0);

  const fetchTrackedPhones = async () => {
    try {
      const response = await axios.get('/api/phones/tracked');
      setTrackedPhones(response.data.phones);
      setTotalPhones(response.data.total);
    } catch (error) {
      console.error('Error fetching tracked phones:', error);
    }
  };

  useEffect(() => {
    fetchTrackedPhones();
  }, []);

  return { trackedPhones, totalPhones, refreshPhones: fetchTrackedPhones };
}
