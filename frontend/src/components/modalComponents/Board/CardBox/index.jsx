import { useState } from 'react';
import Input from '../../../Input';
import styles from './index.module.css';

const CardBox = ({ title, buttonName, onCreateOrEdit, onSave}) => {
    const [titleCard, setTitleCard] = useState('untitled')
    const [caracteresOver, setCaracteresOver] = useState(false)

    const handleTitleCardValue = (event) => {
        if (event.target.value.length < 20) {
            setTitleCard(event.target.value) 
            setCaracteresOver(false)
        } else {
            setCaracteresOver(true)
        }
    }
    
    const handleCreateOrEdit = () => {         
            onCreateOrEdit(titleCard)
            onSave(true)
    }

    return ( 
        <div className={styles.edit_box_container}>
            
            <div className={styles.edit_box}>
                <h1>{title}</h1>
                <div className={styles.form_container}>
                    <label className={styles.label}>Board title</label>
                    <Input className={styles.input} onChange={handleTitleCardValue} />
                    {caracteresOver && <p className={styles.caracteres_message}>Máximo de 20 caracteres</p>}
                </div>
                <button onClick={handleCreateOrEdit} className={styles.save_button}>{buttonName}</button>
            </div>
        </div>
     );
}
 
export default CardBox;