import React, { useEffect, useState } from 'react';

const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState<string>('Checking...');

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        const response = await fetch('http://localhost:9003/api/search/health');
        const data = await response.text();
        setStatus(data);
      } catch (error) {
        setStatus('Error fetching health status');
      }
    };

    fetchHealthStatus();
  }, []);

  return (
    <div>
      <h1>Health Check</h1>
      <p>Status: {status}</p>
    </div>
  );
};

export default HealthCheck;
