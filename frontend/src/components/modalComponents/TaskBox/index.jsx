import { useState } from 'react';
import Input from '../../Input';
import styles from './index.module.css';

const TaskBox = ({ card, onCreateTask, closeBox, title, buttonName }) => {
    
    const [titleTask, setTitleTask] = useState("untitled")
    const [descriptionTask, setDescriptionTask] = useState("Empty")
    const [caracteresTitleOver, setTitleCaracteresOver] = useState(false)
    const [caracteresDescriptionOver, setDescriptionCaracteresOver] = useState(false)
    const maxTitle = 50
    const maxDescription = 1000

    const handleTitleTaskValue = (event) => {
        if (event.target.value.length < maxTitle) {
            setTitleTask(event.target.value)
            setTitleCaracteresOver(false)
        } else {
            setTitleCaracteresOver(true)
        }
    }

    const handleDescriptionTaskValue = (event) => {
        if (event.target.value.length < maxDescription) {
            setDescriptionTask(event.target.value)
            setDescriptionCaracteresOver(false)
        } else {
            setDescriptionCaracteresOver(true)
        }
    }

    return ( 
        <div className={styles.edit_box_container}>         
            <div className={styles.edit_box}>
                <h1>{ title }</h1>
                <div className={styles.form_container}>
                    <label
                        htmlFor="title"
                        className={styles.label}>
                        Task title
                    </label>
                    <Input
                        className={styles.input}
                        onChange={handleTitleTaskValue}
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
                    />
                    {caracteresDescriptionOver && <p className={styles.caracteres_message}>Máximo de 1000 caracteres</p>}
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