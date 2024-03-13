import board from '../MyBoard/Boads.json';
import { useEffect } from 'react';
const LoadBoards = ({ setBoards, onDeleteBoard }) => {
    const Myboards = board.Myboards;

    useEffect(() => {
        setBoards(Myboards);
        return onDeleteBoard;
    }, [setBoards, onDeleteBoard]);

    const deleteBoard = (boardsId) => {
        console.log(`Excluindo o quadro com o ID ${boardsId}`);

        const updatedBoards = Myboards.filter(boards => boards.id !== boardsId);
        setBoards(updatedBoards);

    };

    return deleteBoard;


};
export default LoadBoards;