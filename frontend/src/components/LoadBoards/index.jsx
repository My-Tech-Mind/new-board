import { useState, useEffect } from 'react';
import { listBoards, createBoards, deleteBoards, updateBoards, detailBoards } from '../../services/api/boards/boards';
import { createNotification } from '../Notifications/index';

const LoadBoards = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState(false);
    
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const fetchedBoards = await listBoards();
                setBoards(fetchedBoards.data);
                setLoading(false);
            } catch (error) {
                console.error('Error to load boards:', error);
                setLoading(false);
                setServerError(true);
            }
        };
        fetchBoards();
    }, []);

    const deleteBoard = async (boardId) => {
        try {
            await deleteBoards(boardId);
            setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
            createNotification('success', "Board deleted!", "Board was successfully deleted.");
        } catch (error) {
            console.error('Error to delete board:', error);
            createNotification('error', "Failed to delete board!", "Internal server error.");
        }
    };

    const createBoard = async (title) => {
        try {
            const newBoard = await createBoards({ title });
            if(newBoard.request.status === 201){
                setBoards(prevBoards => [...prevBoards, newBoard.data]);
                createNotification('success', "Board created!", "Board was successfully created.");
            } else if (newBoard.request.status === 403) {
                return true
            } else if (newBoard.response.status === 400) {
                return createNotification('error', "Cannot create this board!", "You can not create a empty board or more than 20 characteres.");
            }
            
        } catch (error) {
            console.error('Error to create board:', error);
            createNotification('error', "Failed to create board!", "Internal server error.");
        }
    };

    const updateBoardTitle = async (boardId, newTitle) => {
        try {
            const updateBoard = await updateBoards(boardId, { title: newTitle });
            if (updateBoard.response.status === 400) {
                return createNotification('error', "Cannot updated this board!", "You can not create a empty board or more than 20 characteres.");
            }
            setBoards(prevBoards => prevBoards.map(board => board.id === boardId ? { ...board, title: newTitle } : board));
            createNotification('success', "Updated board title!", "The board title was updated successfully.");
        } catch (error) {
            console.error('Error to favorite the board:', error);
            createNotification('error', "Failed to update board!", "Internal server error.");
        }
    };

    const toggleFavorite = async (boardId) => {
        try {
            const targetBoard = boards.find(board => board.id === boardId);

            if (targetBoard) {
                const newFavoriteValue = !targetBoard.favorited;

                setBoards(prevBoards => prevBoards.map(board => {
                    if (board.id === boardId) {
                        return { ...board, favorited: newFavoriteValue };
                    }
                    return board;
                }));

                await updateBoards(boardId, { title: targetBoard.title, favorited: newFavoriteValue });
                createNotification('success', `${newFavoriteValue? 'Board saved as favorite':'Board removed from favorites'}`, `${newFavoriteValue?'Board was successfully favorited':'Board has been successfully removed from favorites'}`);
            }
        } catch (error) {
            console.error('Error to favorite the board:', error);
            createNotification('error', "Failed to favorite board!", "Internal server error.");
        }
    };

    return { serverError, loading, boards, toggleFavorite, deleteBoard, createBoard, updateBoardTitle };
};

export default LoadBoards;
