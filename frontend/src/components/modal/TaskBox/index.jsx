import { useState } from 'react';
import Input from '../../Input';
import styles from './index.module.css';

const TaskBox = ({ card, onCreateTask, closeBox, title, buttonName }) => {
    
    const [titleTask, setTitleTask] = useState("untitled")
    const [descriptionTask, setDescriptionTask] = useState("Empty")

    const handleTitleTaskValue = (event) => {
        if (event.target.value.length < 50) {
            setTitleTask(event.target.value) 
        }   
    }

    const handleDescriptionTaskValue = (event) => {
        if (event.target.value.length < 1000) {
            setDescriptionTask(event.target.value) 
        }
    }

    return ( 
        <div className={styles.edit_box_container}>         
            <div className={styles.edit_box}>
                <h1>{ title }</h1>
                <div className={styles.input_container}>
                    <label
                        htmlFor="title"
                        className={styles.label}>
                        Task title
                    </label>
                    <Input
                        className={styles.input}
                        onChange={handleTitleTaskValue}
                    />
                </div>
                <div className={styles.input_container}>
                    <label
                        htmlFor="description"
                        className={styles.label}>
                        Task description
                    </label>
                    <input
                        type="textarea"
                        className={styles.textarea}
                        onChange={handleDescriptionTaskValue}
                    />
                </div>
                <button
                    className={styles.create_button}
                    onMouseDown={() => onCreateTask(card, titleTask, descriptionTask)}
                    onClick={() => closeBox(false)}
                >
                    {buttonName}
                </button>
            </div>
        </div>
     );
}
 
export default TaskBox;