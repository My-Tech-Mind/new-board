import styles from './index.module.css';
import MyBoard from '../../components/MyBoard';
import Header from '../../components/Header';

const Boards = () => {
    return (
        <>
            <Header logged={true} />
            <div className={styles.boards}>
                <MyBoard />
            </div>
        </>
    );
}

export default Boards;