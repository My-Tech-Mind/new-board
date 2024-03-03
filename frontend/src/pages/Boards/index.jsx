import React, { useState } from 'react';
import styles from './index.module.css';
import logoLight from '../../assets/logo-light.png';
import MenuCrud from '../../components/MenuCrud';
import Menu from '../../components/Menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateBoard from '../../components/CreateBoard';
const Boards = () => {
    let [elementos, setElementos] = useState([]);
    const adicionarElemento = () => {
        const novoElemento = <CreateBoard />
        setElementos([...elementos, novoElemento]);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <img className={styles.logo} src={logoLight} alt="Logo" />
                <Menu />
            </header>
            <main className={styles.container_boards}>
                <p className={styles.title}>Meus favoritos</p>
                <div className={styles.favorite_boards}>
                    <div className={styles.favorite}>
                        <input placeholder='Meu board' type='text' className={styles.boards_name} />

                        <FontAwesomeIcon icon={['fa', 'star']} className={styles.star} />
                        <MenuCrud />
                    </div>
                </div>
                <p className={styles.title}>Meus Boards</p>
                <div className={styles.my_boards}>
                    <div onClick={adicionarElemento} className={styles.create_boards}>
                        <FontAwesomeIcon icon={['fa', 'plus']} className={styles.plus} />
                    </div>
                    {elementos.map((elemento) => elemento)}
                </div>
            </main>
        </div >
    );
}

export default Boards;