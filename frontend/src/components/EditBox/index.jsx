import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import styles from './index.module.css';


const EditBox = ({ title, card, buttonName, onCreate, onEditTitle, onSave, create}) => {

    const [titleCard, setTitleCard] = useState('untitled')

    const handleTitleCardValue = (event) => {
        setTitleCard(event.target.value) 
    }

    const handleCreateCard = () => {
        onCreate(titleCard)
        onSave(true)
    }

    const handleEditCard = () => {
        onEditTitle(titleCard, card)
        onSave(true)
    }

    return ( 
        <div className={styles.edit_box_container}>
            
            <div className={styles.edit_box}>
                <h1>{ title }</h1>
                <Input className={styles.input} onChange={handleTitleCardValue} />
                <button onClick={create ? handleCreateCard : handleEditCard} className={styles.save_button}>{ buttonName }</button>
                {/* <Button title={buttonName} style='board_button' onCreate(titleCard) /> */}
            </div>
        </div>
     );
}
 
export default EditBox;