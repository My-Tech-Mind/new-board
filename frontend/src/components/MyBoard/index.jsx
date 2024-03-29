import React, { useState, useEffect, useCallback } from 'react';
import MenuCrud from '../MenuCrud';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import LoadBoards from '../LoadBoards';
const MyBoard = () => {
    let [boards, setBoards] = useState([]);
    const [editingBoardId, setEditingBoardId] = useState(null);
    const [nextBoardId, setNextBoardId] = useState(4);
    const handleCreateBoard = () => {
        createBoard(nextBoardId);
        setNextBoardId(prevId => prevId + 1);
    };

    const setBoardsCallback = useCallback((boards) => {
        setBoards(boards);
    }, []);

    const { deleteBoard, createBoard, updateBoardTitle } = LoadBoards({ setBoards: setBoardsCallback });


    useEffect(() => {

    }, [boards]);

    const handleBoardTitleChange = (e, boardId) => {
        updateBoardTitle(boardId, e.target.value);
    };
    const editingBoard = (id, text) => {
        updateBoardTitle(id, text);
    };

    const handleBoardTitleDoubleClick = (boardId) => {
        setEditingBoardId(boardId);
    };

    const handleBoardTitleBlur = () => {
        setEditingBoardId(null);
    };
    const favoriteBoard = (id) => {
        console.log('oi');
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meus Boards</h1>
            <div className={styles.boards_container}>
                <div className={styles.add_board_container} onClick={() => handleCreateBoard()}>
                    <FontAwesomeIcon icon={faPlus} className={styles.icon_boards_plus} />
                </div>
                {boards.map(board => (
                    <div key={board.id} className={styles.boards}>
                        {editingBoardId === board.id ? (

                            < input
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
                        <FontAwesomeIcon icon={faStar} className={styles.icon_boards_star} onClick={() => favoriteBoard(board.id)} />
                        <MenuCrud boardsId={board.id} onEdit={(text) => editingBoard(board.id, text)} onUpdate={() => deleteBoard(board.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBoard;