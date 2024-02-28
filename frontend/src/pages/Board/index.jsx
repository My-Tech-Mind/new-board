import Button from '../../components/Button';
import Header from '../../components/Header';
import styles from './index.module.css'
import { useState } from 'react';
import { FaEllipsisV, FaRegSave, FaPen, FaPlus } from "react-icons/fa";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const Board = () => {
    // const initialTasks = [
    //     { id: '1', title: 'Task title 1' },
    //     { id: '2', title: 'Task title 2' },
    //     { id: '3', title: 'Task title 3' }
    // ]
    const initialCards = [
        {
            id: '123',
            title: 'Card title',
            tasks: [
                { id: '1', title: 'Task title 1' },
                { id: '2', title: 'Task title 2' },
                { id: '3', title: 'Task title 3' }
            ]
        },
        {
            id: '321',
            title: 'Card 2 title',
            tasks: [
                { id: '4', title: 'Task title 4' },
                { id: '5', title: 'Task title 5' },
                { id: '6', title: 'Task title 6' }
            ]
        }
    ]

    const [cards, setCards] = useState(initialCards)

    const addCard =
        <div className={styles.add_card_container}>
            <FaPlus className={styles.icon_card_plus} />
            <h1 className={styles.card_title}>Add Card</h1>
        </div>
    
    const addTask =
        <div className={styles.add_task_container}>
            <FaPlus className={styles.icon_task_plus} />
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

                    <DragDropContext>
                        {initialCards.map((card) => (
                        <div>
                            <Droppable droppableId={card.id}>
                                {(provided) => (
                                    <div ref={provided.innerRef} className={styles.card}>
                                    <div className={styles.card_title_container}>
                                        <h2 className={styles.card_title}>{card.title}</h2>
                                        <FaEllipsisV className={styles.title_card_icon} />
                                    </div>
                                        {(card.tasks).map((task, index) => (
                                            <Draggable draggableId={task.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}
                                                        ref={provided.innerRef}
                                                        className={`${styles[{ ...provided.draggableProps.style }]} ${styles.task}`}
                                                    >
                                                        <h3 className={styles.task_title}>{task.title}</h3>
                                                        <FaEllipsisV className={styles.icons} />
                                                    </div>
                                                )}
                                        </Draggable>
                                        
                                    ))}
                                    <Button title={addTask} href='#' style='task_button' />
                                    
                                </div>
                                )}
                                
                            </Droppable>
                        
                    </div>
                ))}
                    <Button title={addCard} href='#' style='card_button' />
                    </DragDropContext>

                    
                </div>
            </div>
        </>
     );
}
 
export default Board;