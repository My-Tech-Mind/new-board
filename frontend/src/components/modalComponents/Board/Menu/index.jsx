import { FaUser, FaUserCircle, FaHome, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import styles from './index.module.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../../../../services/api/auth'


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
            <Link to="/boards" className={styles.link}>
                <FaHome className={styles.icons} />
            </Link>
            
            <FaUserCircle className={styles.user_circle} onClick={toggleMenu} />

            {
                (menuOpen) && (
                    <nav ref={menuRef} className={styles.menu_open}>
                        <div className={styles.icon_close_container}>
                            <FaTimes className={styles.icon_close} onClick={toggleMenu} />
                        </div>
                        <ul className={styles.menu_items}>
                                <li>
                                    <Link to="/account" className={styles.link}>
                                        <FaUser className={styles.icons} />
                                    </Link>
                                    <Link to="/account" className={styles.link}>
                                        My account
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/boards" className={styles.link}>
                                        <FaHome className={styles.icons} />
                                    </Link>
                                    <Link to="/boards" className={styles.link}>
                                        Home
                                    </Link>
                                </li>
                           
                                <li>
                                     <Link onClick={logOut} className={styles.link}>
                                        <FaSignOutAlt className={styles.icons} />
                                    </Link>
                                     <Link onClick={logOut} className={styles.link}>
                                        Sign out
                                    </Link>
                                </li>
            
                        </ul>
                    </nav>
                )
            }
        </div>
    );
};
 
export default Menu;