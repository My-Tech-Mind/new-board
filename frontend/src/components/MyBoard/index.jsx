import React, { useState, useEffect, useCallback } from 'react';
import MenuCrud from '../MenuCrud';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import LoadBoards from '../LoadBoards';
import Modal from '../Modal';
import ModalDelete from '../ModalDelete';
const MyBoard = () => {
    let [boards, setBoards] = useState([]);
    const [editingBoardId, setEditingBoardId] = useState(null);
    const [nextBoardId, setNextBoardId] = useState(4);
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [boardIdToDelete, setBoardIdToDelete] = useState(null);

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

    const { toggleFavorite, deleteBoard, createBoard, updateBoardTitle } = LoadBoards({ setBoards: setBoardsCallback });

    useEffect(() => {

    }, [boards]);

    const duplicateBoard = (boardId) => {
        const name = boards.filter(board => board.id === boardId)[0]?.title;
        createBoard(nextBoardId, name);
        setNextBoardId(prevId => prevId + 1);
    }
    const handleBoardTitleBlur = () => {
        setEditingBoardId(null);
    };

    const Delete = (action, boardId) => {
        if (action === 'finish') {
            deleteBoard(boardId);
            setIsModalDeleteOpen(false);
        } else {
            setIsModalDeleteOpen(false);
        }
    };
    const handleDeleteBoard = (boardId) => {
        setIsModalDeleteOpen(true);
        setBoardIdToDelete(boardId);
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meus favoritos</h1>
            <div className={styles.MyFavoriteBoards}>
                {boards.filter(board => board.favorito).map(board => (
                    <div key={board.id} className={styles.boards}>
                        {editingBoardId === board.id ? (
                            < textarea
                                type="text"
                                className={styles.boards_name}
                                value={board.title}
                                onChange={(e) => updateBoardTitle(board.id, e.target.value)}
                                onBlur={handleBoardTitleBlur}
                            />
                        ) : (
                            <div
                                className={styles.boards_name}
                                onDoubleClick={() => setEditingBoardId(board.id)}
                            >
                                {board.title}
                            </div>
                        )}
                        <FontAwesomeIcon icon={faStar} className={board.favorito ? styles.icon_boards_star_active : styles.icon_boards_star_inactive} onClick={() => toggleFavorite(board.id)} />
                        <MenuCrud boardsId={board.id}
                            onEdit={(text) => updateBoardTitle(board.id, text)}
                            onUpdate={() => handleDeleteBoard(board.id)}
                            onDuplicate={() => duplicateBoard(board.id)} />
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
                                < textarea
                                    type="text"
                                    className={styles.boards_name}
                                    value={board.title}
                                    onChange={(e) => updateBoardTitle(board.id, e.target.value)}
                                    onBlur={handleBoardTitleBlur}
                                />
                            ) : (
                                <div
                                    className={styles.boards_name}
                                    onDoubleClick={() => setEditingBoardId(board.id)}
                                >
                                    {board.title}
                                </div>
                            )}
                            <FontAwesomeIcon
                                icon={faStar}
                                className={board.favorito ? styles.icon_boards_star_active : styles.icon_boards_star_inactive}
                                onClick={() => toggleFavorite(board.id)} />
                            <MenuCrud boardsId={board.id}
                                onEdit={(text) => updateBoardTitle(board.id, text)}
                                onUpdate={() => handleDeleteBoard(board.id)}
                                onDuplicate={() => duplicateBoard(board.id)} />
                        </div>

                    ))}
                    {
                        isModalOpen && (
                            <Modal
                                Edition={Edition}
                                handleInputChange={handleInputChange}
                                inputValue={inputValue} />
                        )}

                    {
                        isModalDeleteOpen && (
                            <ModalDelete
                                Delete={Delete} boardId={boardIdToDelete}
                            />
                        )
                    }
                </div>
            </div>
        </div >
    );
};

export default MyBoard;