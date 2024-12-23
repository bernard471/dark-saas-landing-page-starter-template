import { useState, useEffect } from 'react';
import axios from 'axios';

interface TrackedEmail {
  id: string;
  email: string;
  status: string;
  date: string;
}

export function useTrackedEmails() {
  const [trackedEmails, setTrackedEmails] = useState<TrackedEmail[]>([]);
  const [totalEmails, setTotalEmails] = useState(0);

  const fetchTrackedEmails = async () => {
    try {
      const response = await axios.get('/api/emails/tracked');
      setTrackedEmails(response.data.emails);
      setTotalEmails(response.data.total);
    } catch (error) {
      console.error('Error fetching tracked emails:', error);
    }
  };

  useEffect(() => {
    fetchTrackedEmails();
  }, []);

  return { trackedEmails, totalEmails, refreshEmails: fetchTrackedEmails };
}
