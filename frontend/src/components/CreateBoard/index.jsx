
import React from 'react';
import MenuCrud from '../MenuCrud';
import styles from './index.module.css';

const CreateBoard = () => {
    return (
        <div className={styles.boards}>
            <input
                placeholder='Meu board'
                type='text'
                className={styles.boards_name} />
            <MenuCrud />
        </div>

    );
};

export default CreateBoard;