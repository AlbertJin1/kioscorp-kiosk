import React from 'react';
import Swal from 'sweetalert2';

const CartModal = ({ isOpen, onClose, cartItems, onQuantityChange, onRemove, onPrint }) => {
    if (!isOpen) return null;

    const totalPrice = cartItems.reduce(
        (total, item) => total + (parseFloat(item.price.replace('₱', '').replace(',', '')) * item.quantity),
        0
    );

    const styles = {
        modalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modalContainer: {
            width: '90%',
            maxWidth: '900px',
            background: '#fff',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
        },
        title: {
            fontSize: '2em',
            fontWeight: 'bold',
            color: '#333',
            margin: 0,
        },
        closeButton: {
            backgroundColor: '#dc3545',
            border: 'none',
            color: 'white',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '1em',
            transition: 'background-color 0.3s ease',
        },
        closeButtonHover: {
            backgroundColor: '#c82333',
        },
        cartItemsContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginBottom: '20px',
        },
        cartItem: {
            display: 'flex',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
        },
        cartItemImage: {
            width: '120px',
            height: '120px',
            borderRadius: '10px',
            marginRight: '15px',
            objectFit: 'cover',
        },
        cartItemDetails: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        cartItemName: {
            fontSize: '1.5em',
            fontWeight: 'bold',
            color: '#333',
            margin: '0',
        },
        cartItemPrice: {
            fontSize: '1.5em',
            color: '#28a745',
            fontWeight: 'bold',
            margin: '10px 0 10px 0',
        },
        quantityControls: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
        },
        quantityDisplay: {
            fontSize: '1.5em',
            fontWeight: 'bold',
            color: '#333',
        },
        quantityButton: {
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontSize: '24px',
            width: '40px',
            marginBottom: '10px',
        },
        quantityButtonHover: {
            backgroundColor: '#0056b3',
        },
        removeButton: {
            backgroundColor: '#dc3545',
            border: 'none',
            color: 'white',
            padding: '10px',
            cursor: 'pointer',
            borderRadius: '5px',
            alignSelf: 'flex-start',
            transition: 'background-color 0.3s ease',
            fontSize: '18px',
        },
        removeButtonHover: {
            backgroundColor: '#c82333',
        },
        variationSelect: {
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '10px',
        },
        cartSummary: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '1.5em',
            fontWeight: 'bold',
            color: '#333',
            margin: 0,
        },
        printButton: {
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em',
            transition: 'background-color 0.3s ease',
        },
        separator: {
            height: '2px',
            backgroundColor: '#e0e0e0',
            margin: '20px 0',
        },
        emptyCartMessage: {
            textAlign: 'center',
            fontSize: '2em',
            color: '#777',
            margin: '20px 0',
        },
    };

    const handlePrint = () => {
        Swal.fire({
            title: 'Receipt Printed!',
            text: 'Your receipt has been printed successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
        });
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContainer}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Your Cart</h2>
                    <button
                        style={styles.closeButton}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.closeButtonHover.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.closeButton.backgroundColor)}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                <div style={styles.cartItemsContainer}>
                    {cartItems.length === 0 ? (
                        <p style={styles.emptyCartMessage}>No items in cart</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} style={styles.cartItem}>
                                <img src={item.imageUrl || 'default-product-image-url'} alt={item.name} style={styles.cartItemImage} />
                                <div style={styles.cartItemDetails}>
                                    <p style={styles.cartItemName}>{item.name}</p>
                                    <p style={styles.cartItemPrice}>
                                        ₱{(parseFloat(item.price.replace('₱', '').replace(',', '')) * item.quantity).toLocaleString()}
                                    </p>
                                    <select
                                        style={styles.variationSelect}
                                        onChange={(e) => onQuantityChange({ ...item, selectedVariation: e.target.value }, item.quantity)}
                                        value={item.selectedVariation}
                                    >
                                        {item.variations.map((variation, i) => (
                                            <option key={i} value={variation}>
                                                {variation}
                                            </option>
                                        ))}
                                    </select>
                                    <div style={styles.quantityControls}>
                                        <button
                                            style={styles.quantityButton}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.quantityButtonHover.backgroundColor)}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.quantityButton.backgroundColor)}
                                            onClick={() => onQuantityChange(item, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span style={styles.quantityDisplay}>{item.quantity}</span>
                                        <button
                                            style={styles.quantityButton}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.quantityButtonHover.backgroundColor)}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.quantityButton.backgroundColor)}
                                            onClick={() => onQuantityChange(item, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        style={styles.removeButton}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.removeButtonHover.backgroundColor)}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.removeButton.backgroundColor)}
                                        onClick={() => onRemove(item)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <>
                        <div style={styles.separator} />
                        <div style={styles.cartSummary}>
                            <h3>Total: ₱{totalPrice.toLocaleString()}</h3>
                            <button style={styles.printButton} onClick={handlePrint}>
                                Print Receipt
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartModal;
