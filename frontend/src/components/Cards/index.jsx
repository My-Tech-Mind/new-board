import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '../../components/Button';
import Tasks from '../Tasks';
import { FaPlus, FaTimes } from "react-icons/fa";
import styles from './index.module.css';
import EditBox from '../EditBox';
import MenuCrud from '../modal/MenuCrud';

const Cards = () => {

    const initialCards = [
        {
            id: '1',
            title: 'card 1',
            tasks: [
                {
                    id: '1',
                    title: 'task 1',
                    description: 'description 1'
                }
            ]
        },
        {
            id: '2',
            title: 'card 2',
            tasks: [
                {
                    id: '2',
                    title: 'task 2',
                    description: 'description 2'
                }
            ]
        },
    ];   

    const [cards, setCards] = useState(initialCards);
    const [movedPosition, setMovedPosition] = useState({})

    const onDragEnd = (result) => {
        
        const { draggableId, destination, source, type } = result;

        if (!destination) {
            return;
        }

        if (type === 'card') {
            const newCards = Array.from(cards);
            const [movedCard] = newCards.splice(source.index, 1);
            newCards.splice(destination.index, 0, movedCard);
        
            setCards(newCards);

            const cardMoved = {
                cardId: draggableId,
                cardSourcePosition: source.index,
                cardDestinationPosition: destination.index,
            }

            setMovedPosition(cardMoved)
            
            
        } else if (type === 'task') {

            const taskMoved = {
                taskId: draggableId[5],
                taskSourcePosition: source.index,
                taskDestinationPosition: destination.index,
                cardIdSource: source.droppableId,
                cardIdDestination: destination.droppableId,
            }

            setMovedPosition(taskMoved)

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

    const toggleMenu = (cardId) => {
        return setOpenMenuCardId(cardId === openMenuCardId ? null : cardId);
    }

    const [idCard, setidCard] = useState('a')

    const handleDuplicateCard = (card) => {
        setidCard(idCard + '1')
        const copyTitle = card.title + ` (copy)`
        const {id, title, index, ...newCard} = card
        const createdCard = { id: idCard, title: copyTitle, ...newCard }
        cards.splice(card.index + 1, 0, createdCard)
        setCards(cards)
    }

    const handleDeleteCard = (index) => {
        const cardsCopy = [...cards]
        cardsCopy.splice(index, 1)
        setCards(cardsCopy)
    }

    const handleCreateCard = (title) => {
        setidCard(idCard + '2')
        const newCard = {
            id: idCard,
            title,
            tasks: []
        }

        cards.push(newCard)
        setCards(cards)  
    }

    // const handleEditCard = (card) => {
    //     const {title, index, ...newCard} = card
    //     const editCard = { id: idCard, title: card.title, ...newCard }
    //     cards.splice(card.index, 1, editCard)
    //     setCards(cards)
    // }

    // const [titleCardUpdated, setTitleCardUpdated] = useState()

    // const handleEditTitleCard = (title) => {
    //     setTitleCardUpdated(title)
    // }

    const handleSaveCard = (save) => {
        setOpenCreateCardBox(!save)
    }

    console.log(cards)
 
    const [openMenuCardId, setOpenMenuCardId] = useState(null);
    const [openCreateCardBox, setOpenCreateCardBox] = useState(false)
    const [openEditCardBox, setOpenEditCardBox] = useState(false)

    const openCloseCardBox = () => {
        setOpenCreateCardBox(!openCreateCardBox)
    }

    return (
        <>
            {
                openCreateCardBox && (
                    <>
                        <FaTimes className={styles.close_icon} onClick={openCloseCardBox} />
                        <EditBox title='Card title' buttonName='Create' onCreate={handleCreateCard} onSave={ handleSaveCard } create="true" />
                    </>
                )
            }

            {/* {
                openEditCardBox && (
                    <>
                        <FaTimes className={styles.close_icon} onClick={editCardTitle} />
                        <EditBox title='Card title' buttonName='Save' onEdit={handleEditCard} onEditTitle={handleEditTitleCard} onSave={ handleSaveCard } create="false" />
                    </>
                )
            } */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-cards" direction="horizontal" type='card' key= "all-cards">
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
                                                    {/* onClick={editCardTitle} */}

                                                    <MenuCrud card={card} index={index} onDuplicate={handleDuplicateCard} onDelete={handleDeleteCard} />          
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
                                        <div className={styles.add_card_container} onClick={openCloseCardBox}>
                                            
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
