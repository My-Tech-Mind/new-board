import Button from '../../../Button';
import Input from '../../../Input';
import { FaTimes } from 'react-icons/fa';
import styles from './index.module.css';
const Modal = ({ Edition, handleInputChange, inputValue }) => {

    return (
        <div className={styles.containerModal}>
            <div className={styles.menu}>
                <div className={styles.items}>
                    <h1 className={styles.title}>Create a board</h1>
                    <FaTimes className={styles.close_icon} onClick={() => Edition('cancel')} />
                    <div className={styles.input_container}>
                        <label className={styles.label}>Title board</label>
                        <Input className={styles.input} defaultValue={inputValue} style='input_default' onChange={handleInputChange} />
                    </div>
                    <div className={styles.divButton}>
                        <div onClick={() => Edition('finish')}><Button style='default' size='size_default' title="Create" /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;