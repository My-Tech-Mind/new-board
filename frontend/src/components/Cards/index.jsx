import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '../../components/Button';
import Tasks from '../Tasks';
import { FaPlus, FaTimes } from "react-icons/fa";
import styles from './index.module.css';
import CardBox from '../modalComponents/Board/CardBox';
import CardMenuCrud from '../modalComponents/Board/CardMenuCrud';
import { createCard, deleteCard, detailCard, ordenateCard, updateCard } from '../../services/api/card/card';
import LimitError from '../modalComponents/LimitError';
import detailBoard from '../../services/api/board/board';
import { useParams } from 'react-router-dom';
import { createTask, ordenateTask } from '../../services/api/task/task';

const Cards = () => {

    let [cards, setCards] = useState([]);
    const [cardToBeEdited, setCardToBeEdited] = useState({});
    const [openCreateCardBox, setOpenCreateCardBox] = useState(false);
    const [openEditCardBox, setOpenEditCardBox] = useState(false);
    const [limitPlan, setLimitPlan] = useState(false);
    const [cardWithTask, setCardWithTask] = useState(null);
    const { boardId } = useParams();

    useEffect(() => {
        const handleGetBoard = async () => {
            try {
                const response = await detailBoard(boardId);
                const updateCardsId = response.cards.map((card) => {
                    return {
                        ...card,
                        id: String(card.id),
                    };
                });
                setCards(updateCardsId);
                const { cards, ...rest } = response;
                const boardUpdated = { rest, cards: updateCardsId };
                return boardUpdated;
            } catch (error) {
                console.log(error.message);
            }
        }
        handleGetBoard();
    }, []);

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
                cardIdSourcePosition: source.index,
                cardIdDestinationPosition: destination.index,
            }

            handleOrdenateCard(cardMoved)

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
                    card.id === sourceCard.id ?
                        newSourceCard : card.id === destinationCard.id ?
                            newDestinationCard : card
                );

                setCards(newCards);
            }

            const taskMoved = {
                taskId: draggableId.slice(5, draggableId.length),
                taskSourcePosition: source.index,
                taskSourceDestination: destination.index,
                cardIdSource: source.droppableId,
                cardIdDestination: destination.droppableId,
            };

            handleOrdenateTask(taskMoved);
        }
    };
        
    const handleDuplicateCard = async (card) => {
        if (cards.length < 10) {
            const newTitle = card.title + ' (copy)'
            const cardCopy = { title: newTitle, board_id: boardId }

            try {
                const responseCard = await createCard(cardCopy);
                console.log(responseCard)
                const createTasks = card.tasks.map(async (task, index) => {
                    const req = {
                        title: task.title,
                        card_id: responseCard.id
                    };
                    try {
                        const responseTask = await createTask(req);
                        return responseTask;
                    } catch (error) {
                        console.log(error.message);
                    }
                })
            
                await Promise.all(createTasks);

                const handleDetailCard = async () => {
                    try {
                        const response = await detailCard(card.id)
                        const {id, title, tasks} = response
                        const duplicatedCard = { id: `${id}`, title, tasks }
                        setCards([...cards, duplicatedCard])
                    } catch (error) {
                        console.log(error.message);
                    }
                }

                handleDetailCard()

                // const handleGetBoard = async () => {
                //     try {
                //         const response = await detailBoard(boardId);
                //         const responseStringIds = response.cards.map((theCard) => {
                //             return {
                //                 ...theCard,
                //                 id: String(theCard.id)
                //             };
                //         });

                //         const cardDuplicated = responseStringIds.filter((theCard) => {
                //             return theCard.id == responseCard.id
                //         })

                //         setCards([...cards, cardDuplicated[0]])
                        
                //     } catch (error) {
                //         console.log(error.message);
                //     }
                // }

                // handleGetBoard()
                
            } catch (error) {
                console.log(error.message);
            }
            
        } else {
            setLimitPlan(true);
        }
    }

    const handleDeleteCard = async (id, index) => {
        try {
            await deleteCard(id)
            const cardsCopy = [...cards]
            cardsCopy.splice(index, 1)
            setCards(cardsCopy)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleCreateCard = async (cardTitle) => {
        if (cards.length < 10) {
            // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzEzMzU4OTUxLCJleHAiOjE3MTM0NDUzNTF9.6kLbyhW7GQmrfCgGq8rtAttScdznCDCBOIfLdSY_vJI')
            try {
                const response = await createCard({ title: cardTitle, board_id: boardId })
                const { id, title } = response
                const card = { id: `${id}`, title, tasks: [] }
                setCards([...cards, card])
            } catch (error) {
                console.log(error.message)
            }
        } else {
            setLimitPlan(true)
        }
    }

    const handleEditCard = (card) => {
        setOpenEditCardBox(true)
        setCardToBeEdited(card)
    }

    const handleEditTitle = async (newTitle) => {
        const card = { title: newTitle, board_id: "5" }
        try {
            const response = await updateCard(cardToBeEdited.id, card)
            const { id, title } = response
            const updatedCard = { id: `${id}`, title, tasks: cardToBeEdited.tasks }
            const cardsCopy = [...cards]
            cardsCopy.splice(cardToBeEdited.index, 1, updatedCard)
            setCards(cardsCopy)

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleOrdenateCard = async (ordenation) => {
        try {
            const response = await ordenateCard(ordenation)
            return response
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleOrdenateTask = async (ordenation) => {
        try {
            const response = await ordenateTask(ordenation)
            console.log('ord', response)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveCard = (save) => {
        setOpenEditCardBox(!save)
        setOpenCreateCardBox(!save)
    }

    const openCloseCardBox = () => {
        setOpenCreateCardBox(!openCreateCardBox)
    }

    const openEditTitleCard = () => {
        setOpenEditCardBox(!openEditCardBox)
    }

    const handleUpdateCards = (card) => {
        const updatedCards = cards.map((theCard) => {
            return theCard.id == card.id ? card : theCard
        });
        setCards(updatedCards);
    };

    useEffect(() => {
            handleUpdateCards(cardWithTask)
    }, [cardWithTask])

    return (
        <>
            {
                openCreateCardBox && (
                    <>
                        <FaTimes className={styles.close_icon} onClick={openCloseCardBox} />
                        < CardBox title='Create card' buttonName='Create' onCreateOrEdit={handleCreateCard} onSave={handleSaveCard} />
                    </>
                )
            }

            {
                openEditCardBox && (
                    <>
                        <FaTimes className={styles.close_icon} onClick={openEditTitleCard} />
                        < CardBox title='Edit card' buttonName='Save' onEdit={handleEditCard} onCreateOrEdit={handleEditTitle} onSave={handleSaveCard} />

                    </>
                )
            }
            {
                limitPlan && (<LimitError onOpenModal={(status) => setLimitPlan(status)} />)
            }
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-cards" direction="horizontal" type='card' key="all-cards">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={styles.board_container}
                        >
                            {cards.map((card, index) => (
                                <div>
                                    <Draggable
                                        key={card.id}
                                        draggableId={card.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={styles.card}
                                            >
                                                <div className={styles.card_title_container} {...provided.dragHandleProps}>
                                                    <h2
                                                        className={styles.card_title}
                                                        onClick={openEditTitleCard}
                                                        onMouseDown={() => setCardToBeEdited({ index, ...card })}
                                                    >
                                                        {card.title}
                                                    </h2>

                                                    <CardMenuCrud
                                                        card={card}
                                                        index={index}
                                                        onDuplicate={handleDuplicateCard}
                                                        onDelete={handleDeleteCard}
                                                        onEdit={handleEditCard}
                                                        onEditTitle={handleEditTitle} />
                                                </div>

                                                <Droppable
                                                    droppableId={card.id}
                                                    key={card.id}
                                                    type="task"
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className={styles.task_container}>
                                                            <Tasks
                                                                tasks={card.tasks}
                                                                card={card}
                                                                onUpdatedCard={handleUpdateCards}
                                                            />
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
                            <div>
                                <Button
                                    title={
                                        <div
                                            className={styles.add_card_container}
                                            onClick={openCloseCardBox}>
                                            <FaPlus className={styles.icon_card_plus} />
                                            <h1 className={styles.card_title}>
                                                Add Card
                                            </h1>
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
