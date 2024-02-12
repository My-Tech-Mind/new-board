import { useState, useEffect } from 'react';
import styles from './index.module.css';

const ButtonDesktop = ({ title, style }) => {

    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return (
        <>
            {windowSize > 768 && (
                <button className={styles[`${style}`]}>
                    <a href="#">{title}</a>
                </button>)}

        </>
    );
}

export default ButtonDesktop;