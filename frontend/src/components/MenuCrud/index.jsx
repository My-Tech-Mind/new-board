import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faClone, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from './index.module.css';
import { useState } from 'react';

const MenuCrud = ({ boardsId, onUpdate, onEdit }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuEditOpen, setEditMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const toggleEditMenu = () => {
        setEditMenuOpen(!menuEditOpen);
        toggleMenu();
    };
    const cancelEdition = () => {
        setEditMenuOpen(!menuEditOpen);
    };
    const finishEdition = () => {
        onEdit(inputValue);
        setEditMenuOpen(!menuEditOpen);
    }
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);

    };
    const deleteBoard = () => {
        onUpdate(boardsId);
        toggleMenu();
    };

    return (
        <>
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
                                <li onClick={toggleEditMenu}>
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
            </div>
            <div className={styles.container}>
                {
                    (menuEditOpen) && (
                        <div className={styles.menuEdit}>
                            <div className={styles.itemsEdit}>
                                <p className={styles.tituloEdit}>Boards Title</p>
                                <input type="text" value={inputValue} onChange={handleInputChange} />
                                <div>
                                    <button onClick={finishEdition}>Ok</button>
                                    <button onClick={cancelEdition}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </>
    );
};

export default MenuCrud;
