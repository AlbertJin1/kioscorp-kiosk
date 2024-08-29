import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes, FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import background from '../img/Background/background.png';
import logoImage from '../img/Logo/kioscorp.png';
import ViewModal from './PopupModal';
import CartModal from './CartModal';

// Inline styles
const styles = {
    container: {
        width: 'auto',
        height: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${background})`,
    },
    logo: {
        width: '200px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
        flexShrink: 0,
        padding: '20px 40px',
    },
    headerTitle: {
        fontSize: '3em',
        color: 'white',
        margin: 0,
        background: 'rgba(0, 59, 145, 0.6)',
        padding: '10px 50px',
        borderRadius: '20px',
    },
    headerSpan: {
        color: '#FFBD59',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
    searchInput: {
        height: '40px',
        width: '300px',
        padding: '10px 40px 10px 10px', // Added right padding to accommodate the clear icon
        fontSize: '1.5em',
        borderRadius: '20px',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
    },
    clearIcon: {
        position: 'absolute',
        right: '21%',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        fontSize: '1.5em',
        color: '#333',
    },
    cartButton: {
        background: 'rgba(40,167,69,0.5)',
        border: 'none',
        color: 'white',
        padding: '10px',
        cursor: 'pointer',
        fontSize: '1.5em',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '20px',
    },
    contentContainer: {
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
        padding: '20px',
    },
    gridContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        position: 'relative',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 380px)',
        gridTemplateRows: 'repeat(2, 380px)',
        gap: '20px',
        transition: 'opacity 0.3s ease-in-out',
    },
    productCard: {
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '20px',
        padding: '10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    productImage: {
        width: '100%',
        height: '240px',
        borderRadius: '10px',
        objectFit: 'cover',
    },
    placeholderText: {
        color: '#fff',
        fontSize: '60px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    detailsContainer: {
        background: 'rgba(0, 59, 145, 0.6)',
        borderRadius: '10px',
        padding: '20px',
        width: '300px',
        marginLeft: '20px',
        flexShrink: 1,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImageDetails: {
        width: '100%',
        height: '300px',
        borderRadius: '10px',
        objectFit: 'cover',
        marginBottom: '10px',
    },
    productName: {
        fontWeight: 'bold',
        fontSize: '1.5em',
        margin: 0,
        textAlign: 'center',
    },
    productPrice: {
        fontWeight: 'bold',
        color: '#f8bc28',
        margin: '10px 0',
        fontSize: '1.5em',
        textAlign: 'center',
    },
    productOptions: {
        marginTop: '10px',
    },
    select: {
        marginTop: '10px',
        padding: '5px',
        borderRadius: '4px',
        fontSize: '20px',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',  // Center the buttons
        gap: '10px',           // Add some space between the buttons
    },
    viewButton: {
        background: '#007bff',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        color: '#fff',
        cursor: 'pointer',
        width: '180px',         // Adjusted width for better alignment
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    addToCartButton: {
        background: '#28a745',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        color: '#fff',
        cursor: 'pointer',
        width: '180px',         // Adjusted width for better alignment
        fontSize: '36px',
        fontWeight: 'bold',
    },
    arrow: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: 'none',
        color: 'white',
        padding: '10px',
        cursor: 'pointer',
        fontSize: '1.5em',
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        margin: '10px',
        visibility: 'hidden',
    },
    leftArrow: {
        fontSize: '50px',
    },
    rightArrow: {
        fontSize: '50px',
    },
    arrowVisible: {
        visibility: 'visible',
    },
    backButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: 'none',
        color: 'white',
        padding: '10px',
        cursor: 'pointer',
        fontSize: '1.5em',
        borderRadius: '50%',
        width: '70px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    backButtonHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    stockIndicator: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    stockAvailable: {
        backgroundColor: 'green',
    },
    stockOut: {
        backgroundColor: 'red',
    },
};

const ProductList = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentBatch, setCurrentBatch] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [selectedVariation, setSelectedVariation] = useState('');


    const products = [
        { name: "BREAK SHOE", price: null, imageUrl: null, available: false, variations: [] },
        { name: "Motolite Pangmatagalan: Truck Master", price: "₱ 10,500.00", imageUrl: "https://ph-live-01.slatic.net/p/6f137545fdc0d2318765e3625bebeb05.jpg", available: true, variations: ["Standard", "Heavy Duty"] },
        { name: "Motolite Pangmatagalan: Truck Master", price: "₱ 10,500.00", imageUrl: "motolite-image-url", available: true, variations: ["Standard", "Heavy Duty"] },
        { name: "Motolite Pangmatagalan: Truck Master", price: "₱ 10,500.00", imageUrl: "motolite-image-url", available: true, variations: ["Standard", "Heavy Duty"] },
        { name: "Motolite Pangmatagalan: Truck Master", price: "₱ 10,500.00", imageUrl: "https://ph-live-01.slatic.net/p/6f137545fdc0d2318765e3625bebeb05.jpg", available: true, variations: ["Standard", "Heavy Duty"] },
        { name: "Motolite Pangmatagalan: Truck Master", price: "₱ 10,500.00", imageUrl: "https://www.motolite.com/cdn/shop/products/Gold1.jpg?v=1663294903", available: true, variations: ["Standard", "Heavy Duty"] },
        { name: "OIL FILTER", price: "₱ 500.00", imageUrl: null, available: false, variations: [] },
        { name: "GEAR OIL", price: "₱ 300.00", imageUrl: null, available: true, variations: ["Synthetic", "Semi-Synthetic"] },
        { name: "GEAR OIL", price: "₱ 300.00", imageUrl: null, available: true, variations: ["Synthetic", "Semi-Synthetic"] },
    ];

    const productsPerBatch = 8;
    const totalBatches = Math.ceil(products.length / productsPerBatch);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setSelectedVariation(product.variations[0] || '');
    };

    const handleNext = () => {
        if (currentBatch < totalBatches - 1) {
            setCurrentBatch(prevBatch => prevBatch + 1);
        }
    };

    const handlePrev = () => {
        if (currentBatch > 0) {
            setCurrentBatch(prevBatch => prevBatch - 1);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const handleVariationChange = (event) => {
        setSelectedVariation(event.target.value);
    };

    const handleAddToCart = () => {
        if (selectedProduct && selectedProduct.available) {
            const existingProductIndex = cartItems.findIndex(item => item.name === selectedProduct.name && item.selectedVariation === selectedVariation);
            if (existingProductIndex >= 0) {
                const updatedCartItems = [...cartItems];
                updatedCartItems[existingProductIndex].quantity += 1;
                setCartItems(updatedCartItems);
                Swal.fire({
                    icon: 'success',
                    title: 'Added to Cart',
                    text: `${selectedProduct.name} (${selectedVariation}) has been added to your cart.`,
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                setCartItems([...cartItems, { ...selectedProduct, selectedVariation, quantity: 1 }]);
                Swal.fire({
                    icon: 'success',
                    title: 'Added to Cart',
                    text: `${selectedProduct.name} (${selectedVariation}) has been added to your cart.`,
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Out of Stock',
                text: 'This product is out of stock and cannot be added to the cart.',
                timer: 2000,
                showConfirmButton: false,
            });
        }
    };

    const handleCartClick = () => {
        setIsCartModalOpen(true);
    };

    const handleCloseCartModal = () => {
        setIsCartModalOpen(false);
    };

    const handleQuantityChange = (product, newQuantity) => {
        if (newQuantity > 0) {
            setCartItems(cartItems.map(item =>
                item.name === product.name && item.selectedVariation === product.selectedVariation ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const handleRemoveItem = (product) => {
        setCartItems(cartItems.filter(item => item.name !== product.name || item.selectedVariation !== product.selectedVariation));
    };

    const handleViewClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedProducts = filteredProducts.slice(currentBatch * productsPerBatch, (currentBatch + 1) * productsPerBatch);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button style={styles.backButton} onClick={() => window.history.back()}>
                    <FaArrowLeft />
                </button>
                <img src={logoImage} alt="Kioscorp Logo" style={styles.logo} />
                <h1 style={styles.headerTitle}><span style={styles.headerSpan}>U</span>niversal <span style={styles.headerSpan}>A</span>uto <span style={styles.headerSpan}>S</span>upply and <span style={styles.headerSpan}>B</span>olt <span style={styles.headerSpan}>C</span>enter</h1>
                <div style={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Search for items..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {searchTerm && <FaTimes style={styles.clearIcon} onClick={handleClearSearch} />}
                    <button style={styles.cartButton} onClick={handleCartClick}>
                        <FaShoppingCart />
                    </button>
                </div>
                <CartModal
                    isOpen={isCartModalOpen}
                    onClose={handleCloseCartModal}
                    cartItems={cartItems}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                />
            </header>

            <div style={styles.contentContainer}>
                <div style={styles.gridContainer}>
                    <div style={styles.grid}>
                        {displayedProducts.length > 0 ? (
                            displayedProducts.map((product, index) => (
                                <div
                                    key={index}
                                    style={styles.productCard}
                                    onClick={() => handleProductSelect(product)}
                                >
                                    <img
                                        src={product.imageUrl || 'default-product-image-url'}
                                        alt={product.name}
                                        style={styles.productImage}
                                    />
                                    <p style={styles.productName}>{product.name}</p>
                                    <p style={styles.productPrice}>{product.price ? product.price : 'Not Available'}</p>
                                </div>
                            ))
                        ) : (
                            <div style={{ display: 'flex', flexGrow: 1 }}>
                                <p style={styles.placeholderText}>No products found matching your search.</p>
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <button
                            style={{ ...styles.arrow, ...styles.leftArrow, ...(currentBatch > 0 ? styles.arrowVisible : {}) }}
                            onClick={handlePrev}
                        >
                            <FaArrowLeft />
                        </button>
                        <button
                            style={{ ...styles.arrow, ...styles.rightArrow, ...(currentBatch < totalBatches - 1 ? styles.arrowVisible : {}) }}
                            onClick={handleNext}
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </div>

                <div style={styles.detailsContainer}>
                    {selectedProduct ? (
                        <>
                            {selectedProduct.imageUrl && <img src={selectedProduct.imageUrl} alt={selectedProduct.name} style={styles.productImageDetails} />}
                            <h2 style={styles.productName}>{selectedProduct.name}</h2>
                            <p style={styles.productPrice}>{selectedProduct.price ? selectedProduct.price : 'Not Available'}</p>
                            <div style={{ display: 'flex', alignItems: 'center', }}>
                                <div style={{ ...styles.stockIndicator, ...(selectedProduct.available ? styles.stockAvailable : styles.stockOut) }} />
                                <p>{selectedProduct.available ? 'Available' : 'Out of Stock'}</p>
                            </div>
                            {selectedProduct.variations.length > 0 && (
                                <div style={styles.productOptions}>
                                    <select style={styles.select} value={selectedVariation} onChange={handleVariationChange}>
                                        {selectedProduct.variations.map((variation, index) => (
                                            <option key={index} value={variation}>{variation}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div style={styles.buttonContainer}>
                                <button style={styles.addToCartButton} onClick={handleAddToCart}>Add to Cart</button>
                                <button style={styles.viewButton} onClick={handleViewClick}>View Item</button>
                            </div>

                            <ViewModal
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                product={selectedProduct}
                            />
                        </>
                    ) : (
                        <p style={styles.placeholderText}>Select a product to view details.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;