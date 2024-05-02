import { useState, useEffect } from 'react';
import { listBoards, createBoards, deleteBoards, updateBoards, detailBoards } from '../../services/api/boards/boards';
<<<<<<< HEAD

const LoadBoards = () => {
    const [boards, setBoards] = useState([]);
=======
import { createNotification } from '../Notifications/index';

const LoadBoards = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState(false);
    
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const fetchedBoards = await listBoards();
<<<<<<< HEAD
                setBoards(fetchedBoards);
            } catch (error) {
                console.error('Erro ao carregar boards:', error);
=======
                setBoards(fetchedBoards.data);
                setLoading(false);
            } catch (error) {
                console.error('Error to load boards:', error);
                setLoading(false);
                setServerError(true);
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
            }
        };
        fetchBoards();
    }, []);

    const deleteBoard = async (boardId) => {
        try {
            await deleteBoards(boardId);
            setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
<<<<<<< HEAD
        } catch (error) {
            console.error('Erro ao excluir board:', error);
=======
            createNotification('success', "Board deleted!", "Board was successfully deleted.");
        } catch (error) {
            console.error('Error to delete board:', error);
            createNotification('error', "Failed to delete board!", "Internal server error.");
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
        }
    };

    const createBoard = async (title) => {
        try {
            const newBoard = await createBoards({ title });
<<<<<<< HEAD
            setBoards(prevBoards => [...prevBoards, newBoard]);
        } catch (error) {
            console.error('Erro ao criar board:', error);
=======
            if(newBoard.request.status === 201){
                setBoards(prevBoards => [...prevBoards, newBoard.data]);
                createNotification('success', "Board created!", "Board was successfully created.");
            } else if (newBoard.request.status === 403) {
                return true
            } else if (newBoard.response?.status === 400) {
                return createNotification('error', "Cannot create this board!", "You can not create a empty board or more than 20 characteres.");
            }
            
        } catch (error) {
            console.error('Error to create board:', error);
            createNotification('error', "Failed to create board!", "Internal server error.");
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
        }
    };

    const updateBoardTitle = async (boardId, newTitle) => {
        try {
<<<<<<< HEAD
            await updateBoards(boardId, { title: newTitle });
            setBoards(prevBoards => prevBoards.map(board => board.id === boardId ? { ...board, title: newTitle } : board));
        } catch (error) {
            console.error('Erro ao atualizar título do board:', error);
=======
            const updateBoard = await updateBoards(boardId, { title: newTitle });
            if (updateBoard.response?.status === 400) {
                return createNotification('error', "Cannot updated this board!", "You can not create a empty board or more than 20 characteres.");
            }
            setBoards(prevBoards => prevBoards.map(board => board.id == boardId ? { ...board, title: newTitle } : board));
            createNotification('success', "Updated board title!", "The board title was updated successfully.");
        } catch (error) {
            console.log('Error to update the board:', error);
            createNotification('error', "Failed to update board!", "Internal server error.");
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
        }
    };

    const toggleFavorite = async (boardId) => {
        try {
<<<<<<< HEAD
            // Encontra o board pelo ID
=======
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
            const targetBoard = boards.find(board => board.id === boardId);

            if (targetBoard) {
                const newFavoriteValue = !targetBoard.favorited;

<<<<<<< HEAD
                // Atualiza o board localmente com o novo valor do favorito
=======
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
                setBoards(prevBoards => prevBoards.map(board => {
                    if (board.id === boardId) {
                        return { ...board, favorited: newFavoriteValue };
                    }
                    return board;
                }));

<<<<<<< HEAD
                // Atualiza o board no servidor para refletir a mudança
                await updateBoards(boardId, { title: targetBoard.title, favorited: newFavoriteValue });
            }
        } catch (error) {
            console.error('Erro ao alternar favorito do board:', error);
        }
    };



    return { boards, toggleFavorite, deleteBoard, createBoard, updateBoardTitle };
=======
                await updateBoards(boardId, { title: targetBoard.title, favorited: newFavoriteValue });
                createNotification('success', `${newFavoriteValue? 'Board saved as favorite':'Board removed from favorites'}`, `${newFavoriteValue?'Board was successfully favorited':'Board has been successfully removed from favorites'}`);
            }
        } catch (error) {
            console.error('Error to favorite the board:', error);
            createNotification('error', "Failed to favorite board!", "Internal server error.");
        }
    };

    return { serverError, loading, boards, toggleFavorite, deleteBoard, createBoard, updateBoardTitle };
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
};

export default LoadBoards;
