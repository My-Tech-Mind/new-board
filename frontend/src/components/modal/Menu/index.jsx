import { FaUser, FaUserCircle, FaHome, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import styles from './index.module.css';
import { useState, useEffect, useRef } from 'react';

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    };
    return (
        <div className={styles.menu_icons_container}>
            <a href="/boards" className={styles.link}>
                <FaHome className={styles.icons} />
            </a>
            
            <FaUserCircle className={styles.user_circle} onClick={toggleMenu} />

            {
                (menuOpen) && (
                    <nav ref={menuRef} className={styles.menu_open}>
                        <div className={styles.icon_close_container}>
                            <FaTimes className={styles.icon_close} onClick={toggleMenu} />
                        </div>
                        <ul className={styles.menu_items}>
                            <li>
                                <a href="/account" className={styles.link}>
                                    <FaUser className={styles.icons} />
                                </a>
                                <a href="/account" className={styles.link}>
                                    My account
                                </a>
                            </li>
                                
                            <li>
                                <a href="/boards" className={styles.link}>
                                    <FaHome className={styles.icons} />
                                </a>
                                <a href="/boards" className={styles.link}>
                                    Home
                                </a>
                            </li>
                            
                            <li>
                                <a href="/" className={styles.link}>
                                    <FaSignOutAlt className={styles.icons} />
                                </a>
                                <a href="/" className={styles.link}>
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </nav>
                )
            }
        </div>
    );
};
 
export default Menu;