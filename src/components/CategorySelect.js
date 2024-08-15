import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logoImage from '../img/Logo/kioscorp.png'; // Replace with your actual image path
import background from '../img/Background/background.png';
import autoImage from '../img/Categories/auto.png';
import boltsImage from '../img/Categories/bolts.png';
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

    const styles = {
        container: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        },
        logo: {
            margin: '-5px',
            width: '400px',
        },
        kiosTitle: {
            fontSize: '90px',
            color: 'white',
            margin: '-10px',
        },
        categorySele: {
            fontSize: '60px',
            color: 'white',
            margin: '15px 0',
        },
        span: {
            color: '#FFBD59',
        },
        columns: {
            display: 'flex',
            justifyContent: 'space-around',
            width: '85%',
            marginTop: '40px',
        },
        column: {
            textAlign: 'center',
        },
        categoryLink: {
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
        },
        iconBackground: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFF',
            borderRadius: '20px',
            padding: '20px',
            border: '5px solid transparent',
            animation: 'glowBorder 3s linear infinite',
        },
        columnLogo: {
            width: '400px',
            objectFit: 'cover',
        },
        categoryTitle: {
            fontSize: '50px',
            color: 'white',
            margin: '15px 0',
        },
    };

    return (
        <div style={styles.container}>
            <img src={logoImage} alt="Kioscorp Logo" style={styles.logo} />
            <h1 style={styles.kiosTitle}><span style={styles.span}>Universal Auto Supply</span> and <span style={styles.span}>Bolt Center</span></h1>
            <h2 style={styles.categorySele}>SELECT A CATEGORY</h2>
            <div style={styles.columns}>
                <div style={styles.column}>
                    <div
                        style={styles.categoryLink}
                        onClick={() => handleCategoryClick('/auto', 'Auto Supplies')}
                    >
                        <div style={styles.iconBackground}>
                            <img src={autoImage} alt="Auto Category" style={styles.columnLogo} />
                        </div>
                        <h3 style={styles.categoryTitle}>AUTO SUPPLIES</h3>
                    </div>
                </div>
                <div style={styles.column}>
                    <div
                        style={styles.categoryLink}
                        onClick={() => handleCategoryClick('/bolts', 'Bolts')}
                    >
                        <div style={styles.iconBackground}>
                            <img src={boltsImage} alt="Bolts Category" style={styles.columnLogo} />
                        </div>
                        <h3 style={styles.categoryTitle}>BOLTS</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySelect;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    @keyframes glowBorder {
        0% {
            border-color: rgb(255, 0, 0);
            box-shadow: 0 0 10px rgb(255, 0, 0);
        }
        25% {
            border-color: rgb(255, 255, 0);
            box-shadow: 0 0 10px rgb(255, 255, 0);
        }
        50% {
            border-color: rgb(0, 255, 0);
            box-shadow: 0 0 10px rgb(0, 255, 0);
        }
        75% {
            border-color: rgb(0, 0, 255);
            box-shadow: 0 0 10px rgb(0, 0, 255);
        }
        100% {
            border-color: rgb(255, 0, 0);
            box-shadow: 0 0 10px rgb(255, 0, 0);
        }
    }
`;
document.head.appendChild(styleSheet);
