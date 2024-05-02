import { useState } from 'react';
import Input from '../../../Input';
import styles from './index.module.css';

const CardBox = ({ title, cardTitle, buttonName, onCreateOrEdit, onSave}) => {
    const [titleCard, setTitleCard] = useState(cardTitle ? cardTitle : '');
    const [caracteresOver, setCaracteresOver] = useState(false);

    const handleTitleCardValue = (event) => {
        if (event.target.value.length < 20) {
            setTitleCard(event.target.value);
            setCaracteresOver(false);
        } else {
            setCaracteresOver(true);
        }
    };
    
    const handleCreateOrEdit = () => {
        if (!caracteresOver) {
            onCreateOrEdit(titleCard);
            onSave(true);
        }
    };

    return ( 
        <div className={styles.edit_box_container}>
            
            <div className={styles.edit_box}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.form_container}>
                    <label className={styles.label}>Title</label>
<<<<<<< HEAD
                    <Input className={styles.input} onChange={handleTitleCardValue} />
=======
                    <Input
                        className={styles.input}
                        onChange={handleTitleCardValue}
                        onEnterPress={handleCreateOrEdit}
                        defaultValue={titleCard}
                    />
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
                    {caracteresOver && <p className={styles.caracteres_message}>Maximum of 20 characters</p>}
                </div>
                <button onClick={handleCreateOrEdit} className={caracteresOver ? styles.disabled_button : styles.save_button} disabled={caracteresOver}>{buttonName}</button>
            </div>
        </div>
     );
}
 
export default CardBox;