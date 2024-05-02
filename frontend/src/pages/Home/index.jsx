import Button from '../../components/Button/index';
import Header from '../../components/Header';
import styles from './index.module.css';
import imageHome from '../../assets/home.png';
import { useState, useEffect } from 'react';

const Home = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <>
            <Header logged={false} />
            <main className={styles.main}>
                <div className={styles.main_container}>
                    <div className={styles.container_image}>
                        <img src={imageHome} alt='Home' />
                    </div>
                    <article className={styles.container_content}>
                        <h1>Organize your projects with New Board</h1>
                        <p>
                            Collaborate, manage projects and reach new peaks in productivity. From skyscrapers to home offices, the way your team works is unique - do it all in a new way with New Board.
                        </p>
                        <div className={styles.container_buttons}>
                            <Button title='Sign up' style='default' href='/signup' size='size_default' />
                            {
                                windowSize < 768 && (
                                    <Button title='Login' style='outline' href='/login' size='size_default' />
                                )
                            }
                        </div>
                    </article>
                </div>
            </main>
        </>
    );
};
 
export default Home;