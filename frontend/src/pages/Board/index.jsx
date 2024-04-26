import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { FaPen } from "react-icons/fa";
import styles from './index.module.css';
import Cards from '../../components/Cards';
import CardBox from '../../components/modalComponents/Board/CardBox';
import { FaTimes } from 'react-icons/fa';
import detailBoard from '../../services/api/board/board';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/index';
import { updateBoards } from '../../services/api/boards/boards';
import ServerError from '../../components/modalComponents/ServerError';

const Board = () => {
    const [openBoardTitleBox, setOpenBoardTitleBox] = useState(false);
    const [titleBoard, setTitleBoard] = useState('');
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState(false);
    const { boardId } = useParams();
    useEffect(() => {
        const handleGetTitleBoard = async () => {
            try {
                const response = await detailBoard(boardId);
                setTitleBoard(response.title);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
                setLoading(false);
                setServerError(true);
            }
        }
        handleGetTitleBoard();
    }, [])

    const editBoardTitle = () => {
        setOpenBoardTitleBox(!openBoardTitleBox);
    }

    const handleEditTitle = async (title) => {
        try {
            const response = await updateBoards(boardId, { title });
            setTitleBoard(title);
            return response;
        } catch (error) {
            console(error.message);
        }   
    }

    const handleSaveCard = (save) => {
        setOpenBoardTitleBox(!save);
    }

    return (
        <>  
            {loading && <Loading />}
            {serverError && <ServerError/>}
            
            <Header logged={true} />
            {/* <LimitError /> */}
            <div className={styles.main_board}>
                {openBoardTitleBox && (
                    <>
                        <FaTimes className={styles.close_icon} onClick={editBoardTitle} />
                        <CardBox title='Change board name' buttonName='Save' onSave={handleSaveCard}
                        onCreateOrEdit={handleEditTitle} />
                        
                    </>
                )}
                <div className={styles.board_header}>
                    <div className={styles.board_title_icon}>
                        <h1 className={styles.board_title}>{titleBoard}</h1>
                        <FaPen className={styles.icons} onClick={editBoardTitle} />
                    </div>
                </div>

                <div className={styles.board_container}>
                    <Cards />
                </div>
            </div>
</>
);
};

export default Board;
