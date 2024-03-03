import React from 'react';
import MenuCrud from '../DuplicarBoard';
import styles from './index.module.css';
const NewBoard = ({ texto }) => {
    return (
        <div className={styles.boards}>
            <p className={styles.boards_name}>Boards Name</p>
            <MenuCrud />
        </div>
    );
};

export default NewBoard;