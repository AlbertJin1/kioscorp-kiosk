import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Screensaver from './components/Screensaver';
import CategorySelect from './components/CategorySelect';
import Auto from './components/Auto'; // Create this component
import Bolts from './components/Bolts'; // Create this component

const App = () => {
  const [idleTime, setIdleTime] = useState(0);
  const idleLimit = 30000; // Time in seconds

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
    <Router>
      <div>
        <Screensaver isActive={isScreensaverActive} />
        {!isScreensaverActive ? (
          <Routes>
            <Route path="/" element={<CategorySelect />} />
            <Route path="/auto" element={<Auto />} />
            <Route path="/bolts" element={<Bolts />} />
          </Routes>
        ) : (
          <Navigate to="/" replace />
        )}
      </div>
    </Router>
  );
};

export default App;
