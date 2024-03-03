import Button from '../Button';
import Input from '../Input';
import styles from './index.module.css';


const EditBox = ({title, buttonName}) => {
    return ( 
        <div className={styles.edit_box_container}>
            
            <div className={styles.edit_box}>
                <h1>{ title }</h1>
                <Input className={styles.input} />
                <Button title={buttonName} style='board_button' href='#' />
            </div>
        </div>
     );
}
 
export default EditBox;