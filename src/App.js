import React, { useState, useEffect } from 'react';
import Screensaver from './components/Screensaver';

const App = () => {
  const [idleTime, setIdleTime] = useState(0);
  const idleLimit = 60; // Time in seconds

  useEffect(() => {
    const incrementIdleTime = () => setIdleTime((prevTime) => prevTime + 1);
    const resetIdleTime = () => setIdleTime(0);

    const activityEvents = ['mousemove', 'keypress', 'touchstart'];

    const handleActivity = () => {
      resetIdleTime();
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    const idleInterval = setInterval(incrementIdleTime, 1000);

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearInterval(idleInterval);
    };
  }, []);

  const isScreensaverActive = idleTime >= idleLimit;

  return (
    <div>
      <Screensaver isActive={isScreensaverActive} />
      <div>Your Web App Content Here</div>
    </div>
  );
};

export default App;
