import React, { useState, useEffect, useCallback } from 'react';
import MenuCrud from '../MenuCrud';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import LoadBoards from '../LoadBoards';
import Modal from '../Modal';
const MyBoard = () => {
    let [boards, setBoards] = useState([]);
    const [editingBoardId, setEditingBoardId] = useState(null);
    const [nextBoardId, setNextBoardId] = useState(4);
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCreateBoard = () => {
        setIsModalOpen(true);
    };
    const Edition = (action) => {
        if (action === 'finish') {
            createNewBoard(inputValue);
            setIsModalOpen(false);
            setInputValue('');
        } else {
            setIsModalOpen(false);
            setInputValue('');
        }
    };
    const createNewBoard = (boardTitle) => {
        if (boards.length <= 4) {
            createBoard(nextBoardId, boardTitle);
            setNextBoardId(prevId => prevId + 1);
        } else {
            alert("Sua conta só permite a criação de 5 boards");
        }
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
        const updatedBoards = boards.map(board => {
            if (board.id === id) {
                return { ...board, favorito: !board.favorito };
            }
            return board;
        });
        setBoards(updatedBoards);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meus favoritos</h1>
            <div className={styles.MyFavoriteBoards}>
                {boards.filter(board => board.favorito).map(board => (
                    <div key={board.id} className={styles.boards}>
                        <input
                            type="text"
                            className={styles.boards_name}
                            value={board.title}
                            onChange={(e) => handleBoardTitleChange(e, board.id)}
                            onBlur={handleBoardTitleBlur}
                            autoFocus
                        />
                        <FontAwesomeIcon icon={faStar} className={board.favorito ? styles.icon_boards_star_active : styles.icon_boards_star_inactive} onClick={() => favoriteBoard(board.id)} />
                        <MenuCrud boardsId={board.id} onEdit={(text) => editingBoard(board.id, text)} onUpdate={() => deleteBoard(board.id)} />
                    </div>
                ))}
            </div>
            <h1 className={styles.title}>Meus Boards</h1>
            <div className={styles.MyBoards}>
                <div className={styles.add_board_container} onClick={() => handleCreateBoard()}>
                    <FontAwesomeIcon icon={faPlus} className={styles.icon_boards_plus} />
                </div>
                <div className={styles.boards_container}>
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
                            <FontAwesomeIcon icon={faStar} className={board.favorito ? styles.icon_boards_star_active : styles.icon_boards_star_inactive} onClick={() => favoriteBoard(board.id)} />
                            <MenuCrud boardsId={board.id} onEdit={(text) => editingBoard(board.id, text)} onUpdate={() => deleteBoard(board.id)} />
                        </div>

                    ))}
                    {
                        isModalOpen && (
                            <Modal Edition={Edition} handleInputChange={handleInputChange} inputValue={inputValue} />
                        )}
                </div>
            </div>
        </div >
    );
};

export default MyBoard;