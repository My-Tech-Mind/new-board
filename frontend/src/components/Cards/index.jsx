import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '../../components/Button';
import Tasks from '../Tasks';
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import styles from './index.module.css';

const Cards = () => {
    const initialCards = [
        {
            id: '11',
            title: 'To do',
            tasks: [
                { id: '111', title: 'Untitled' }
            ]
        },
        {
            id: '12',
            title: 'Doing',
            tasks: [
                { id: '222', title: 'Untitled' }
            ]
        },
        {
            id: '13',
            title: 'Done',
            tasks: [
                { id: '333', title: 'Untitled' }
            ]
        }
    ];
        
    
    const [cards, setCards] = useState(initialCards);

    const onDragEnd = (result) => {
        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        if (type === 'card') {
            const newCards = Array.from(cards);
            const [movedCard] = newCards.splice(source.index, 1);
            newCards.splice(destination.index, 0, movedCard);
        
            setCards(newCards);

        } else if (type === 'task') {
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

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-cards" direction="horizontal" type='card'>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={styles.board_container}
                        >
                            {cards.map((card, index) => (
                                <div>
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
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
                                                
                                            <Droppable droppableId={card.id} key={card.id} type="task">
                                                                                                                                                            {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps} className={styles.task_container}>
                                                        <Tasks tasks={card.tasks} />
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>
                                    )}
                                    </Draggable>
                                </div>
                            ))}
                            {provided.placeholder}
                            <div>
                                <Button
                                    title={
                                    <div className={styles.add_card_container}>
                                        <FaPlus className={styles.icon_card_plus} />
                                        <h1 className={styles.card_title}>Add Card</h1>
                                    </div>
                                    }
                                    href='#' style='card_button'
                                />
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default Cards;
