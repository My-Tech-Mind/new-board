import styles from './index.module.css';
const ModalDelete = ({ Delete, boardId }) => {

    return (
        <div className={styles.containerModal}>
            <div className={styles.menu}>
                <div className={styles.items}>
                    <h1 className={styles.titulo}>Deseja realmente excluir</h1>
                    <div>
                        <button onClick={() => Delete('finish', boardId)}>Sim</button>
                        <button onClick={() => Delete('cancel', boardId)}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete;