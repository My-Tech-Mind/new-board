import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import styles from './index.module.css';


const TaskBox = ({ task, onCreateOrEdit, onSave, create}) => {
    const [titleTask, setTitleTask] = useState(task)

    const handleTitleTaskValue = (event) => {
        setTitleTask(event.target.value) 
    }

    const handleCreateOrEdit = () => {         
            onCreateOrEdit(titleTask)
            onSave(true)
    }

    return ( 
        <div className={styles.edit_box_container}>         
            <div className={styles.edit_box}>
                <h1>Create task</h1>
                <div className={styles.input_container}>
                    <label htmlFor="title" className={styles.label}>Task title</label>
                    <Input className={styles.input} onChange={handleTitleTaskValue} />
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="description" className={styles.label}>Task description</label>
                    <input type="textarea" className={styles.textarea} />
                </div>
                <Button title= "Save" style="board_button" href="#">Save</Button>
            </div>
        </div>
     );
}
 
export default TaskBox;