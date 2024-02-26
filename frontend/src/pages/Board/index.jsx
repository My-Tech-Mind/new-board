import Button from '../../components/Button';
import Header from '../../components/Header';
import styles from './index.module.css'
import { FaEllipsisV, FaRegSave, FaPen, FaPlus } from "react-icons/fa";


const Board = () => {
    const addCard =
        <div className={styles.add_card_container}>
            <FaPlus />
            <h1 className={styles.card_title}>Add Card</h1>
        </div>
    
    const addTask =
        <div className={styles.add_card_container}>
            <FaPlus />
            <h1 className={styles.card_title}>Add Card</h1>
        </div>
    
    return ( 
        <>
            <Header logged={true} />
            <div className={styles.main_board}>
                <div className={styles.board_header}>
                    <div className={styles.board_title_icon}>
                        <h1 className={styles.board_title}>Board title</h1>
                        <FaPen className={styles.icons} />
                    </div>
                    <Button href='#' title='Save changes' style='board_button'/>
                </div>
                <div className={styles.board_container}>

                    <div>
                        <div className={styles.card}>
                            <div className={styles.card_title_container}>
                                <h2 className={styles.card_title}>Card title</h2>
                                <FaEllipsisV className={styles.title_card_icon} />
                            </div>
                            <div className={styles.task}>
                                <h3 className={styles.task_title}>Task title </h3>
                                <FaEllipsisV className={styles.icons} />
                            </div>
                            <div className={styles.task}>
                                <h3 className={styles.task_title}>Task title </h3>
                                <FaEllipsisV className={styles.icons} />
                            </div>
                            <div className={styles.task}>
                                <h3 className={styles.task_title}>Task title </h3>
                                <FaEllipsisV className={styles.icons} />
                            </div>
                        </div>
                    </div>


                    <div>
                        <div className={styles.card}>
                            <div className={styles.card_title_container}>
                                <h2 className={styles.card_title}>Card title</h2>
                                <FaEllipsisV className={styles.title_card_icon} />
                            </div>
                            <div className={styles.task}>
                                <h3 className={styles.task_title}>Task title </h3>
                                <FaEllipsisV className={styles.icons} />
                            </div>
                            <div className={styles.task}>
                                <h3 className={styles.task_title}>Task title </h3>
                                <FaEllipsisV className={styles.icons} />
                            </div>
                            <div className={styles.task}>
                                <h3 className={styles.task_title}>Task title </h3>
                                <FaEllipsisV className={styles.icons} />
                            </div>
                        </div>
                    </div>

                    <Button title={addCard} href='#' style='card_button' />
                    
                </div>
            </div>
        </>
     );
}
 
export default Board;