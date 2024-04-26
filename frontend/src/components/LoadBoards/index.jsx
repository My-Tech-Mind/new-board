import { useState, useEffect } from 'react';
import { listBoards, createBoards, deleteBoards, updateBoards, detailBoards } from '../../services/api/boards/boards';
import { createNotification } from '../Notifications/index';
import LimitError from '../modalComponents/LimitError/index'; 
const LoadBoards = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const fetchedBoards = await listBoards();
                setBoards(fetchedBoards);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar boards:', error);
                setLoading(false);
            }
        };
        fetchBoards();
    }, []);

    const deleteBoard = async (boardId) => {
        try {
            await deleteBoards(boardId);
            setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
        } catch (error) {
            console.error('Erro ao excluir board:', error);
        }
    };

    const createBoard = async (title) => {
        try {
            const newBoard = await createBoards({ title });
            if(newBoard.request.status === 201){
                setBoards(prevBoards => [...prevBoards, newBoard.data]);
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
        } catch (error) {
            console.error('Erro ao atualizar título do board:', error);
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
            }
        } catch (error) {
            console.error('Erro ao alternar favorito do board:', error);
        }
    };



    return { loading, boards, toggleFavorite, deleteBoard, createBoard, updateBoardTitle };
};

export default LoadBoards;
