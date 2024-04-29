import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuCrud from '../MenuCrud';
import styles from './index.module.css';
import { FaPlus, FaStar } from 'react-icons/fa';
import LoadBoards from '../LoadBoards';
import Modal from '../modalComponents/Boards/ModalEditBoard';
import ModalDelete from '../modalComponents/Boards/ModalDelete';
import Loading from '../../components/Loading/index';
import ServerError from '../../components/modalComponents/ServerError';
import LimitError from '../../components/modalComponents/LimitError';

const MyBoard = () => {
    const { serverError, loading, boards, createBoard, toggleFavorite, deleteBoard, updateBoardTitle } = LoadBoards();

    const [editingBoardId, setEditingBoardId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [boardIdToDelete, setBoardIdToDelete] = useState(null);
    const [limitPlan, setLimitPlan] = useState(false)

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
            const response = await createBoard(boardTitle);
            if (response === true) {
                setLimitPlan(true);
            }
        } catch (error) {
            console.error('Erro ao criar board:', error);
        }
    };
    const duplicateBoard = async (boardId) => {
        try {
            const name = boards.filter(board => board.id === boardId)[0]?.title;
            const response = await createBoard(name);
            if (response === true) {
                setLimitPlan(true);
            }
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

    const handleLimitPlan = (status) => {
        setLimitPlan(status)
    }

    const isFavorited = boards.find(board => board?.favorited);

    return (
        <>
            {loading && <Loading/>}
            {serverError && <ServerError />}
            {limitPlan && (<LimitError onOpenModal={handleLimitPlan} />)}
            <div className={styles.container}>
                {isFavorited?.favorited &&
                    <h1 className={styles.title}>Favorites</h1>
                }
                <div className={styles.MyFavoriteBoards}>
                    {boards.filter(board => board?.favorited).map(board => (
                        <div key={board?.id} className={styles.boards}>
                            <Link to={`/board/${board?.id}`} className={styles.boardLink}>
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
                                
                            </Link>
                            <FaStar className={board.favorited ? styles.icon_boards_star_active : styles.icon_boards_star_inactive} onClick={() => toggleFavorite(board.id)} />
                            <MenuCrud boardsId={board.id}
                                onEdit={(text) => updateBoardTitle(board.id, text)}
                                onUpdate={() => handleDeleteBoard(board.id)}
                                onDuplicate={() => duplicateBoard(board.id)} />
                        </div>
                    ))}

                </div>
                <h1 className={styles.title}>My Boards</h1>
                <div className={styles.MyBoards}>
                    <div className={styles.add_board_container} onClick={() => handleCreateBoard()}>
                        <FaPlus className={styles.icon_boards_plus} />
                    </div>
                    <div className={styles.boards_container}>
                        {boards.map(board => (
                            <div key={board?.id} className={styles.boards}>
                                <Link to={`/board/${board?.id}`} className={styles.boardLink}>
                                    {editingBoardId === board?.id ? (
                                        <div
                                            className={styles.boards_name}
                                            onDoubleClick={() => setEditingBoardId(board?.id)}
                                        >
                                            {board?.title}
                                        </div>
                                    ) : (
                                        <div
                                            className={styles.boards_name}
                                            onDoubleClick={() => setEditingBoardId(board?.id)}
                                        >
                                            {board?.title}
                                        </div>
                                    )}
                                
                                </Link>
                                <FaStar className={board?.favorited ? styles.icon_boards_star_active : styles.icon_boards_star_inactive}
                                        onClick={() => toggleFavorite(board.id)} />

                                    <MenuCrud boardsId={board?.id}
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
        </>
    );
};

export default MyBoard;