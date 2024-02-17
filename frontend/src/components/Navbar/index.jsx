import styles from './index.module.css';
import logo from '../../assets/logo-light.png';
import { useState, useEffect } from 'react';
import Button from '../Button';

const Navbar = () => {
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
        <nav>
            <div className={styles.container_image}>
                <img src={logo} alt="logo" />
            </div>
            {
                windowSize > 768 && (
                    <Button title='Login' style='login' href='/login' />
                )
            }
        </nav>
     );
}
 
export default Navbar;