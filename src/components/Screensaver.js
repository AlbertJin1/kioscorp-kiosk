import React, { useState, useEffect } from 'react';
import img1 from '../img/Screensaver/screensaver1.png';
import img2 from '../img/Screensaver/screensaver2.png';
import img3 from '../img/Screensaver/screensaver3.png';

const photos = [img1, img2, img3];

const Screensaver = ({ isActive }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setFade(false);
                setTimeout(() => {
                    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
                    setFade(true);
                }, 1000); // Match this duration with the CSS transition duration
            }, 6000); // Change image every 6 seconds (5 seconds display + 1 second transition)
        }
        return () => clearInterval(interval);
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div style={styles.screensaver}>
            <img
                src={photos[currentPhotoIndex]}
                alt="Screensaver"
                style={{
                    ...styles.image,
                    opacity: fade ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                }}
            />
        </div>
    );
};

const styles = {
    screensaver: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
};

export default Screensaver;
