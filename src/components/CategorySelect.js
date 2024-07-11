import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../img/Logo/kioscorp.png'; // Replace with your actual image path
import background from '../img/Background/background.png';
import autoImage from '../img/Categories/auto.png';
import boltsImage from '../img/Categories/bolts.png';
import './CategorySelect.css';
import './poppins-font.css'; // Assuming you have a separate font import file

const CategorySelect = () => {
    return (
        <div className="category-select-container" style={{ backgroundImage: `url(${background})` }}>
            <img src={logoImage} alt="Kioscorp Logo" className="logo" />
            <h1><span>Universal Auto Supply</span> and <span>Bolt Center</span></h1>
            <h2>SELECT A CATEGORY</h2>
            <div className="columns">
                <div className="column">
                    <Link to="/auto" className="category-link">
                        <div className="icon-background">
                            <img src={autoImage} alt="Auto Category" className="column-logo" />
                        </div>
                        <h3 className="category-title">AUTO SUPPLIES</h3>
                    </Link>
                </div>
                <div className="column">
                    <Link to="/bolts" className="category-link">
                        <div className="icon-background">
                            <img src={boltsImage} alt="Bolts Category" className="column-logo" />
                        </div>
                        <h3 className="category-title">BOLTS</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategorySelect;
