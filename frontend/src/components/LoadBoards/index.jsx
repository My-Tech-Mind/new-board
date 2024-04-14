import { useState, useEffect } from 'react';
import { listBoards, createBoards, deleteBoards, updateBoards, detailBoards } from '../../services/api/boards/boards';

const LoadBoards = () => {
    const [boards, setBoards] = useState([]);
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const fetchedBoards = await listBoards();
                setBoards(fetchedBoards);
            } catch (error) {
                console.error('Erro ao carregar boards:', error);
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
            setBoards(prevBoards => [...prevBoards, newBoard]);
        } catch (error) {
            console.error('Erro ao criar board:', error);
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
    const detailBoard = async (boardId) => {
        try {
            console.log(boardId)
            await detailBoards(boardId);
        } catch (error) {
            console.error('Erro ao listar os cards:', error);
        }

    }


    return { boards, toggleFavorite, deleteBoard, createBoard, updateBoardTitle, detailBoard };
};

export default LoadBoards;
