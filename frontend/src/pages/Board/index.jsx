import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { FaPen } from "react-icons/fa";
import styles from './index.module.css';
import Cards from '../../components/Cards';

const Board = () => {
    return (
        <>
            <Header logged={true} />

            <div className={styles.main_board}>
                <div className={styles.board_header}>
                    <div className={styles.board_title_icon}>
                        <h1 className={styles.board_title}>Board title</h1>
                        <FaPen className={styles.icons} />
                    </div>
                    <Button href='#' title='Save changes' style='board_button' />
                </div>

                <div className={styles.board_container}>
                    <Cards />
                </div>
            </div>
        </>
    );
};

export default Board;
