import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Button from '../../components/Button';
import styles from './index.module.css';
import TaskMenuCrud from '../modal/TaskMenuCrud';
import { v4 as uuidv4 } from 'uuid';
import TaskBox from '../modal/TaskBox';

const Tasks = ({ tasks, card }) => {

  const [idTask, setIdTask] = useState(uuidv4().slice(0, 3))
  const [openEditTaskBox, setOpenEditTaskBox] = useState(false)
  const [openTaskBox, setOpenTaskBox] = useState(false)
  const [TaskToBeEdited, setTaskToBeEdited] = useState({})
  const [CardToBeEdited, setCardToBeEdited] = useState({})
  const limiteTasks = 20

  const handleDuplicateTask = (data) => {
    if (tasks.length < limiteTasks) {
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
    } else {
      console.log('erro: não pode criar mais de 20 tasks por card')
    }
  }

  const handleDeleteTask = (data) => {
    setIdTask(uuidv4().slice(0, 3))
    const {card, task} = data
    card.tasks.splice(task.taskIndex, 1)
  }

  const handleCreateTask = (card, title, description) => {
    if (tasks.length < limiteTasks) {
      const newId = uuidv4().slice(0, 4)
    const newTask = {
      id: newId,
      title,
      description
    }

    card.tasks.push(newTask)
    } else {
      console.log('erro: não pode criar mais que 20 tasks')
    }
  }

  const handleEditTask = (cardAndTask) => {
    const { card, task } = cardAndTask
    setCardToBeEdited(card)
    setTaskToBeEdited(task)
    setOpenEditTaskBox(true)
  }

  const handleEditTitleTask = (card, titleTask, descriptionTask) => {
    const {title, description, ...taskWithoutTitleDescription} = TaskToBeEdited
    const newTask = {
      title: titleTask,
      description: descriptionTask,
      ...taskWithoutTitleDescription
    }
    const taskIndex = TaskToBeEdited.taskIndex
    card.tasks.splice(taskIndex, 1, newTask)
    }

  const handleEditTaskBoxFromTitle = (card, task, index) => {
    const taskWithIndex = { taskIndex: index, ...task }
    setOpenEditTaskBox(true)
    setCardToBeEdited(card)
    setTaskToBeEdited(taskWithIndex)
  }
  
  const handleOpenTaskBox = () => {
    setOpenTaskBox(true)
    }

  const handleCloseCreateTaskBox = (status) => {
    setOpenTaskBox(status)
  }
  
  const handleCloseEditTaskBox = (status) => {
    setOpenEditTaskBox(status)
  }

  const handleCloseTask = () => {
    setOpenEditTaskBox(false)
    setOpenTaskBox(false)
  }

  return (
    <div>
      {
          openEditTaskBox && (
              <>
            <FaTimes
              className={styles.close_icon}
              onClick={handleCloseTask} />
            
            < TaskBox
              onCreateTask={handleEditTitleTask}
              card={card}
              closeBox={handleCloseEditTaskBox}
              title="Edit Task"
              buttonName="Edit" />
              </>
          )
        }
      
      {
        openTaskBox && (
          <>
            <FaTimes
              className={styles.close_icon}
              onClick={handleCloseTask}
            />

            <TaskBox
              onCreateTask={handleCreateTask}
              card={card}
              closeBox={handleCloseCreateTaskBox}
              title="Create Task"
              buttonName="Create" />
          </>
        )
      }
      <div className={styles.task_scroll}>
      {tasks.map((task, index) => (
        <Draggable key={`task_${task.id}`} draggableId={`task_${task.id}`} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={styles.task}
            >
              <div className={styles.teste}>
                <h3 className={styles.task_title} onClick={() => handleEditTaskBoxFromTitle(card, task, index)}>
                  {task.title}
                </h3>
              </div>

              <TaskMenuCrud
                task={task}
                taskIndex={index}
                card={card}
                onDuplicateTask={handleDuplicateTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask} />
              
            </div>
          )}
        </Draggable>
      ))}
      </div>
      <div>
        <Button
          title={
            <div className={styles.add_task_container}>
              <FaPlus
                className={styles.icon_task_plus}
                onClick={handleOpenTaskBox}
              />
            </div>
          }
          href='#' style='task_button'
        />
      </div>
    </div>
  )
};

export default Tasks;
