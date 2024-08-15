import React, { useState, useEffect } from 'react';
import './productSelection.css';
import background from '../img/Background/background.png';
import logoImage from '../img/Logo/kioscorp.png';
import { FaArrowLeft, FaArrowRight, FaTimes, FaArrowLeft as FaArrowLeftSolid } from 'react-icons/fa';

const ProductGrid = () => {
    const products_autosupply = [
        { name: 'AUTOMOTIVE BATTERY', imgSrc: 'https://i1.sndcdn.com/artworks-xp21CZaxEmUDcDJU-G0Ug1w-t500x500.jpg' },
        { name: 'TRUCK BATTERY', imgSrc: 'https://i1.sndcdn.com/artworks-xp21CZaxEmUDcDJU-G0Ug1w-t500x500.jpg' },
        { name: 'ENGINE OIL', imgSrc: 'https://i1.sndcdn.com/artworks-xp21CZaxEmUDcDJU-G0Ug1w-t500x500.jpg' },
        { name: 'GEAR OIL', imgSrc: 'gear-oil.png' },
        { name: 'HYDRAULIC OIL', imgSrc: 'hydraulic-oil.png' },
        { name: 'OIL FILTER', imgSrc: 'oil-filter.png' },
        { name: 'FUEL FILTER', imgSrc: 'fuel-filter.png' },
        { name: 'BREAK PAD', imgSrc: 'break-pad.png' },
        { name: 'BREAK PAD', imgSrc: 'break-pad.png' },
        { name: 'BREAK PAD', imgSrc: 'break-pad.png' },
        { name: 'BREAK PAD', imgSrc: 'break-pad.png' },
        { name: 'BREAK PAD', imgSrc: 'break-pad.png' },
        { name: 'BREAK PAD', imgSrc: 'break-pad.png' },
        { name: 'BREAK PAD', imgSrc: 'break-pad.png' },
        { name: 'BREAK PAD', imgSrc: 'break-pad.png' },
        { name: 'BREAK PAD', imgSrc: 'break-pad.png' },
        { name: 'BREAK PAD', imgSrc: 'break-pad.png' },
    ];

    const [currentBatch, setCurrentBatch] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const productsPerBatch = 8;

    const filteredProducts = products_autosupply.filter(product =>
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

    return (
        <div className="container" style={{ backgroundImage: `url(${background})` }}>
            <header className="header">
                <button className="back-button" onClick={handleGoBack}>
                    <FaArrowLeftSolid />
                </button>
                <img src={logoImage} alt="Kioscorp Logo" className="logo" />
                <h1><span>W</span>hat <span>K</span>ind <span>O</span>f <span>A</span>uto <span>S</span>upplies <span>D</span>o <span>Y</span>ou <span>W</span>ant?</h1>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search for items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <FaTimes className="clear-icon" onClick={handleClearSearch} />
                    )}
                </div>
            </header>
            <div className="grid-container">
                <button
                    className={`arrow left-arrow ${totalBatches > 1 && currentBatch > 0 ? 'visible' : ''}`}
                    onClick={handlePrev}
                >
                    <FaArrowLeft />
                </button>
                <div className={`grid ${transitioning ? 'transitioning' : ''}`}>
                    {products_autosupply.length === 0 ? (
                        <p className="no-products">No product data found</p>
                    ) : displayedProducts.length > 0 ? (
                        displayedProducts.map((product, index) => (
                            <div className="product" key={index}>
                                <img src={product.imgSrc} alt={product.name} />
                                <h2>{product.name}</h2>
                            </div>
                        ))
                    ) : (
                        <p className="no-products">No products available</p>
                    )}
                </div>
                <button
                    className={`arrow right-arrow ${totalBatches > 1 && currentBatch < totalBatches - 1 ? 'visible' : ''}`}
                    onClick={handleNext}
                >
                    <FaArrowRight />
                </button>
            </div>
            {filteredProducts.length === 0 && searchTerm && (
                <p className="no-results">No products found for "{searchTerm}"</p>
            )}
        </div>
    );
}

export default ProductGrid;
