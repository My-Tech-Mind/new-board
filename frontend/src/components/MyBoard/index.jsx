import React, { useState, useEffect, useCallback } from 'react';
import MenuCrud from '../MenuCrud';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import LoadBoards from '../LoadBoards'
const MyBoard = () => {
    const [boards, setBoards] = useState([]);


    const setBoardsCallback = useCallback((boards) => {
        setBoards(boards);
    }, []);


    const deleteBoard = LoadBoards({ setBoards: setBoardsCallback });
    useEffect(() => {
    }, [boards]);

    const createBoards = () => {


        console.log(boards);
    }

    const handleBoardTitleChange = (e, boardId) => {

    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meus Boards</h1>
            <div className={styles.boards_container}>
                <div className={styles.add_board_container} onClick={createBoards}>
                    <FontAwesomeIcon icon={faPlus} className={styles.icon_boards_plus} />
                </div>
                {boards.map((boards) => (
                    <div key={boards.id} className={styles.boards}>
                        <input type="text" className={styles.boards_name} value={boards.title} onChange={(e) => handleBoardTitleChange(e, boards.id)} />
                        <FontAwesomeIcon icon={faStar} className={styles.icon_boards_star} />
                        <MenuCrud boardsId={boards.id} onDelete={() => deleteBoard(boards.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBoard;
