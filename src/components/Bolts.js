import React, { useState, useEffect } from 'react';
import background from '../img/Background/background.png';
import logoImage from '../img/Logo/kioscorp.png';
import { FaArrowLeft, FaArrowRight, FaTimes, FaArrowLeft as FaArrowLeftSolid } from 'react-icons/fa';

const ProductGrid = () => {
    const products_bolt = [
        { name: 'AUTOMOTIVE BATTERY', imgSrc: 'https://static1.squarespace.com/static/57fd5aa69f745699d45f362d/t/5fe3b94ff9b8c1391657b8a7/1608759704473/?format=1500w' },
        { name: 'TRUCK BATTERY', imgSrc: 'https://static1.squarespace.com/static/57fd5aa69f745699d45f362d/t/5fe3b94ff9b8c1391657b8a7/1608759704473/?format=1500w' },
        { name: 'ENGINE OIL', imgSrc: 'https://static1.squarespace.com/static/57fd5aa69f745699d45f362d/t/5fe3b94ff9b8c1391657b8a7/1608759704473/?format=1500w' },
        { name: 'GEAR OIL', imgSrc: 'https://static1.squarespace.com/static/57fd5aa69f745699d45f362d/t/5fe3b94ff9b8c1391657b8a7/1608759704473/?format=1500w' },
        { name: 'HYDRAULIC OIL', imgSrc: 'https://static1.squarespace.com/static/57fd5aa69f745699d45f362d/t/5fe3b94ff9b8c1391657b8a7/1608759704473/?format=1500w' },
        { name: 'OIL FILTER', imgSrc: 'https://static1.squarespace.com/static/57fd5aa69f745699d45f362d/t/5fe3b94ff9b8c1391657b8a7/1608759704473/?format=1500w' },
        { name: 'FUEL FILTER', imgSrc: 'https://static1.squarespace.com/static/57fd5aa69f745699d45f362d/t/5fe3b94ff9b8c1391657b8a7/1608759704473/?format=1500w' },
        { name: 'BREAK PAD', imgSrc: 'https://static1.squarespace.com/static/57fd5aa69f745699d45f362d/t/5fe3b94ff9b8c1391657b8a7/1608759704473/?format=1500w' },
    ];

    const [currentBatch, setCurrentBatch] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const productsPerBatch = 8;

    const filteredProducts = products_bolt.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalBatches = Math.ceil(filteredProducts.length / productsPerBatch);

    useEffect(() => {
        const handleRightClick = (e) => e.preventDefault();
        const handleCopy = (e) => e.preventDefault();

        window.addEventListener('contextmenu', handleRightClick);
        window.addEventListener('copy', handleCopy);

        return () => {
            window.removeEventListener('contextmenu', handleRightClick);
            window.removeEventListener('copy', handleCopy);
        };
    }, []);

    const handleNext = () => {
        if (currentBatch < totalBatches - 1) {
            setTransitioning(true);
            setTimeout(() => {
                setCurrentBatch(prevBatch => prevBatch + 1);
                setTransitioning(false);
            }, 300);
        }
    };

    const handlePrev = () => {
        if (currentBatch > 0) {
            setTransitioning(true);
            setTimeout(() => {
                setCurrentBatch(prevBatch => prevBatch - 1);
                setTransitioning(false);
            }, 300);
        }
    };

    const handleClearSearch = () => setSearchTerm('');
    const handleGoBack = () => window.history.back();

    const displayedProducts = filteredProducts.slice(currentBatch * productsPerBatch, (currentBatch + 1) * productsPerBatch);

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
            backgroundColor: '#033372',
            padding: '10px 50px',
            borderRadius: '20px',
        },
        headerSpan: {
            color: '#FFBD59',
        },
        searchBox: {
            position: 'relative',
        },
        searchInput: {
            height: '40px',
            width: '300px',
            padding: '10px',
            fontSize: '1.5em',
            borderRadius: '20px',
            border: '1px solid #ccc',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
        },
        clearIcon: {
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            fontSize: '1.5em',
            color: '#333',
        },
        gridContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            flexGrow: 1,
            overflow: 'hidden',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 380px)',
            gridTemplateRows: 'repeat(2, 380px)',
            gap: '20px',
            transition: 'opacity 0.3s ease-in-out',
            opacity: 1,
        },
        gridTransitioning: {
            opacity: 0,
        },
        product: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
            transition: 'background-color 0.3s ease',
            cursor: 'pointer',
            overflow: 'hidden',
        },
        productImg: {
            width: '100%',
            height: '320px',
            borderRadius: '10px',
            objectFit: 'cover',
        },
        productName: {
            fontSize: '2em',
            color: '#17388B',
            margin: 0,
        },
        arrow: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            color: 'white',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '1.5em',
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            visibility: 'hidden',
        },
        leftArrow: {
            left: '30px',
            fontSize: '50px',
        },
        rightArrow: {
            fontSize: '50px',
            right: '30px',
        },
        arrowVisible: {
            visibility: 'visible',
        },
        arrowHover: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        logo: {
            width: '200px',
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
        noProducts: {
            height: '100%',
            textAlign: 'center',
            fontSize: '1.5em',
            margin: 0,
            fontWeight: 700,
            color: '#FF0000',
        },
        noResults: {
            height: '100%',
            textAlign: 'center',
            fontSize: '4em',
            color: 'white',
            margin: 0,
            fontWeight: 700,
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button style={styles.backButton} onClick={handleGoBack}>
                    <FaArrowLeftSolid />
                </button>
                <img src={logoImage} alt="Kioscorp Logo" style={styles.logo} />
                <h1 style={styles.headerTitle}><span style={styles.headerSpan}>W</span>hat <span style={styles.headerSpan}>K</span>ind <span style={styles.headerSpan}>O</span>f <span style={styles.headerSpan}>B</span>olts <span style={styles.headerSpan}>D</span>o <span style={styles.headerSpan}>Y</span>ou <span style={styles.headerSpan}>W</span>ant?</h1>
                <div style={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Search for items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                    {searchTerm && (
                        <FaTimes style={styles.clearIcon} onClick={handleClearSearch} />
                    )}
                </div>
            </header>
            <div style={styles.gridContainer}>
                <button
                    style={{ ...styles.arrow, ...styles.leftArrow, ...(totalBatches > 1 && currentBatch > 0 ? styles.arrowVisible : {}) }}
                    onClick={handlePrev}
                >
                    <FaArrowLeft />
                </button>
                <div style={{ ...styles.grid, ...(transitioning ? styles.gridTransitioning : {}) }}>
                    {products_bolt.length === 0 ? (
                        <p style={styles.noProducts}>No product data found</p>
                    ) : displayedProducts.length > 0 ? (
                        displayedProducts.map((product, index) => (
                            <div style={styles.product} key={index}>
                                <img src={product.imgSrc} alt={product.name} style={styles.productImg} />
                                <h2 style={styles.productName}>{product.name}</h2>
                            </div>
                        ))
                    ) : (
                        <p style={styles.noProducts}>No products available</p>
                    )}
                </div>
                <button
                    style={{ ...styles.arrow, ...styles.rightArrow, ...(totalBatches > 1 && currentBatch < totalBatches - 1 ? styles.arrowVisible : {}) }}
                    onClick={handleNext}
                >
                    <FaArrowRight />
                </button>
            </div>
            {filteredProducts.length === 0 && searchTerm && (
                <p style={styles.noResults}>No products found for "{searchTerm}"</p>
            )}
        </div>
    );
}

export default ProductGrid;