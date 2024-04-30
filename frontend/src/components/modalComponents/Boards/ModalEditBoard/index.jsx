import Button from '../../../Button';
import Input from '../../../Input';
import { FaTimes } from 'react-icons/fa';
import styles from './index.module.css';

const Modal = ({ Edition, handleInputChange, inputValue, limitCaracteres }) => {

    return (
        <div className={styles.containerModal}>
            <div className={styles.menu}>
                <div className={styles.items}>
                    <h1 className={styles.title}>Title Board</h1>
                    <FaTimes className={styles.close_icon} onClick={() => Edition('cancel')} />
                    <div className={styles.input_container}>
                        <Input
                            className={styles.input}
                            defaultValue={inputValue}
                            style='input_default'
                            onChange={handleInputChange}
                            onEnterPress={() => Edition('finish')}
                            required = {true}
                        />
                        {limitCaracteres && <p className={styles.caracteres_message}>Maximum of 20 characters</p>}
                    </div>
                    <div className={styles.divButton}>
                        <div onClick={() => Edition('finish')}>
                            <Button style={limitCaracteres ? 'disabled' : 'default'} size='size_default' title="Save" disabled={limitCaracteres} />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Modal;