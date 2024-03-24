import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import styles from './index.module.css';


const TaskBox = ({ card, task, onCreateTask, closeBox, title, buttonName}) => {
    const [titleTask, setTitleTask] = useState("untitled")
    const [descriptionTask, setDescriptionTask] = useState("Empty")

    const handleTitleTaskValue = (event) => {
        setTitleTask(event.target.value) 
    }

    const handleDescriptionTaskValue = (event) => {
        setDescriptionTask(event.target.value) 
    }

    // const handleCreateOrEdit = () => {         
    //         onCreateOrEdit(titleTask)
    //         onSave(true)
    // }

    return ( 
        <div className={styles.edit_box_container}>         
            <div className={styles.edit_box}>
                <h1>{ title }</h1>
                <div className={styles.input_container}>
                    <label htmlFor="title" className={styles.label}>Task title</label>
                    <Input className={styles.input} onChange={handleTitleTaskValue} />
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="description" className={styles.label}>Task description</label>
                    <input type="textarea" className={styles.textarea} onChange={handleDescriptionTaskValue} />
                </div>
                <button className={styles.create_button} onMouseDown={() => onCreateTask(card, titleTask, descriptionTask)} onClick={() => closeBox(false)}>
                    {buttonName}
                </button>
            </div>
        </div>
     );
}
 
export default TaskBox;