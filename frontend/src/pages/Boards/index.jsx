import styles from './index.module.css';
import MyBoard from '../../components/MyBoard';
import Button from '../../components/Button';
import Header from '../../components/Header';

const Boards = () => {

    return (
        <>
            <Header logged={true} />
            <div className={styles.boards_header}>
                <h1 className={styles.title}>Meus favoritos</h1>
                <div className={styles.button}>
                    <Button href='#' title='Save changes' style='board_button' />
                </div>
                {/* Favorite board */}
            </div>
            <MyBoard />

        </>
    );
}

export default Boards;