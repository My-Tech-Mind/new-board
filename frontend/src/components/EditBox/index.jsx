import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import styles from './index.module.css';


const EditBox = ({ title, buttonName, onCreate }) => {

    const [titleCard, setTitleCard] = useState('untitled')

    const handleTitleCardValue = (event) => {
        setTitleCard(event.target.value) 
    }

    console.log(titleCard)

    return ( 
        <div className={styles.edit_box_container}>
            
            <div className={styles.edit_box}>
                <h1>{ title }</h1>
                <Input className={styles.input} onChange={handleTitleCardValue} />
                <Button title={buttonName} style='board_button' onClick={() => onCreate(titleCard)} />
            </div>
        </div>
     );
}
 
export default EditBox;