import styles from './index.module.css';
import logo from '../../assets/logo-light.png';
import { useState, useEffect } from 'react';
import Button from '../Button';
import Menu from '../Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    console.log(logged)

    return ( 
        <header>
            <div className={styles.header_container}>
                <div className={styles.container_image}>
                    <img src={logo} alt="logo" />
                </div>
                {
                    (logged) && (
                            <Menu /> 
                    )
                }
                {
                    (windowSize > 768 && !logged) && (
                        <Button title='Login' style='login' href='/login' />   
                    )
                }
            </div>
        </header>
     );
}
 
export default Header;