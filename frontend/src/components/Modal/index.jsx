import styles from './index.module.css';
const Modal = ({ Edition, handleInputChange, inputValue }) => {

    return (
        <div className={styles.containerModal}>
            <div className={styles.menu}>
                <div className={styles.items}>
                    <p className={styles.titulo}>Boards Title</p>
                    <input type="text" value={inputValue} onChange={handleInputChange} />
                    <div>
                        <button onClick={() => Edition('finish')}>Ok</button>
                        <button onClick={() => Edition('cancel')}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;