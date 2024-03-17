import React, { useState, useEffect, useCallback } from 'react';
import MenuCrud from '../MenuCrud';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import LoadBoards from '../LoadBoards'
const MyBoard = () => {
    let [boards, setBoards] = useState([]);
    const [editingBoardId, setEditingBoardId] = useState(null);

    const setBoardsCallback = useCallback((boards) => {
        setBoards(boards);
    }, []);

    const { deleteBoard, createBoard, updateBoardTitle } = LoadBoards({ setBoards: setBoardsCallback });

    useEffect(() => {
    }, [boards]);

    const handleBoardTitleChange = (e, boardId) => {
        updateBoardTitle(boardId, e.target.value);
    };
    const handleBoardTitleDoubleClick = (boardId) => {
        setEditingBoardId(boardId);
    };

    const handleBoardTitleBlur = () => {
        setEditingBoardId(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meus Boards</h1>
            <div className={styles.boards_container}>
                <div className={styles.add_board_container} onClick={() => createBoard((boards.length) + 1)}>
                    <FontAwesomeIcon icon={faPlus} className={styles.icon_boards_plus} />
                </div>
                {boards.map(board => (
                    <div key={board.id} className={styles.boards}>
                        {editingBoardId === board.id ? (
                            <input
                                type="text"
                                className={styles.boards_name}
                                value={board.title}
                                onChange={(e) => handleBoardTitleChange(e, board.id)}
                                onBlur={handleBoardTitleBlur}
                                autoFocus
                            />
                        ) : (
                            <div
                                className={styles.boards_name}
                                onDoubleClick={() => handleBoardTitleDoubleClick(board.id)}
                            >
                                {board.title}
                            </div>
                        )}
                        <FontAwesomeIcon icon={faStar} className={styles.icon_boards_star} />
                        <MenuCrud boardsId={board.id} onUpdate={() => deleteBoard(board.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBoard;