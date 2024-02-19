import styles from './index.module.css';
import logo from '../../assets/logo-light.png';
import { useState, useEffect } from 'react';
import Button from '../Button';
import Menu from '../Menu';

const Header = ({logged}) => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return ( 
        <header>
            <div className={styles.header_container}>
                <div className={styles.container_image}>
                    <img src={logo} alt="logo" />
                </div>
                {
                    (windowSize > 768 && !logged) && (
                        <Button title='Login' style='login' href='/login' />   
                    )
                }

                {
                    (logged) && (
                        <Menu />
                    )
                }
                
            </div>
        </header>
     );
}
 
export default Header;