import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaRegClone, FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import styles from './index.module.css';
import Modal from '../modalComponents/Boards/ModalEditBoard';
import { useEffect, useRef, useState } from 'react';

const MenuCrud = ({ boardsId, onUpdate, onEdit, onDuplicate }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuEditOpen, setEditMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const menuRef = useRef(null);

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

    console.log(menuOpen)

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

    const duplicateBoard = () => {
        onDuplicate(boardsId);
        toggleMenu();
    }

    return (
        <>
            <div className={styles.menu_icons_container}>
                <FaEllipsisVertical className={styles.ellipsis} onClick={toggleMenu} />
                {
                    (menuOpen) && (
                        <nav className={styles.menu_open} ref={menuRef}>
                            <ul className={styles.menu_items}>
                                <li onClick={duplicateBoard} className={styles.menu_item}>
                                    <a className={styles.link} >
                                        <FaRegClone className={styles.icon} />
                                        <p className={styles.descriptions}>Duplicate</p>
                                    </a>
                                </li>
                                <li onClick={toggleEditMenu} className={styles.menu_item}>
                                    <a className={styles.link} >
                                        <FaEdit className={styles.icon} />
                                        <p className={styles.descriptions}>Edit</p>
                                    </a>
                                </li>
                                <li onClick={deleteBoard} className={styles.menu_item}>
                                    <a className={styles.link} >
                                        <FaRegTrashAlt className={styles.icon} />
                                        <p className={`${styles.descriptions} ${styles.text}`} >Delete</p>
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
