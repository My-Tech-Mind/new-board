import { useState } from 'react';
import Input from '../../../Input';
import styles from './index.module.css';

const TaskBox = ({ card, onCreateTask, taskTitle, taskDescription, closeBox, title, buttonName }) => {
    
    const [titleTask, setTitleTask] = useState(taskTitle);
    const [descriptionTask, setDescriptionTask] = useState(taskDescription);
    const [caracteresTitleOver, setTitleCaracteresOver] = useState(false);
    const [caracteresDescriptionOver, setDescriptionCaracteresOver] = useState(false);
    const maxTitle = 50;
    const maxDescription = 1000;

    const handleTitleTaskValue = (event) => {
        if (event.target.value.length < maxTitle) {
            setTitleTask(event.target.value);
            setTitleCaracteresOver(false);
        } else {
            setTitleCaracteresOver(true);
        }
    };

    const handleDescriptionTaskValue = (event) => {
        if (event.target.value.length < maxDescription) {
            setDescriptionTask(event.target.value);
            setDescriptionCaracteresOver(false);
        } else {
            setDescriptionCaracteresOver(true);
        }
    };
    
    const handleEnterPress = () => {
        if (!caracteresDescriptionOver && !caracteresTitleOver) {
            closeBox(false);
            onCreateTask(card, titleTask, descriptionTask);
        }
    };

    return (
        <div className={styles.edit_box_container}>
            <div className={styles.edit_box}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.form_container}>
                    <label
                        htmlFor="title"
                        className={styles.label}>
                        Task title
                    </label>
                    <Input
                        className={styles.input}
                        onChange={handleTitleTaskValue}
                        onEnterPress={handleEnterPress}
                        defaultValue={taskTitle}
                    />
                    {caracteresTitleOver && <p className={styles.caracteres_message}>Máximo de 50 caracteres</p>}
                </div>
                <div className={styles.form_container}>
                    <label
                        htmlFor="description"
                        className={styles.label}>
                        Task description
                    </label>
                    <textarea
                        className={styles.textarea}
                        onChange={handleDescriptionTaskValue}
                        defaultValue={taskDescription}
                    />
                    {caracteresDescriptionOver && <p className={styles.caracteres_message}>Máximo de 1000 caracteres</p>}
                </div>
                <button
                    className={(!caracteresTitleOver && !caracteresDescriptionOver) ? styles.create_button : styles.disabled_button}
                    onMouseDown={() => onCreateTask(card, titleTask, descriptionTask)}
                    onClick={() => closeBox(false)}
                    disabled={(caracteresTitleOver || caracteresDescriptionOver)}
                >
                    {buttonName}
                </button>
            </div>
        </div>
    );
};
 
export default TaskBox;