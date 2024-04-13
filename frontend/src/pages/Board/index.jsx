import { useState } from 'react';
import Header from '../../components/Header';
import { FaPen } from "react-icons/fa";
import styles from './index.module.css';
import Cards from '../../components/Cards';
import CardBox from '../../components/modalComponents/Board/CardBox';
import {FaTimes} from 'react-icons/fa'

const Board = () => {
    const [openBoardTitleBox, setOpenBoardTitleBox] = useState(false)
    const [titleBoard, setTitleBoard] = useState('Untitled')

    const editBoardTitle = () => {
        setOpenBoardTitleBox(!openBoardTitleBox)
    }

    const handleEditTitle = (title) => {
        setTitleBoard(title)
    }

    const handleSaveCard = (save) => {
        setOpenBoardTitleBox(!save)
    }

    return (
        <>
            <Header logged={true} />

            <div className={styles.main_board}>
                {openBoardTitleBox && (
                    <>
                        <FaTimes className={styles.close_icon} onClick={editBoardTitle} />
                        <CardBox title='Change board name' buttonName='Save' onSave={handleSaveCard}
                        onCreateOrEdit={handleEditTitle} />
                        
                    </>
                )}
                <div className={styles.board_header}>
                    <div className={styles.board_title_icon}>
                        <h1 className={styles.board_title}>{titleBoard}</h1>
                        <FaPen className={styles.icons} onClick={editBoardTitle} />
                    </div>
                </div>

                <div className={styles.board_container}>
                    <Cards />
                </div>
            </div>
</>
);
};

export default Board;
