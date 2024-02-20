import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import logo from '../../assets/logo-light.png';
import Button from '../Button';
import Menu from '../Menu';

const Header = ({ logged }) => {
    const [windowSize, setWindowSize] = useState();

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return ( 
        <header className={styles.header} id={styles.header_light}>
            <div className={styles.header_container}>
                <div className={styles.container_image}>
                    <a href="/boards">
                        <img src={logo} alt="logo" />
                    </a>
                </div>
                {logged && <Menu />}
                {windowSize > 768 && !logged && <Button title="Login" style="login" href="/login" />}
            </div>
        </header>
     );
}
 
export default Header;
