import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faClone, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from './index.module.css';
import { useState } from 'react';
const MenuCrud = ({ boardsId, onDelete }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    };

    const duplicateBoard = () => {

    };

    const editBoard = () => {

    };

    const deleteBoard = () => {
        console.log(boardsId);
        onDelete(boardsId);
        toggleMenu();
    };
    return (
        <div className={styles.menu_icons_container}>
            <FontAwesomeIcon icon={faEllipsis} className={styles.ellipsis} onClick={toggleMenu} />
            {
                (menuOpen) && (
                    <nav className={styles.menu_open}>
                        <ul className={styles.menu_items}>
                            <li >
                                <a >
                                    <FontAwesomeIcon icon={faClone} className={styles.icon} />
                                    <p className={styles.descriptions}>Duplicar</p>
                                </a>
                            </li>
                            <li>
                                <a >
                                    <FontAwesomeIcon icon={faEdit} className={styles.icon} />
                                    <p className={styles.descriptions}>Editar</p>
                                </a>
                            </li>
                            <li onClick={deleteBoard}>
                                <a >
                                    <FontAwesomeIcon icon={faTrash} className={styles.icon} />
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