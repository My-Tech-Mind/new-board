import boardsData from '../../Boads.json';
import { useEffect } from 'react';

const LoadBoards = ({ setBoards }) => {
    useEffect(() => {
        const storedBoards = JSON.parse(localStorage.getItem('boards'));
        const initialBoards = storedBoards ? storedBoards : boardsData.Myboards;

        setBoards(initialBoards);
        localStorage.setItem('boards', JSON.stringify(initialBoards));
    }, [setBoards]);

    const deleteBoard = (boardId) => {
        setBoards(prevBoards => {
            const updatedBoards = prevBoards.filter(board => board.id !== boardId);
            updateLocalStorage(updatedBoards);
            return updatedBoards;
        });
    };

    const createBoard = (tamanho, nome) => {
        setBoards(prevBoards => {
            const newBoard = { id: "board_" + tamanho, title: nome, favorito: false };
            const updatedBoards = [...prevBoards, newBoard];
            updateLocalStorage(updatedBoards);
            return updatedBoards;
        });
    };

    const updateBoardTitle = (boardId, newTitle) => {
        setBoards(prevBoards => {
            const updatedBoards = prevBoards.map(board =>
                board.id === boardId ? { ...board, title: newTitle } : board
            );
            updateLocalStorage(updatedBoards);
            return updatedBoards;
        });
    };

    const toggleFavorite = (boardId) => {
        setBoards(prevBoards => {
            const updatedBoards = prevBoards.map(board =>
                board.id === boardId ? { ...board, favorito: !board.favorito } : board
            );
            updateLocalStorage(updatedBoards);
            return updatedBoards;
        });
    };

    const updateLocalStorage = (boards) => {
        localStorage.setItem('boards', JSON.stringify(boards));
    };

    return { toggleFavorite, deleteBoard, createBoard, updateBoardTitle };
};

export default LoadBoards;
