import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaEllipsisV, FaPlus } from 'react-icons/fa';
import Button from '../../components/Button';
import styles from './index.module.css';

const Tasks = ({ tasks }) => {
  return (
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
        <Button
          title={
            <div className={styles.add_task_container}>
              <FaPlus className={styles.icon_task_plus} />
            </div>
          }
          href='#' style='task_button'
        />
      </div>
    </div>
  )
};

export default Tasks;
