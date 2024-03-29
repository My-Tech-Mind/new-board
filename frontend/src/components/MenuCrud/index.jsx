import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faClone, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from './index.module.css';
import Modal from '../Modal';
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
    const Edition = (value) => {
        if (value == 'cancel') {
            setEditMenuOpen(!menuEditOpen);
        } else {
            onEdit(inputValue);
            setEditMenuOpen(!menuEditOpen)
        }
    };

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
            {
                (menuEditOpen) && (
                    <Modal Edition={Edition} inputValue={inputValue} handleInputChange={handleInputChange} />
                )}
        </>
    );
};

export default MenuCrud;
