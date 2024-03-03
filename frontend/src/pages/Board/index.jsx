import { useState } from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { FaPen } from "react-icons/fa";
import styles from './index.module.css';
import Cards from '../../components/Cards';
import EditBox from '../../components/EditBox';
import {FaTimes} from 'react-icons/fa'

const Board = () => {
    const [openBoardTitleBox, setopenBoardTitleBox] = useState(false)

    const editBoardTitle = () => {
        setopenBoardTitleBox(!openBoardTitleBox)
    }

    return (
        <>
            <Header logged={true} />

            <div className={styles.main_board}>
                {openBoardTitleBox && (
                    <>
                        <FaTimes className={styles.close_icon} onClick={editBoardTitle} />
                        <EditBox title='Board title' buttonName='Save' />
                    </>
                )}
                <div className={styles.board_header}>
                    <div className={styles.board_title_icon}>
                        <h1 className={styles.board_title}>Board title</h1>
                        <FaPen className={styles.icons} onClick={editBoardTitle} />
                    </div>
                    <Button href='#' title='Save changes' style='board_button' />
                </div>

                <div className={styles.board_container}>
                    <Cards />
                </div>
            </div>
</>
);
};

export default Board;
