import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import logo from '../../assets/logo-light.png';
import darkLogo from '../../assets/logo-dark.png';
import Button from '../Button';
import Menu from '../modalComponents/Board/Menu';

const Header = ({ logged }) => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const mode = localStorage.getItem('mode');

    return (
        <header className={styles.header} id={styles.header_light}>
            <div className={styles.header_container}>
                <div className={styles.container_image}>
                    {logged ? (
                        <a href="/boards">
                            {mode === 'dark' ? (
                                <img src={darkLogo} alt="dark logo" />
                            ) : (
                                <img src={logo} alt="logo" />
                            )}
                        </a>
                    ) : (
                        <a href="/#">
                            {mode === 'dark' ? (
                                <img src={darkLogo} alt="dark logo" />
                            ) : (
                                <img src={logo} alt="logo" />
                            )}
                        </a>
                    )}
                </div>
                {logged && <Menu />}
                {windowSize > 768 && !logged && <Button title="Login" style="outline" href="/login" size='size_small' />}
            </div>
        </header>
    );
};
 
export default Header;
