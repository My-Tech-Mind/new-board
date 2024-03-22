import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Button from '../../components/Button';
import styles from './index.module.css';
import TaskMenuCrud from '../modal/TaskMenuCrud';
import { v4 as uuidv4 } from 'uuid';
import TaskBox from '../modal/TaskBox';

const Tasks = ({ tasks, card, cards }) => {

  const [idTask, setIdTask] = useState(uuidv4().slice(0, 3))
  // const [newCards, setNewCards] = useState(cards)

  const handleDuplicateTask = (data) => {

    const { card, task } = data

    setIdTask(uuidv4().slice(0, 3))

    const copyTitle = task.title + ` (copy)`
    const newIndex = task.taskIndex + 1
    const { id, title, taskIndex, ...description } = task
    
    const duplicatedTask = {
      id: idTask,
      title: copyTitle,
      taskindex: newIndex,
      description
    }
    card.tasks.splice(newIndex, 0, duplicatedTask)
  }

  const handleDeleteTask = (data) => {
    setIdTask(uuidv4().slice(0, 3))
    const {card, task} = data
    card.tasks.splice(task.taskIndex, 1)
  }

  const handleEditTitleTask = (data) => {
    // const { title, index, ...cardWithoutTitleIndex } = cardToBeEdited
    // const updatedCard = {
    //     title: newTitle,
    //     ...cardWithoutTitleIndex
    // }
    // const cardsCopy = [...cards]
    // cardsCopy.splice(cardToBeEdited.index, 1, updatedCard)
    // setCards(cardsCopy)
    // console.log("title", title)
  }
  
  // const [openCreateCardBox, setOpenCreateCardBox] = useState(false)
  const [openEditCardBox, setOpenEditCardBox] = useState(false)
  const [openTaskBox, setOpenTaskBox] = useState(false)
  // let [cards, setCards] = useState(initialCards);

  // const [cardToBeEdited, setCardToBeEdited] = useState({})

  const handleCreateCard = () => {
    setOpenEditCardBox(true)
  }

    const handleEditCard = (card) => {
        // setOpenEditCardBox(true)
        // setCardToBeEdited(card)
    }

    const handleEditTitle = (newTitle) => {
        // const { title, index, ...cardWithoutTitleIndex } = cardToBeEdited
        // const updatedCard = {
        //     title: newTitle,
        //     ...cardWithoutTitleIndex
        // }
        // const cardsCopy = [...cards]
        // cardsCopy.splice(cardToBeEdited.index, 1, updatedCard)
        // setCards(cardsCopy)
        // console.log("title", title)
    }

    const handleSaveCard = (save) => {
        // setOpenEditCardBox(!save)
        // setOpenCreateCardBox(!save)
    }


  const openCloseTaskBox = () => {
    setOpenTaskBox(!openTaskBox)
}

const openEditTitleCard = () => {
    setOpenEditCardBox(!openEditCardBox)
  }
  
  const handleOpenTaskBox = () => {
  setOpenTaskBox(true)
}

  return (
    <div>
            {/* {
                openCreateCardBox && (
                    <>
                        <FaTimes className={styles.close_icon} onClick={openCloseCardBox} />
                        < CardBox title='Card title' buttonName='Create' onCreateOrEdit={handleCreateCard} onSave={ handleSaveCard } />
                    </>
                )
            } */}

            {/* {
                openEditCardBox && (
                    <>
                        <FaTimes className={styles.close_icon} onClick={openEditTitleCard} />
                        < CardBox title='Card title' buttonName='Save' onEdit={handleEditCard} />
                        onCreateOrEdit={handleEditTitle} onSave={ handleSaveCard }
                        
                    </>
                )
              } */}
      
      {
        openTaskBox && (
          <>
            <FaTimes className={styles.close_icon} onClick={openCloseTaskBox} />
            <TaskBox />
          </>
        )
      }
      {tasks.map((task, index) => (
        <Draggable key={`task_${task.id}`} draggableId={`task_${task.id}`} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={styles.task}
            >
              <h3 className={styles.task_title}>{task.title}</h3>
              {/* <FaEllipsisV className={styles.icons} onClick={() => console.log('você clicou na task:', task)} /> */}
              <TaskMenuCrud task={task} taskIndex={index} card={ card } onDuplicateTask={handleDuplicateTask} onDeleteTask={handleDeleteTask} onEditTask={handleEditCard}  />
            </div>
          )}
        </Draggable>
      ))}
      <div>
        <Button
          title={
            <div className={styles.add_task_container}>
              <FaPlus className={styles.icon_task_plus} onClick={handleOpenTaskBox} />
            </div>
          }
          href='#' style='task_button'
        />
      </div>
    </div>
  )
};

export default Tasks;
