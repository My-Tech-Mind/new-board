import styles from './index.module.css';
import Button from '../../../Button';
import { FaTimes } from 'react-icons/fa';
const ModalDelete = ({ Delete, boardId }) => {

    return (
        <div className={styles.containerModal}>
            <FaTimes className={styles.close_icon} onClick={() => Delete('cancel', boardId)} />
            <div className={styles.menu}>
                <div className={styles.items}>
                    <h1 className={styles.title}>Are you sure that you want to delete?</h1>
                    <div className={styles.button_container}>
                        <div onClick={() => Delete('cancel', boardId)}>
                            <Button title='no' style='negative' size='size_small' />
                        </div>
                        <div onClick={() => Delete('finish', boardId)}>
                            <Button title='yes' style='default' size="size_small" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete;