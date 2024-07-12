import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logoImage from '../img/Logo/kioscorp.png'; // Replace with your actual image path
import background from '../img/Background/background.png';
import autoImage from '../img/Categories/auto.png';
import boltsImage from '../img/Categories/bolts.png';
import './CategorySelect.css';
import './CustomSweetAlert.css';

const CategorySelect = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (path, categoryName) => {
        Swal.fire({
            title: 'Category Selected',
            text: `You have selected ${categoryName}`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
            navigate(path);
        });
    };

    return (
        <div className="category-select-container" style={{ backgroundImage: `url(${background})` }}>
            <img src={logoImage} alt="Kioscorp Logo" className="logo" />
            <h1 className="kios-title"><span>Universal Auto Supply</span> and <span>Bolt Center</span></h1>
            <h2 className="category-sele">SELECT A CATEGORY</h2>
            <div className="columns">
                <div className="column">
                    <div
                        className="category-link"
                        onClick={() => handleCategoryClick('/auto', 'Auto Supplies')}
                    >
                        <div className="icon-background">
                            <img src={autoImage} alt="Auto Category" className="column-logo" />
                        </div>
                        <h3 className="category-title">AUTO SUPPLIES</h3>
                    </div>
                </div>
                <div className="column">
                    <div
                        className="category-link"
                        onClick={() => handleCategoryClick('/bolts', 'Bolts')}
                    >
                        <div className="icon-background">
                            <img src={boltsImage} alt="Bolts Category" className="column-logo" />
                        </div>
                        <h3 className="category-title">BOLTS</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySelect;
