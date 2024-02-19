import { FaUser, FaUserCircle, FaHome, FaSignOutAlt } from 'react-icons/fa';
import styles from './index.module.css';
import { useState } from 'react';

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }
    return ( 
        <div className={styles.menu_icons_container}>
            <a href="/boards">
                <FaHome className={styles.icons} />
            </a>
            
            <FaUserCircle className={styles.user_circle} onClick={toggleMenu} />

            <nav className={styles[`menu_${menuOpen ? 'open' : ''}`]}>
                {
                    (menuOpen) && (
                            <ul className={styles.menu_items}>
                               
                                <li>
                                <a href="/boards">
                                    <FaHome className={styles.icons} />
                                </a>
                                    <a href="/boards">
                                        Home
                                    </a>
                                </li>
                                
    
                                
                                <li>
                                <a href="/account">
                                    <FaUser className={styles.icons} />
                                </a>
                                    <a href="/account">
                                            My account
                                    </a>
                                </li> 
                                <hr />
                                <li>
                                    <a href="/">
                                        <FaSignOutAlt className={styles.icons} />
                                    </a>
                                    <a href="/">
                                        Sign out
                                    </a>
                                </li>
                            </ul>
                    ) 
                }
            </nav>
        </div>
     );
}
 
export default Menu;