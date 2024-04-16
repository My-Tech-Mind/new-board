import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Button from '../../components/Button';
import Tasks from '../Tasks';
import { FaPlus, FaTimes } from "react-icons/fa";
import styles from './index.module.css';
import CardBox from '../modalComponents/Board/CardBox';
import CardMenuCrud from '../modalComponents/Board/CardMenuCrud';
import { createCard, deleteCard, ordenateCard, updateCard } from '../../services/api/card/card';
import LimitError from '../modalComponents/LimitError';
import detailBoard from '../../services/api/board/board';
import { useParams } from 'react-router-dom';
import { createTask } from '../../services/api/task/task';

const Cards = () => {

    let [cards, setCards] = useState([]);
    const [movedPosition, setMovedPosition] = useState({});
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
                setCards(response.cards);
                console.log(response);
                return response;
            } catch (error) {
                console.log(error.message);
            }
        }
        handleGetBoard();
    }, [])

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

            setMovedPosition(cardMoved)
            handleOrdenateCard(cardMoved)


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
                    card.id === sourceCard.id ?
                        newSourceCard : card.id === destinationCard.id ?
                            newDestinationCard : card
                );

                setCards(newCards);

            }
        }
    };

    console.log(movedPosition)

        
    const handleDuplicateCard = async (card) => {
        if (cards.length < 10) {
                try {
                    const newTitle = card.title + ' (copy)'
                    const cardCopy = {title: newTitle, board_id: boardId}
                    const responseCard = await createCard(cardCopy)

                    card.tasks.map((task, index) => {
                        const req = {title: task.title, card_id: responseCard.id}
                        const handleCreateTask = async () => {
                            try {
                                const responseTask = await createTask(req)
                                console.log(`task ${index} criada:`, responseTask)
                                return responseTask;
                            } catch (error) {
                                console.log('erro na criação da task', error.message)
                            }
                        }
                        handleCreateTask()
                    })

                    const handleGetBoard = async () => {
                        try {
                            const response = await detailBoard(boardId)
                            console.log('detalhamento do board dentro:', response)
                            const cardDuplicated = response.cards.filter((theCard) => {
                                return theCard.id == responseCard.id
                            })
                            console.log('card duplicado:',cardDuplicated)
                            return response
                        } catch (error) {
                            console.log('erro no detalhamento do board', error.message)
                        }
                    }
                    handleGetBoard()
                    
                } catch (error) {
                    console.log('erro na criação do card',error.message)
                }
            
            // console.log('todos os cards:', board.cards)
            // const cardDuplicated = board.cards.filter((theCard) => {
            //     return theCard.id == card.id
            // })

            // console.log('card duplicado:', cardDuplicated)
            // return cardDuplicated


            // setNewId(uuidv4().slice(0, 3))

            // const copyTitle = card.title + ` (copy)`
            // const newTasks = card.tasks.map((task) => {
            //     const { id, ...rest } = task
            //     return { id: uuidv4().slice(0, 3), ...rest }
            // })

            // const createdCard = { id: newId, title: copyTitle, tasks: newTasks }

            // cards.splice(card.index + 1, 0, createdCard)
            // setCards(cards)
        } else {
            setLimitPlan(true)
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
            localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzEzMjkxNzA5LCJleHAiOjE3MTMzNzgxMDl9.vTekjqZwdxAS-UCUXNCpqVeCo4q9FkJBz5RuPukIqps')
            try {
                const response = await createCard({ title: cardTitle, board_id: boardId })
                const { id, title } = response
                const card = { id: `${id}`, title, tasks: [] }
                setCards([...cards, card])
            } catch (error) {
                console.log(error.message)
            }
        } else {
            // console.log(`error: it's not allowed to create more than 10 card in the free plan.`)
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
        if(cardWithTask) {
            setCardWithTask(card)
            setCards([...cards, cardWithTask])
        }
        
        console.log('card do componente filho', card)
    }

    useEffect(() => {
            handleUpdateCards(cardWithTask)
            // setCards([...cards, cardWithTask])
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
                limitPlan && (<LimitError />)
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
