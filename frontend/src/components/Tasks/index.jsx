import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Button from '../../components/Button';
import styles from './index.module.css';
import TaskMenuCrud from '../modalComponents/Board/TaskMenuCrud';
import { v4 as uuidv4 } from 'uuid';
import TaskBox from '../modalComponents/Board/TaskBox';
import {
  deleteTask,
  createTask,
  updateTask,
  ordenateTask,
  getTask
} from '../../services/api/task/task';
import { updateCard } from '../../services/api/card/card';
import LimitError from '../modalComponents/LimitError';
const Tasks = ({ tasks, card, onUpdatedCard }) => {

  const [openEditTaskBox, setOpenEditTaskBox] = useState(false)
  const [openTaskBox, setOpenTaskBox] = useState(false)
  const [TaskToBeEdited, setTaskToBeEdited] = useState({})
  const [CardToBeEdited, setCardToBeEdited] = useState({})
  const [limitPlan, setLimitPlan] = useState(false);
  const limiteTasks = 20

  const handleDuplicateTask = async (data) => {
    if (tasks.length < limiteTasks) {
      const { card, task } = data
      console.log('data:', data)
      try {
        const req = {title: task.title, card_id: card.id}
        const response = await createTask(req)
        const {id, title, description} = response
        const newTask = { id: `${id}`, title, description }
        card.tasks.splice(task.taskIndex + 1, 0, newTask)
        onUpdatedCard(card)
      } catch (error) {
        console.log(error.message)
      }

    } else {
      setLimitPlan(true)
    }
  }

  const handleDeleteTask = async (data) => {
    const {task} = data
    try {
      const response = await deleteTask(task.id)
      card.tasks.splice(task.taskIndex, 1)
      onUpdatedCard(card)
      return response
    } catch (error) {
      console.log(error.message)
    }    
  }

  const handleCreateTask = async (card, taskTitle, description1) => {
    if (tasks.length < limiteTasks) {
      console.log(card)
      try {
        const task = {
          card_id: card.id,
          title: taskTitle,
          description: description1
        };
        console.log('task', task)
        const response = await createTask(task);
        const { id, title, description } = response;
        const taskCreated = { id: `${id}`, title, description };
        console.log('task', taskCreated)
        card.tasks.push(taskCreated);
        onUpdatedCard(card);
      } catch (error) {
        console.log(error.message)
      }
    } else {
      setLimitPlan(true)
    }
  }

  const handleEditTask = (cardAndTask) => {
    const { card, task } = cardAndTask
    setCardToBeEdited(card)
    setTaskToBeEdited(task)
    setOpenEditTaskBox(true)
  }

  const handleEditTitleTask = async (card, titleTask, descriptionTask) => {

    try {
      const {id, taskIndex} = TaskToBeEdited
      const newTask = {
        card_id: `${card.id}`,
        title: titleTask,
        description: descriptionTask,
      }

      const response = await updateTask(id, newTask)

      const taskUpdated = {
        id: `${response.id}`,
        title: response.title,
        description: response.description
      }

      card.tasks.splice(taskIndex, 1, taskUpdated)
      console.log("card com task atualizada", card)
      onUpdatedCard(card);
      return response

    } catch (error) {
      console.log(error.message)
    }
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

      {
        limitPlan && (<LimitError onOpenModal={(status) => setLimitPlan(status)} />)
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
                <h3 className={styles.task_title} onClick={() => handleEditTaskBoxFromTitle(card, task, index)}>
                  {task.title}
                </h3>

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
