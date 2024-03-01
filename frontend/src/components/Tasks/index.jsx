// import { useState } from 'react';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import Button from '../../components/Button';
// import { FaEllipsisV, FaPlus } from "react-icons/fa";
// import styles from './index.module.css';

// const Tasks = () => {
//     const initialCards = [
//         {
//             id: '11',
//             title: 'To do',
//             tasks: [
//                 { id: '1', title: 'Untitled' }
//             ]
//         },
//         {
//             id: '12',
//             title: 'Doing',
//             tasks: [
//                 { id: '2', title: 'Untitled' }
//             ]
//         },
//         {
//             id: '13',
//             title: 'Done',
//             tasks: [
//                 { id: '3', title: 'Untitled' }
//             ]
//         }
//     ];
    
//     const addTask =
//         <div className={styles.add_task_container}>
//             <FaPlus className={styles.icon_task_plus} />
//         </div>

    //const [cards, setCards] = useState(initialCards);

    // const onDragEnd = (result) => {
    //     const { destination, source, draggableId, type } = result;

    //     if (!destination) {
    //         return;
    //     }

    //     if (type === 'CARD') {
    //         const newCards = Array.from(cards);
    //         const [movedCard] = newCards.splice(source.index, 1);
    //         newCards.splice(destination.index, 0, movedCard);
        
    //         setCards(newCards);

    //     } else if (type === 'TASK') {
    //         const sourceCard = cards.find((card) => card.id === source.droppableId);
    //         const destinationCard = cards.find((card) => card.id === destination.droppableId);

    //         if (sourceCard === destinationCard) {
    //             const newTasks = Array.from(sourceCard.tasks);
    //             const [movedTask] = newTasks.splice(source.index, 1);
    //             newTasks.splice(destination.index, 0, movedTask);

    //             const newCard = {
    //                 ...sourceCard,
    //                 tasks: newTasks,
    //             };

    //             const newCards = cards.map((card) =>
    //                 card.id === newCard.id ? newCard : card
    //             );

    //             setCards(newCards);

    //         } else {
    //             const sourceTasks = Array.from(sourceCard.tasks);
    //             const destinationTasks = Array.from(destinationCard.tasks);
    //             const [movedTask] = sourceTasks.splice(source.index, 1);
    //             destinationTasks.splice(destination.index, 0, movedTask);

    //             const newSourceCard = {
    //                 ...sourceCard,
    //                 tasks: sourceTasks,
    //             };

    //             const newDestinationCard = {
    //                 ...destinationCard,
    //                 tasks: destinationTasks,
    //             };

    //             const newCards = cards.map((card) =>
    //                 card.id === sourceCard.id ? newSourceCard : card.id === destinationCard.id ? newDestinationCard : card
    //             );

    //             setCards(newCards);
    //         }
    //     }
    // };

//


import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaEllipsisV, FaPlus } from 'react-icons/fa';
import Button from '../../components/Button';
import styles from './index.module.css';

const Tasks = ({ tasks}) => (
  <div>
    {tasks.map((task, index) => (
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
      <Button title={<div className={styles.add_task_container}><FaPlus className={styles.icon_task_plus} /></div>} href='#' style='task_button' />
    </div>
  </div>
);

export default Tasks;
