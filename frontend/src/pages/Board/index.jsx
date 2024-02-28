import Button from '../../components/Button';
import Header from '../../components/Header';
import styles from './index.module.css'
import { useState } from 'react';
import { FaEllipsisV, FaRegSave, FaPen, FaPlus } from "react-icons/fa";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const Board = () => {
    const initialCards = [
        {
            id: '123',
            title: 'Card 1',
            tasks: [
                { id: '1', title: 'Task title 1' },
                { id: '2', title: 'Task title 2' },
                { id: '3', title: 'Task title 3' }
            ]
        },
        {
            id: '321',
            title: 'Card 2',
            tasks: [
                { id: '4', title: 'Task title 4' },
                { id: '5', title: 'Task title 5' },
                { id: '6', title: 'Task title 6' }
            ]
        },
        {
            id: '456',
            title: 'Card 3',
            tasks: [
                { id: '7', title: 'Task title 7' },
                { id: '8', title: 'Task title 8' },
                { id: '9', title: 'Task title 9' }
            ]
        }
    ]

    const [cards, setCards] = useState(initialCards)

    console.log(cards)

    const addCard =
        <div className={styles.add_card_container}>
            <FaPlus className={styles.icon_card_plus} />
            <h1 className={styles.card_title}>Add Card</h1>
        </div>
    
    const addTask =
        <div className={styles.add_task_container}>
            <FaPlus className={styles.icon_task_plus} />
        </div>
    
    const onDragEnd = (result) => {
        let sourceCardsTasks = []
        let destinationCardsTasks = []
        let draggedTask = {}
        let sourceCardIndex = 0
        let destinationCardIndex = 0

        for (let i in cards) {
            if (cards[i].id == result.source.droppableId) {
                sourceCardsTasks = cards[i].tasks
                sourceCardIndex = i
            } else if (cards[i].id == result.destination.droppableId) {
                destinationCardsTasks = cards[i].tasks 
                destinationCardIndex = i
            }
        }
        console.log(sourceCardsTasks)
        console.log(destinationCardsTasks)

        for (let i in sourceCardsTasks) {
            if (sourceCardsTasks[i].id == result.draggableId) {
                draggedTask = sourceCardsTasks[i]
            }
        }

        let filteredSourceCardsTasks = sourceCardsTasks.filter((task) => (
            task.id != result.draggableId))
        
        if (result.source.droppableId == result.destination.droppableId) {
            filteredSourceCardsTasks.splice(result.destination.index, 0, draggedTask)
            
            let cardsCopy = JSON.parse(JSON.stringify(cards))
            cardsCopy[sourceCardIndex].tasks = filteredSourceCardsTasks
            setCards(cardsCopy)
        } else {
            destinationCardsTasks.splice(result.destination.index, 0, draggedTask)
            
            let cardsCopy = JSON.parse(JSON.stringify(cards))
            cardsCopy[sourceCardIndex].tasks = filteredSourceCardsTasks
            cardsCopy[destinationCardIndex].tasks = destinationCardsTasks
            setCards(cardsCopy)
        }
    }
    
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

                    <DragDropContext onDragEnd={onDragEnd}>
                        {cards.map((card) => (
                            <div>
                                <Droppable droppableId={card.id} key={card.id}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} className={styles.card}>
                                        <div className={styles.card_title_container}>
                                            <h2 className={styles.card_title}>{card.title}</h2>
                                            <FaEllipsisV className={styles.title_card_icon} />
                                        </div>
                                            {(card.tasks).map((task, index) => (
                                                <Draggable draggableId={task.id} index={index} key={task.id}>
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
                                        {provided.placeholder}
                                            
                                    <div>
                                        <Button title={addTask} href='#' style='task_button' />
                                    </div>
                                    
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