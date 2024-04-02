import styles from './index.module.css';
const Modal = ({ Edition, handleInputChange, inputValue }) => {

    return (
        <div className={styles.containerModal}>
            <div className={styles.menu}>
                <div className={styles.items}>
                    <p className={styles.titulo}>Boards Title</p>
                    <input className={styles.input} type="text" value={inputValue} onChange={handleInputChange} />
                    <div className={styles.divButton}>
                        <button className={styles.confirmButton} onClick={() => Edition('finish')}>Ok</button>
                        <button className={styles.denyButton} onClick={() => Edition('cancel')}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;