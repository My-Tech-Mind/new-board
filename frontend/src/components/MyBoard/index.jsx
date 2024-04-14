import React, { useState, useEffect } from 'react';
import MenuCrud from '../MenuCrud';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { FaPlus, FaStar } from 'react-icons/fa';
import LoadBoards from '../LoadBoards';
import Modal from '../modalComponents/Boards/ModalEditBoard';
import ModalDelete from '../modalComponents/Boards/ModalDelete';

const MyBoard = () => {
    const { boards, createBoard, toggleFavorite, deleteBoard, updateBoardTitle } = LoadBoards();

    const [editingBoardId, setEditingBoardId] = useState(null);
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

    const createNewBoard = async (boardTitle) => {
        try {
            await createBoard(boardTitle);
        } catch (error) {
            console.error('Erro ao criar board:', error);
        }
    };
    const duplicateBoard = async (boardId) => {
        try {
            const name = boards.filter(board => board.id === boardId)[0]?.title;
            await createBoard(name);
        } catch (error) {
            console.error('Erro ao criar board:', error);
        }

    };

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
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meus favoritos</h1>
            <div className={styles.MyFavoriteBoards}>
                {boards.filter(board => board.favorited).map(board => (
                    <div key={board.id} className={styles.boards}>
                        <Link to={`/cards/boards/${board.id}`} className={styles.boardLink}>
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
                            <FaStar className={board.favorited ? styles.icon_boards_star_active : styles.icon_boards_star_inactive} onClick={() => toggleFavorite(board.id)} />
                            <MenuCrud boardsId={board.id}
                                onEdit={(text) => updateBoardTitle(board.id, text)}
                                onUpdate={() => handleDeleteBoard(board.id)}
                                onDuplicate={() => duplicateBoard(board.id)} />
                        </Link>
                    </div>
                ))}

            </div>
            <h1 className={styles.title}>Meus Boards</h1>
            <div className={styles.MyBoards}>
                <div className={styles.add_board_container} onClick={() => handleCreateBoard()}>
                    <FaPlus className={styles.icon_boards_plus} />
                </div>
                <div className={styles.boards_container}>
                    {boards.map(board => (
                        <div key={board.id} className={styles.boards}>
                            <Link to={`/cards/boards/${board.id}`} className={styles.boardLink}>
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
                                <FaStar className={board.favorited ? styles.icon_boards_star_active : styles.icon_boards_star_inactive}
                                    onClick={() => toggleFavorite(board.id)} />

                                <MenuCrud boardsId={board.id}
                                    onEdit={(text) => updateBoardTitle(board.id, text)}
                                    onUpdate={() => handleDeleteBoard(board.id)}
                                    onDuplicate={() => duplicateBoard(board.id)} />
                            </Link>
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