import Header from '../../components/Header';
import styles from './index.module.css'
import { FaEllipsisV } from "react-icons/fa";


const Board = () => {
    return ( 
        <>
            <Header logged={true} />
            <div className={styles.main_board}>
                <div>
                    <h1 className={styles.board_title}>Board title</h1>
                    {/* <button></button> */}
                </div>
                <div className={styles.board_container}>
                    <div className={styles.card}>
                        <div>
                            <h2 className={styles.card_title}>Card title</h2>
                            {/* icon */}
                        </div>
                        <div className={styles.task}>
                            <h3 className={styles.task_title}>Task title Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure doloribus modi unde recusandae officiis mollitia tenetur. Numquam fugiat explicabo, repellendus aliquid blanditiis ex, nostrum, voluptatum doloremque eum tempora repudiandae repellat. </h3>
                            <FaEllipsisV className={styles.icons} />
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Board;