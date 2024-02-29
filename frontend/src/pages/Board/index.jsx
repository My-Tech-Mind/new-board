import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { FaEllipsisV, FaPen, FaPlus } from "react-icons/fa";
import styles from './index.module.css';

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
    ];

    const addCard =
        <div className={styles.add_card_container}>
            <FaPlus className={styles.icon_card_plus} />
            <h1 className={styles.card_title}>Add Card</h1>
        </div>
    
    const addTask =
        <div className={styles.add_task_container}>
            <FaPlus className={styles.icon_task_plus} />
        </div>

    const [cards, setCards] = useState(initialCards);

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (type === 'CARD') {
            const newCards = Array.from(cards);
            const [movedCard] = newCards.splice(source.index, 1);
            newCards.splice(destination.index, 0, movedCard);
        
            setCards(newCards);
        } else if (type === 'TASK') {
            const sourceCard = cards.find((card) => card.id === source.droppableId);
            const destinationCard = cards.find((card) => card.id === destination.droppableId);

            if (sourceCard === destinationCard) {
                const newTasks = Array.from(sourceCard.tasks);
                const [movedTask] = newTasks.splice(source.index, 1);
                newTasks.splice(destination.index, 0, movedTask);

                const newCard = {
                    ...sourceCard,
                    tasks: newTasks,
                };

                const newCards = cards.map((card) =>
                    card.id === newCard.id ? newCard : card
                );

                setCards(newCards);
            } else {
                const sourceTasks = Array.from(sourceCard.tasks);
                const destinationTasks = Array.from(destinationCard.tasks);
                const [movedTask] = sourceTasks.splice(source.index, 1);
                destinationTasks.splice(destination.index, 0, movedTask);

                const newSourceCard = {
                    ...sourceCard,
                    tasks: sourceTasks,
                };

                const newDestinationCard = {
                    ...destinationCard,
                    tasks: destinationTasks,
                };

                const newCards = cards.map((card) =>
                    card.id === sourceCard.id ? newSourceCard : card.id === destinationCard.id ? newDestinationCard : card
                );

                setCards(newCards);
            }
        }
    };

    

    //<Button title={addCard} href='#' style='card_button' />

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
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="all-cards" direction="horizontal" type='CARD'>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={styles.board_container}
                                    >
                                        {cards.map((card, index) => (
                                            <div>
                                                                                                <Draggable draggableId={card.id} index={index} key={card.id}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={styles.card}
                                                    >
                                                        <div className={styles.card_title_container} {...provided.dragHandleProps}>
                                                            <h2 className={styles.card_title}>{card.title}</h2>
                                                            <FaEllipsisV className={styles.title_card_icon} />
                                                        </div>
                                                        <Droppable droppableId={card.id} key={card.id} type="TASK">
                                                            {(provided) => (
                                                                <div ref={provided.innerRef} {...provided.droppableProps} className={styles.task_container}>
                                                                    {card.tasks.map((task, index) => (
                                                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                                                            {(provided) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    className={styles.task}
                                                                                >
                                                                                    <h3 className={styles.task_title}>{task.title}</h3>
                                                                                    <FaEllipsisV className={styles.icons} />
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    ))}
                                
                                                                    <div>
                                                                        <Button title={addTask} href='#' style='task_button' />
                                                                    </div>
                                                                    {provided.placeholder}
                                
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </div>
                                                )}
                                            </Draggable>
                                            </div>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
</>
);
};

export default Board;
