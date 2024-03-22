import { useState } from 'react';
// import Button from '../Button';
import Input from '../../Input';
import styles from './index.module.css';


const CardBox = ({ title, card, buttonName, onCreateOrEdit, onSave, create}) => {
    // onEditTitle
    const [titleCard, setTitleCard] = useState('untitled')

    const handleTitleCardValue = (event) => {
        setTitleCard(event.target.value) 
    }
    
    
    

    const handleCreateOrEdit = () => {         
            onCreateOrEdit(titleCard)
            onSave(true)
    }

    return ( 
        <div className={styles.edit_box_container}>
            
            <div className={styles.edit_box}>
                <h1>{ title }</h1>
                <Input className={styles.input} onChange={handleTitleCardValue} />
                <button onClick={handleCreateOrEdit} className={styles.save_button}>{buttonName}</button>
            </div>
        </div>
     );
}
 
export default CardBox;