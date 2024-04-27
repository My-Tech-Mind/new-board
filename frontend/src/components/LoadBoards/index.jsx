import { useState, useEffect } from 'react';
import { listBoards, createBoards, deleteBoards, updateBoards, detailBoards } from '../../services/api/boards/boards';
import { createNotification } from '../Notifications/index';
import LimitError from '../modalComponents/LimitError/index'; 
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
                console.error('Erro ao carregar boards:', error);
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
            console.error('Erro ao excluir board:', error);
            createNotification('error', "Failed to delete board!", "Internal server error.");
        }
    };

    const createBoard = async (title) => {
        try {
            const newBoard = await createBoards({ title });
            if(newBoard.request.status === 201){
                setBoards(prevBoards => [...prevBoards, newBoard.data]);
                createNotification('success', "Board created!", "Board was successfully created.");
            } else if(newBoard.request.status === 403){
                <LimitError/>
                createNotification('error', "Failed to create board!", JSON.parse(newBoard.request.response).message);
            }
            
        } catch (error) {
            console.error('Erro ao criar board:', error);
            createNotification('error', "Failed to create board!", "Internal server error.");
        }
    };

    const updateBoardTitle = async (boardId, newTitle) => {
        try {
            await updateBoards(boardId, { title: newTitle });
            setBoards(prevBoards => prevBoards.map(board => board.id === boardId ? { ...board, title: newTitle } : board));
            createNotification('success', "Updated board title!", "The board title was updated successfully."); //verificar Status Code
        } catch (error) {
            console.error('Erro ao atualizar título do board:', error);
            createNotification('error', "Failed to update board!", "Internal server error.");
        }
    };

    const toggleFavorite = async (boardId) => {
        try {
            // Encontra o board pelo ID
            const targetBoard = boards.find(board => board.id === boardId);

            if (targetBoard) {
                const newFavoriteValue = !targetBoard.favorited;

                // Atualiza o board localmente com o novo valor do favorito
                setBoards(prevBoards => prevBoards.map(board => {
                    if (board.id === boardId) {
                        return { ...board, favorited: newFavoriteValue };
                    }
                    return board;
                }));

                // Atualiza o board no servidor para refletir a mudança
                await updateBoards(boardId, { title: targetBoard.title, favorited: newFavoriteValue });
                createNotification('success', `${newFavoriteValue? 'Bord saved as favorite':'Bord removed from favorites'}`, `${newFavoriteValue?'Board was successfully favored':'Board has been successfully removed from favorites'}`);
            }
        } catch (error) {
            console.error('Erro ao alternar favorito do board:', error);
            createNotification('error', "Failed to favorite board!", "Internal server error.");
        }
    };



    return { serverError, loading, boards, toggleFavorite, deleteBoard, createBoard, updateBoardTitle };
};

export default LoadBoards;
