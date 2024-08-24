import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ViewModal = ({ isOpen, onClose, product }) => {
    const [showing, setShowing] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShowing(true);
        } else {
            // Delay hiding the modal to allow the fade-out animation to complete
            const timer = setTimeout(() => setShowing(false), 300); // Match with fade-out duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!showing) return null;

    const availabilityStyle = {
        fontSize: '1.4em',
        fontWeight: 'bold',
        margin: '15px 0',
        color: product.available ? 'green' : 'red',
    };

    return ReactDOM.createPortal(
        <div style={{ ...modalStyles.overlay, ...(isOpen ? modalStyles.overlayOpen : modalStyles.overlayClose) }}>
            <div style={{ ...modalStyles.container, ...(isOpen ? modalStyles.containerOpen : modalStyles.containerClose) }}>
                <div style={modalStyles.header}>
                    <h2 style={modalStyles.name}>{product.name}</h2>
                    <button style={modalStyles.closeButton} onClick={onClose}>X</button>
                </div>
                <img src={product.imageUrl || 'default-product-image-url'} alt={product.name} style={modalStyles.image} />
                <p style={availabilityStyle}>
                    {product.available ? 'Available' : 'Out of Stock'}
                </p>
                <p style={modalStyles.price}>{product.price ? product.price : 'Not Available'}</p>
                <p style={modalStyles.description}>{product.description || 'No description available'}</p>
            </div>
        </div>,
        document.body
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.3s ease',
        opacity: 0,
        pointerEvents: 'none', // Prevents interaction when fading out
    },
    overlayOpen: {
        opacity: 1,
        pointerEvents: 'auto',
    },
    overlayClose: {
        opacity: 0,
        pointerEvents: 'none',
    },
    container: {
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '80%',
        maxWidth: '600px',
        position: 'relative',
        transform: 'translateY(-50px)',
        opacity: 0,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
    },
    containerOpen: {
        transform: 'translateY(0)',
        opacity: 1,
    },
    containerClose: {
        transform: 'translateY(-50px)',
        opacity: 0,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
    },
    closeButton: {
        background: 'red',
        border: 'none',
        color: 'white',
        margin: 0,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.5em',
    },
    image: {
        width: '80%',
        height: 'auto',
        borderRadius: '10px',
        margin: '0 auto', // Center the image horizontally
        display: 'block', // Ensure the image is block-level to center
    },
    name: {
        fontSize: '1.8em',
        margin: 0,
    },
    price: {
        fontSize: '2em',
        fontWeight: 'bold',
        color: '#f8bc28',
    },
    description: {
        marginTop: '10px',
        fontSize: '1.1em',
    },
};

export default ViewModal;
