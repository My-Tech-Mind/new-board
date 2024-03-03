import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './index.module.css';
import { useState } from 'react';

const MenuCrud = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    };


    return (
        <div className={styles.menu_icons_container}>
            <FontAwesomeIcon icon={['fa', 'ellipsis']} className={styles.ellipsis} onClick={toggleMenu} />
            {
                (menuOpen) && (
                    <nav className={styles.menu_open}>
                        <ul className={styles.menu_items}>
                            <li >
                                <a >
                                    <FontAwesomeIcon icon={['fa', 'clone']} className={styles.icon} />
                                    <p className={styles.descriptions}>Duplicar</p>
                                </a>
                            </li>
                            <li>
                                <a >
                                    <FontAwesomeIcon icon={['fa', 'edit']} className={styles.icon} />
                                    <p className={styles.descriptions}>Editar</p>
                                </a>
                            </li>
                            <li>
                                <a >
                                    <FontAwesomeIcon icon={['fa', 'trash']} className={styles.icon} />
                                    <p className={`${styles.descriptions} ${styles.text}`} >Excluir</p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                )
            }
        </div >
    );
};

export default MenuCrud;