import boardsData from '../MyBoard/Boads.json';
import { useEffect } from 'react';

const LoadBoards = ({ setBoards }) => {
    useEffect(() => {
        const storedBoards = JSON.parse(localStorage.getItem('boards'));
        const initialBoards = storedBoards ? storedBoards : boardsData.Myboards;
        console.log(initialBoards);
        console.log(storedBoards);
        setBoards(prevBoards => {
            if (prevBoards !== initialBoards) {
                return initialBoards;
            }
            return prevBoards;
        });

        localStorage.setItem('boards', JSON.stringify(initialBoards));
    }, [setBoards]);

    const deleteBoard = (boardId) => {
        setBoards(prevBoards => {
            const updatedBoards = prevBoards.filter(board => board.id !== boardId);
            localStorage.setItem('boards', JSON.stringify(updatedBoards));
            return updatedBoards;
        });
    };

    const createBoard = (tamanho) => {
        setBoards(prevBoards => {
            const newBoard = { id: "card_" + tamanho, title: "myBoards" };
            const updatedBoards = [...prevBoards, newBoard];
            localStorage.setItem('boards', JSON.stringify(updatedBoards));
            return updatedBoards;
        });
    };

    return { deleteBoard, createBoard };
};

export default LoadBoards;
